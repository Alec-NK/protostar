import { useState } from "react";
import { Input, Textarea } from "@chakra-ui/react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Select from "react-select";

import { ArtefactDataType } from "../..";
import { ArtefactsTypes } from "../../../../util/Types";

import api from "../../../../services/api";

import { Background, Container, Content, Footer, ModalHeader, RowOne, RowTwo } from "./styles";

type EditModalProps = {
    artefactData: ArtefactDataType;
    setIsOpen: () => void;
    reloadPage: () => void;
};

type SelectInputValuesType = {
    value: string;
    label: string;
};

type Inputs = {
    name: string;
    description: string;
    type: Array<SelectInputValuesType>;
};

const schema = yup
    .object({
        name: yup.string().required("Nome obrigatório!"),
        description: yup.string().required("Descrição obrigatória!"),
        type: yup
            .object()
            .shape({
                value: yup.string(),
                label: yup.string(),
            })
            .required("Tipo obrigatório!"),
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

const EditModal = ({ artefactData, setIsOpen, reloadPage }: EditModalProps) => {
    const {
        register,
        handleSubmit,
        resetField,
        control,
        formState: { errors },
    } = useForm<Inputs>({ resolver: yupResolver(schema) });
    const [selectedTypeOption, setSelectedTypeOption] = useState<any>(() => {
        return ArtefactsTypes.find((artefactType) => {
            return artefactType.value === artefactData.type.value;
        });
    });

    const toggleIsModalOpen = () => {
        setIsOpen();
    };

    const handleChangeStatus = (option: any) => {
        setSelectedTypeOption(option);
    };

    const onSubmit: SubmitHandler<any> = async (formData: Inputs) => {
        const dataChanged = {
            name: formData.name,
            type: selectedTypeOption.value,
            description: formData.description,
        };

        await api
            .put(`/artefatos/${artefactData.id}/`, dataChanged)
            .then(() => {
                toast.success("Artefato editado com sucesso!");
                setIsOpen();
                reloadPage();
            })
            .catch((erro) => {
                toast.error("Erro na alteração");
            });
    };

    return (
        <Background>
            <Container>
                <ModalHeader>
                    <h2 className="title">Editar artefato</h2>
                </ModalHeader>
                <Content>
                    <form id="form_edit_artefact" onSubmit={handleSubmit(onSubmit)}>
                        <div className="caption">INFORMAÇÕES DO ARTEFATO</div>
                        <RowTwo>
                            <div className="inputContainer">
                                <label>Nome do artefato</label>
                                <Input
                                    type="text"
                                    id="name"
                                    {...register("name")}
                                    defaultValue={artefactData.name}
                                    focusBorderColor="#fab039"
                                />
                                <p className="error_message">{errors.name?.message}</p>
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
                                                options={ArtefactsTypes}
                                                onChange={(option) => handleChangeStatus(option)}
                                                styles={customStyles}
                                            />
                                        );
                                    }}
                                />
                            </div>
                        </RowTwo>
                        <RowOne>
                            <div className="inputContainer">
                                <label>Descrição</label>
                                <Textarea
                                    placeholder="Digite a descrição do artefato"
                                    {...register("description")}
                                    defaultValue={
                                        artefactData.description ? artefactData.description : ""
                                    }
                                    focusBorderColor="#fab039"
                                />
                                <p className="error_message">{errors.description?.message}</p>
                            </div>
                        </RowOne>
                    </form>
                </Content>
                <Footer>
                    <button type="submit" form="form_edit_artefact" className="btnSave">
                        SALVAR
                    </button>
                    <button className="btnCancel" onClick={toggleIsModalOpen}>
                        CANCELAR
                    </button>
                </Footer>
            </Container>
        </Background>
    );
};

export default EditModal;
