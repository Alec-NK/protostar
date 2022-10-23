import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input, Textarea } from "@chakra-ui/react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../../services/api";

import Select from "react-select";

import { ArtefactsTypes } from "../../../../util/Types";

import { Background, Container, Content, Footer, ModalHeader, RowOne, RowTwo } from "./styles";

type RegisterModalProps = {
    setIsOpen: () => void;
    reloadPage: () => void;
};

export type SelectInputValuesType = {
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

const RegisterModal = ({ setIsOpen, reloadPage }: RegisterModalProps) => {
    const {
        register,
        handleSubmit,
        resetField,
        control,
        formState: { errors },
    } = useForm<Inputs>({ resolver: yupResolver(schema) });
    const [selectedTypeOption, setSelectedTypeOption] = useState<SelectInputValuesType>();

    const toggleIsModalOpen = () => {
        setIsOpen();
    };

    const handleChangeStatus = (option: any) => {
        setSelectedTypeOption(option);
    };

    const onSubmit: SubmitHandler<any> = async (data: Inputs) => {
        const registerData = {
            name: data.name,
            type: selectedTypeOption?.value,
            description: data.description,
        };

        await api
            .post("/artefatos/", registerData)
            .then(() => {
                toast.success("Artefato cadastrado com sucesso!");
                toggleIsModalOpen();
                reloadPage();
            })
            .catch((erro) => {
                toast.error("Erro no cadastro");
            });
    };

    return (
        <Background>
            <Container>
                <ModalHeader>
                    <h2 className="title">Cadastrar artefatos</h2>
                </ModalHeader>
                <Content>
                    <form id="form_new_artefact" onSubmit={handleSubmit(onSubmit)}>
                        <div className="caption">INFORMAÇÕES DO ARTEFATO</div>
                        <RowTwo>
                            <div className="inputContainer">
                                <label>Nome do artefato</label>
                                <Input
                                    type="text"
                                    id="title"
                                    placeholder="Ex: Diagrama de classe"
                                    {...register("name")}
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
                                                placeholder="Selecione o tipo do artefato"
                                            />
                                        );
                                    }}
                                />
                                {errors.type && <p className="error_message">Tipo obrigatório!</p>}
                            </div>
                        </RowTwo>
                        <RowOne>
                            <div className="inputContainer">
                                <label>Descrição</label>
                                <Textarea
                                    placeholder="Digite a descrição do artefato"
                                    {...register("description")}
                                    focusBorderColor="#fab039"
                                />
                                <p className="error_message">{errors.description?.message}</p>
                            </div>
                        </RowOne>
                    </form>
                </Content>
                <Footer>
                    <button type="submit" form="form_new_artefact" className="btnRegister">
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
