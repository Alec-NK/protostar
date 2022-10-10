import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@chakra-ui/react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Select from "react-select";
import AsyncSelect from "react-select/async";

import { AuthContext } from "../../../../contexts/AuthContext";
import { RequirementsTypes, RequirementStatusTypes } from "../../../../util/Types";
import api from "../../../../services/api";

import { Background, Container, Content, Footer, ModalHeader } from "./styles";

type RegisterModalProps = {
    setIsOpen: () => void;
    reloadPage: () => void;
};

export type AsyncSelectInputValuesType = {
    value: number;
    label: string;
};

type Inputs = {
    title: string;
    description: string;
    status: any;
    type: any;
    category: string | null;
    requirements: Array<AsyncSelectInputValuesType>;
    stakeholders: string;
    source: string;
};

const schema = yup
    .object({
        title: yup.string().required("Título obrigatório!"),
        description: yup.string().required("Descrição obrigatória!"),
        status: yup
            .object()
            .shape({
                value: yup.string(),
                label: yup.string(),
            })
            .required("Status obrigatório!"),
        type: yup
            .object()
            .shape({
                value: yup.string(),
                label: yup.string(),
            })
            .required("Tipo obrigatório!"),
        category: yup.string().max(20, "Máximo de 20 caracteres"),
        stakeholders: yup.string(),
        source: yup.string().required("Fonte obrigatória!"),
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

const RegisterModal = ({ setIsOpen, reloadPage }: RegisterModalProps) => {
    const { user } = useContext(AuthContext);
    const [isNFunctionalSelected, setIsNFunctionalSelected] = useState(false);
    const {
        register,
        handleSubmit,
        resetField,
        control,
        formState: { errors },
    } = useForm<Inputs>({ resolver: yupResolver(schema) });
    const [selectedTypeOption, setSelectedTypeOption] = useState<any>(RequirementsTypes[0]);
    const [selectedStatusOption, setSelectedStatusOption] = useState<any>(
        RequirementStatusTypes[0]
    );

    const getRequirements = async () => {
        const response = await api.get(`/requisitos/`);
        const options = await response.data.map((req: any) => ({
            value: req.id,
            label: req.title,
        }));

        return options;
    };

    const toggleIsModalOpen = () => {
        setIsOpen();
    };

    const onSubmit: SubmitHandler<any> = async (data: Inputs) => {
        let reqList: Array<number> = [];

        if (data.requirements !== undefined) {
            reqList = data.requirements.map((option: AsyncSelectInputValuesType) => {
                return option.value;
            });
        }

        const newData = {
            title: data.title,
            description: data.description,
            type: data.type.value === undefined ? selectedTypeOption.value : data.type.value,
            status:
                data.status.value === undefined ? selectedStatusOption.value : data.status.value,
            category: data.category === undefined ? null : data.category,
            source: data.source,
            requirements: reqList,
            project_related: user.selectedProject,
            stake_holders: {
                stakeholders: data.stakeholders,
            },
        };

        await api
            .post(`/requisitos/`, newData)
            .then(() => {
                toast.success("Requisito cadastrado com sucesso!");
                toggleIsModalOpen();
                reloadPage();
            })
            .catch((erro) => {
                toast.error("Erro no cadastro");
            });
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

    const handleChangeStatus = (option: any) => {
        setSelectedStatusOption(option);
    };

    return (
        <Background>
            <Container>
                <ModalHeader>
                    <h2 className="title">Cadastrar requisito</h2>
                </ModalHeader>
                <Content>
                    <form id="form_new_requirement" onSubmit={handleSubmit(onSubmit)}>
                        <div className="caption">INFORMAÇÕES</div>
                        <div className="row" id="firstRow">
                            <div className="inputContainer">
                                <label>Título</label>
                                <Input
                                    type="text"
                                    id="title"
                                    placeholder="Ex: Cadastro de requisito"
                                    {...register("title")}
                                    focusBorderColor="#fab039"
                                />
                                <p className="error_message">{errors.title?.message}</p>
                            </div>
                            <div className="inputContainer">
                                <label>Descrição</label>
                                <Input
                                    type="text"
                                    id="descricao"
                                    placeholder="Ex: Cadastro de requisito"
                                    {...register("description")}
                                    focusBorderColor="#fab039"
                                />
                                <p className="error_message">{errors.description?.message}</p>
                            </div>
                        </div>
                        <div className="row" id="secondRow">
                            <div className="inputContainer">
                                <label>Status</label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Select
                                                {...field}
                                                value={selectedStatusOption}
                                                options={RequirementStatusTypes}
                                                onChange={(option) => handleChangeStatus(option)}
                                                styles={customStyles}
                                                defaultValue={{ value: "TD", label: "To-do" }}
                                            />
                                        );
                                    }}
                                />
                                <p className="error_message">{errors.status?.message}</p>
                            </div>
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
                                                onChange={(option) => handleChangeType(option)}
                                                styles={customStyles}
                                                defaultValue={{ value: "F", label: "Funcional" }}
                                            />
                                        );
                                    }}
                                />
                                <p className="error_message">{errors.type?.message}</p>
                            </div>
                            <div className="inputContainer" id="version">
                                <label>Versão</label>
                                <Input
                                    type="text"
                                    id="version"
                                    placeholder="vs-1"
                                    focusBorderColor="#fab039"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="row" id="thirdRow">
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
                            <div className="inputContainer">
                                <label>Fonte</label>
                                <Input
                                    type="text"
                                    id="source"
                                    placeholder="Digite o nome da fonte do requisito"
                                    {...register("source")}
                                    focusBorderColor="#fab039"
                                />
                                <p className="error_message">{errors.source?.message}</p>
                            </div>
                        </div>
                        <div className="caption">RELACIONAMENTOS</div>
                        <div className="row" id="fourthRow">
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
                                <label>Stakeholders</label>
                                <Input
                                    type="text"
                                    id="stakeholders"
                                    placeholder="Digite o nome dos stakeholders"
                                    {...register("stakeholders")}
                                    focusBorderColor="#fab039"
                                />
                                <p className="error_message">{errors.stakeholders?.message}</p>
                            </div>
                        </div>
                    </form>
                </Content>
                <Footer>
                    <button type="submit" form="form_new_requirement" className="btnRegister">
                        CADASTRAR
                    </button>
                    <button className="btnCancel" onClick={toggleIsModalOpen}>
                        CANCELAR
                    </button>
                </Footer>
            </Container>
        </Background>
    );
};

export default RegisterModal;
