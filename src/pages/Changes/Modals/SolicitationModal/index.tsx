import { useCallback, useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../../../contexts/AuthContext";
import api from "../../../../services/api";

import { Input, Textarea, Tooltip } from "@chakra-ui/react";
import AsyncSelect from "react-select/async";
import Select from "react-select";

import { AiFillQuestionCircle } from "react-icons/ai";

import { AsyncSelectInputValuesType } from "../../../Requirements/Modals/RegisterModal";
import { ChangesTypes, RequirementStatusTypes, RequirementsTypes } from "../../../../util/Types";
import { RequirementsStatusEnum, UserFunctionEnum } from "../../../../util/Enums";
import { RequirementsDataType } from "../../../Requirements";

import {
    Background,
    Container,
    Content,
    Footer,
    ModalHeader,
    RowOne,
    RowThree,
    RowTwo,
} from "./styles";

type RegisterModalProps = {
    setIsOpen: () => void;
    reloadPage: () => void;
};

type Inputs = {
    title: string;
    reason: string;
    status: any;
    requestor: string;
    accountable: string;
    requirement: AsyncSelectInputValuesType;
    title_requirement: string;
    description: string;
    type: any;
    category: string | null;
    requirements: Array<AsyncSelectInputValuesType>;
    artefacts: Array<AsyncSelectInputValuesType>;
    stakeholders: string;
    source: string;
};

const schema = yup
    .object({
        title: yup.string().required("Título obrigatório!"),
        reason: yup.string().required("Motivo obrigatório!"),
        status: yup
            .object()
            .shape({
                value: yup.string(),
                label: yup.string(),
            })
            .required("Status obrigatório!"),
        accountable: yup.string().required("Responsável obrigatório!"),
        requestor: yup.string().required("Solicitante obrigatório!"),
    })
    .required();

const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        border: "2px solid #b3b3b3",
        borderRadius: "5px",
        fontSize: "15px",
        outline: "none",
        transition: "all 0.3s",
        color: "black",
        boxShadow: "none",
        fontFamily: "Montserrat",
        "&:hover": {
            border: "2px solid #b3b3b3",
        },
    }),
    menu: (provided: any, state: any) => ({
        ...provided,
        fontFamily: '"Montserrat", sans-serif;',
    }),
};

