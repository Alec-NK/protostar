import { useCallback, useContext, useEffect, useState } from "react";
import { Input, Textarea } from "@chakra-ui/react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import { RequirementsDataType } from "../..";
import { AuthContext } from "../../../../contexts/AuthContext";
import { RequirementsTypes, RequirementStatusTypes } from "../../../../util/Types";
import api from "../../../../services/api";

import { Background, Container, Content, Footer, ModalHeader, Row } from "./styles";

type EditModalProps = {
    data: RequirementsDataType;
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
    requirements: Array<AsyncSelectInputValuesType>;
};

const schema = yup
    .object({
        title: yup.string().required("Título obrigatório!"),
        description: yup.string().required("Descrição obrigatória!"),
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

const EditModal = ({ data, setIsOpen, reloadPage }: EditModalProps) => {
    const { user } = useContext(AuthContext);
    const [selectedStatusOption, setSelectedStatusOption] = useState<any>(() => {
        return RequirementStatusTypes.find((statusType) => {
            return statusType.value === data.status;
        });
    });
    const [requirementsRelated, setRequirementsRelated] = useState<any>();
    const {
        register,
        handleSubmit,
        resetField,
        control,
        formState: { errors },
    } = useForm<Inputs>({ resolver: yupResolver(schema) });

    const getRequirements = useCallback(async () => {
        const response = await api.get(`/requisitos/`);
        const options = await response.data.map((req: any) => ({
            value: req.id,
            label: req.title,
        }));
        let defaultOptions = [];

        if (data) {
            defaultOptions = data.requirements.map((requirementId: any) => {
                return options.find((option: any) => {
                    return requirementId === option.value;
                });
            });
        }

        setRequirementsRelated(defaultOptions);

        return options;
    }, [data]);

    const handleChangeStatus = (option: any) => {
        setSelectedStatusOption(option);
    };

    const handleChangeRequirements = (option: any) => {
        setRequirementsRelated(option);
    };

    const onSubmit: SubmitHandler<any> = async (formData: Inputs) => {
        const reqList = requirementsRelated.map((option: AsyncSelectInputValuesType) => {
            return option.value;
        });

        const dataChanged = {
            title: formData.title,
            description: formData.description,
            status: selectedStatusOption.value,
            requirements: reqList,
            project_related: user.selectedProject,
            stake_holders: {
                stakeholders: [],
            },
        };

        if (reqList.length > 0) {
            await api
                .put(`/requisitos/${data.id}/`, dataChanged)
                .then(() => {
                    toast.success("Requisito editado com sucesso!");
                    setIsOpen();
                    reloadPage();
                })
                .catch((erro) => {
                    toast.error("Erro na alteração");
                });
        } else {
            toast.error("Deve relacionar pelo menos 1 requisito");
        }
    };

    return (
        <Background>
            <Container>
                <ModalHeader>
                    <h2 className="title">Editar requisito</h2>
                </ModalHeader>
                <Content>
                    <form id="form_edit_requirement" onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <div className="input_container">
                                <label>Título</label>
                                <Input
                                    type="text"
                                    id="title"
                                    placeholder="Ex: Cadastro de requisito"
                                    {...register("title")}
                                    focusBorderColor="#fab039"
                                    defaultValue={data?.title}
                                />
                                <p className="error_message">{errors.title?.message}</p>
                            </div>
                        </Row>
                        <Row>
                            <div className="input_container">
                                <label>Descrição</label>
                                <Textarea
                                    id="description"
                                    placeholder="Digite a descrição do requisito"
                                    {...register("description")}
                                    focusBorderColor="#fab039"
                                    defaultValue={data?.description}
                                />
                                <p className="error_message">{errors.description?.message}</p>
                            </div>
                        </Row>
                        <Row isDouble>
                            <div className="input_container">
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
                            </div>
                            <div className="input_container">
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
                                            value={requirementsRelated}
                                            onChange={(option) => handleChangeRequirements(option)}
                                            placeholder="Selecione os requisitos relacionados"
                                            loadOptions={getRequirements}
                                            styles={customStyles}
                                        />
                                    )}
                                />
                            </div>
                        </Row>
                    </form>
                </Content>
                <Footer>
                    <button type="submit" form="form_edit_requirement" className="btnSave">
                        SALVAR
                    </button>
                    <button className="btnCancel" onClick={setIsOpen}>
                        CANCELAR
                    </button>
                </Footer>
            </Container>
        </Background>
    );
};

export default EditModal;