const SolicitationModal = ({ setIsOpen, reloadPage }: RegisterModalProps) => {
    const { user } = useContext(AuthContext);
    const [isFirstForm, setIsFirstForm] = useState(true);
    const [isSecondForm, setIsSecondForm] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        resetField,
        formState: { errors },
    } = useForm<Inputs>({ resolver: yupResolver(schema) });
    const [selectedChangeOption, setSelectedChangeOption] = useState<any>(ChangesTypes[0]);
    const [basedRequirement, setBasedRequirement] = useState<RequirementsDataType>();
    const [selectedTypeOption, setSelectedTypeOption] = useState<any>(RequirementsTypes[0]);
    const [selectedStatusOption, setSelectedStatusOption] = useState<any>(
        RequirementStatusTypes[0]
    );
    const [isNFunctionalSelected, setIsNFunctionalSelected] = useState(false);

    const getRequirements = async () => {
        const response = await api.get(`/requisitos/`);
        const activeRequirements = response.data.filter((requirement: RequirementsDataType) => {
            return requirement.active;
        });

        const options = await activeRequirements.map((req: any) => ({
            value: req.id,
            label: req.title,
        }));

        return options;
    };

    const getArtefacts = async () => {
        const response = await api.get(`/artefatos/`);
        const options = await response.data.map((art: any) => ({
            value: art.id,
            label: art.name,
        }));

        return options;
    };

    const getRequirement = useCallback(async (option: any) => {
        await api
            .get(`/requisitos/${option.value}`)
            .then((response) => {
                setBasedRequirement(response.data);
            })
            .catch(() => {
                toast.error("Houve um erro ao buscar requisito");
            });
    }, []);

    const toggleIsModalOpen = () => {
        setIsOpen();
    };

    const handleChangeType = (option: any) => {
        setSelectedTypeOption(option);

        if (option.value === "NF") {
            setIsNFunctionalSelected(true);
        } else {
            setIsNFunctionalSelected(false);
            resetField("category");
        }
    };

    const onSubmit: SubmitHandler<any> = async (data: Inputs) => {
        let requirementsList: Array<number> = [];
        let artefactsList: Array<number> = [];

        if (data.requirements !== undefined) {
            requirementsList = data.requirements.map((option: AsyncSelectInputValuesType) => {
                return option.value;
            });
        }

        if (data.artefacts !== undefined) {
            artefactsList = data.artefacts.map((option: AsyncSelectInputValuesType) => {
                return option.value;
            });
        }

        const newData = {
            title: data.title,
            reason: data.reason,
            status:
                data.status.value === undefined ? selectedChangeOption.value : data.status.value,
            requestor: data.requestor,
            accountable: data.accountable,
            user_requestor: user.id,
            is_accepted: false,
            new_req: {
                title_requirement: data.title_requirement,
                description: data.description,
                status_requirement: RequirementsStatusEnum.implementado,
                type: data.type === undefined ? selectedTypeOption.value : data.type.value,
                category: data.category === undefined ? null : data.category,
                requirements: requirementsList,
                artefacts: artefactsList,
                stakeholders: data.stakeholders,
                source: data.source,
                versions: basedRequirement?.versions,
            },
            requisito_mudanca: basedRequirement ? basedRequirement.id : data.requirement,
        };

        setIsFirstForm(false);
        setIsSecondForm(true);

        let wasRequested = false;

        await api
            .post(`/pedido_mudanca/`, newData)
            .then(() => {
                wasRequested = true;
            })
            .catch((erro) => {
                toast.error("Erro na solicitação");
            });

        if (wasRequested) {
            const notificationData = {
                title: "Solicitação de mudança",
                mensagem: `Nova solicitação de mudança feita pelo membro ${newData.requestor}`,
                funcao_notificacao: UserFunctionEnum.comite,
            };

            await api
                .post(`/notificacao/`, notificationData)
                .then((response) => {
                    toast.success("Solicitação enviada com sucesso!");
                    toggleIsModalOpen();
                    reloadPage();
                })
                .catch((error) => {
                    toast.error("Erro na notificação");
                });
        }
    };

    const handleChangeStatus = (option: any) => {
        setSelectedChangeOption(option);
    };

    const toggleFormStep = () => {
        setIsFirstForm(false);
        setIsSecondForm(true);
    };

    return (
        <Background>
            <Container>
                <ModalHeader>
                    <h2 className="title">Solicitar Mudança</h2>
                </ModalHeader>
                <Content>
                    <form id="form_change" onSubmit={handleSubmit(onSubmit)}>
                        {isFirstForm && (
                            <>
                                <div className="caption">INFORMAÇÕES DA SOLICITAÇÃO</div>
                                <RowTwo>
                                    <div className="inputContainer">
                                        <label>Título</label>
                                        <Input
                                            type="text"
                                            id="title"
                                            placeholder="Digite um título para mudança"
                                            {...register("title")}
                                            focusBorderColor="#fab039"
                                        />
                                        <p className="error_message">{errors.title?.message}</p>
                                    </div>
                                    <div className="inputContainer">
                                        <label>Requisito</label>
                                        <Controller
                                            name="requirement"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <AsyncSelect
                                                    {...field}
                                                    isClearable
                                                    defaultOptions
                                                    onChange={(option) => getRequirement(option)}
                                                    placeholder="Selecione o requisito relacionado"
                                                    loadOptions={getRequirements}
                                                    styles={customStyles}
                                                />
                                            )}
                                        />
                                    </div>
                                </RowTwo>
                                <RowOne>
                                    <div className="inputContainer">
                                        <label>Descrição/Motivo</label>
                                        <Textarea
                                            placeholder="Digite o motivo e a descrição da mudança"
                                            {...register("reason")}
                                            focusBorderColor="#fab039"
                                        />
                                        <p className="error_message">{errors.reason?.message}</p>
                                    </div>
                                </RowOne>
                                <RowThree>
                                    <div className="inputContainer">
                                        <label>Status</label>
                                        <Controller
                                            name="status"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <Select
                                                        {...field}
                                                        value={selectedChangeOption}
                                                        options={ChangesTypes}
                                                        onChange={(option) =>
                                                            handleChangeStatus(option)
                                                        }
                                                        styles={customStyles}
                                                        defaultValue={{
                                                            value: "AN",
                                                            label: "Em análise",
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
                                        <p className="error_message">{errors.status?.message}</p>
                                    </div>
                                    <div className="inputContainer">
                                        <label>Responsável</label>
                                        <Input
                                            type="text"
                                            placeholder="Digite o nome do responsável pela mudança"
                                            {...register("accountable")}
                                            focusBorderColor="#fab039"
                                        />
                                        <p className="error_message">
                                            {errors.accountable?.message}
                                        </p>
                                    </div>
                                    <div className="inputContainer">
                                        <label>Solicitante</label>
                                        <Input
                                            type="text"
                                            placeholder="Digite o nome do solicitante da mudança"
                                            {...register("requestor")}
                                            focusBorderColor="#fab039"
                                        />
                                        <p className="error_message">{errors.reason?.message}</p>
                                    </div>
                                </RowThree>
                            </>
                        )}
                        {isSecondForm && (
                            <>
                                <div className="caption">
                                    <span>INFORMAÇÕES DO NOVO REQUISITO</span>
                                    <Tooltip
                                        label="Informar os dados alterados do requisito após a mudança solicitada"
                                        placement="right"
                                        bg="#b3b3b3"
                                    >
                                        <div>
                                            <AiFillQuestionCircle className="question_icon" />
                                        </div>
                                    </Tooltip>
                                </div>
                                <RowTwo>
                                    <div className="inputContainer">
                                        <label>Título</label>
                                        <Input
                                            type="text"
                                            id="title"
                                            placeholder="Ex: Cadastro de requisito"
                                            {...register("title_requirement")}
                                            focusBorderColor="#fab039"
                                        />
                                        <p className="error_message">{errors.title?.message}</p>
                                    </div>
                                    <div className="inputContainer">
                                        <label>Fonte</label>
                                        <Input
                                            type="text"
                                            id="source"
                                            placeholder="Digite o nome da fonte de informação do requisito"
                                            {...register("source")}
                                            focusBorderColor="#fab039"
                                        />
                                        <p className="error_message">{errors.source?.message}</p>
                                    </div>
                                </RowTwo>
                                <RowOne>
                                    <div className="inputContainer">
                                        <label>Descrição</label>
                                        <Input
                                            type="text"
                                            id="descricao"
                                            placeholder="Ex: O sistema deverá..."
                                            {...register("description")}
                                            focusBorderColor="#fab039"
                                        />
                                        <p className="error_message">
                                            {errors.description?.message}
                                        </p>
                                    </div>
                                </RowOne>
                                <RowTwo>
                                    <div className="inputContainer">
                                        <label>Tipo</label>
                                        <Controller
                                            name="type"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <Select
                                                        {...field}
                                                        value={selectedTypeOption}
                                                        options={RequirementsTypes}
                                                        onChange={(option) =>
                                                            handleChangeType(option)
                                                        }
                                                        styles={customStyles}
                                                        defaultValue={{
                                                            value: "F",
                                                            label: "Funcional",
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
                                        <p className="error_message">{errors.type?.message}</p>
                                    </div>
                                    <div className="inputContainer">
                                        <label>Categoria</label>
                                        <Input
                                            type="text"
                                            id="category"
                                            placeholder="Ex: Implementação, processo, segurança..."
                                            {...register("category")}
                                            focusBorderColor="#fab039"
                                            disabled={!isNFunctionalSelected}
                                        />
                                        <p className="error_message">{errors.category?.message}</p>
                                    </div>
                                </RowTwo>
                                <div className="caption">RELACIONAMENTOS</div>
                                <RowTwo>
                                    <div className="inputContainer">
                                        <label>Requisitos</label>
                                        <Controller
                                            name="requirements"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <AsyncSelect
                                                    {...field}
                                                    isMulti
                                                    isClearable
                                                    defaultOptions
                                                    placeholder="Selecione os requisitos relacionados"
                                                    loadOptions={getRequirements}
                                                    styles={customStyles}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="inputContainer">
                                        <label>Artefatos</label>
                                        <Controller
                                            name="artefacts"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <AsyncSelect
                                                    {...field}
                                                    isMulti
                                                    isClearable
                                                    defaultOptions
                                                    placeholder="Selecione os artefatos relacionados"
                                                    loadOptions={getArtefacts}
                                                    styles={customStyles}
                                                />
                                            )}
                                        />
                                    </div>
                                </RowTwo>
                                <RowOne>
                                    <div className="inputContainer">
                                        <label>Stakeholders</label>
                                        <Input
                                            type="text"
                                            id="stakeholders"
                                            placeholder="Digite o nome dos stakeholders"
                                            {...register("stakeholders")}
                                            focusBorderColor="#fab039"
                                        />
                                        <p className="error_message">
                                            {errors.stakeholders?.message}
                                        </p>
                                    </div>
                                </RowOne>
                            </>
                        )}
                    </form>
                </Content>
                <Footer>
                    {isFirstForm && (
                        <button className="btnRegister" onClick={toggleFormStep}>
                            PRÓXIMO
                        </button>
                    )}
                    {isSecondForm && (
                        <button type="submit" form="form_change" className="btnRegister">
                            SOLICITAR
                        </button>
                    )}
                    <button className="btnCancel" onClick={toggleIsModalOpen}>
                        CANCELAR
                    </button>
                </Footer>
            </Container>
        </Background>
    );
};

export default SolicitationModal;
