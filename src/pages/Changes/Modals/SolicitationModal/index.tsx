import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import AsyncSelect from "react-select/async";
import Select from "react-select";

import { AsyncSelectInputValuesType } from "../../../Requirements/Modals/RegisterModal";
import { ChangesTypes, RequirementsTypes, StatusTypes } from "../../../../util/Types";

import { Background, Container, Content, Footer, ModalHeader } from "./styles";

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
    requirements: AsyncSelectInputValuesType;
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
        padding: "0.3rem",
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
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({ resolver: yupResolver(schema) });
    const [selectedChangeOption, setSelectedChangeOption] = useState<any>(ChangesTypes[0]);

    const getRequirements = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/requisitos/`);
        const options = await response.data.map((req: any) => ({
            value: req.id,
            label:
                req.type === "F"
                    ? `Requisito ${req.id} Funcional`
                    : `Requisito ${req.id} Não Funcional`,
        }));

        return options;
    };

    const toggleIsModalOpen = () => {
        setIsOpen();
    };

    const onSubmit: SubmitHandler<any> = async (data: Inputs) => {
        console.log("Send", data);

        const newData = {
            title: data.title,
            reason: data.reason,
            status:
                data.status.value === undefined ? selectedChangeOption.value : data.status.value,
            requestor: data.requestor,
            accountable: data.accountable,
            is_accepted: false,
            new_req: null,
            data_mudanca: null,
            progrecao: [data.requirements.value],
        };

        console.log("Send2", newData);

        await axios
            .post(`${process.env.REACT_APP_API_URL}/pedido_mudanca/`, newData)
            .then(() => {
                toast.success("Solicitação enviada com sucesso!");
                toggleIsModalOpen();
                reloadPage();
            })
            .catch((erro) => {
                console.log("Error", erro);
                toast.error("Erro na solicitação");
            });
    };

    const handleChangeStatus = (option: any) => {
        setSelectedChangeOption(option);
    };

    return (
        <Background>
            <Container>
                <ModalHeader>
                    <h2 className="title">Solicitar Mudança</h2>
                </ModalHeader>
                <Content>
                    <form id="form_new_requirement" onSubmit={handleSubmit(onSubmit)}>
                        <div className="caption">INFORMAÇÕES</div>
                        <div className="row" id="firstRow">
                            <div className="inputContainer">
                                <label>Título</label>
                                <input
                                    type="text"
                                    className="title"
                                    {...register("title")}
                                    placeholder="Insira um título para mudança"
                                />
                                <p className="error_message">{errors.title?.message}</p>
                            </div>
                            <div className="inputContainer">
                                <label>Requisitos</label>
                                <Controller
                                    name="requirements"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <AsyncSelect
                                            {...field}
                                            isClearable
                                            defaultOptions
                                            placeholder="Selecione o requisito relacionados"
                                            loadOptions={getRequirements}
                                            styles={customStyles}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="row" id="secondRow">
                            <div className="inputContainer">
                                <label>Descrição/Motivo</label>
                                <textarea
                                    className="input_reason"
                                    {...register("reason")}
                                    placeholder="Insira o motivo e a descrição da mudança"
                                />
                                <p className="error_message">{errors.reason?.message}</p>
                            </div>
                        </div>
                        <div className="row" id="thirdRow">
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
                                                onChange={(option) => handleChangeStatus(option)}
                                                styles={customStyles}
                                                defaultValue={{ value: "AN", label: "Em análise" }}
                                            />
                                        );
                                    }}
                                />
                                <p className="error_message">{errors.status?.message}</p>
                            </div>
                            <div className="inputContainer">
                                <label>Responsável</label>
                                <input
                                    type="text"
                                    {...register("accountable")}
                                    placeholder="Responsável pela mudança"
                                />
                                <p className="error_message">{errors.accountable?.message}</p>
                            </div>
                            <div className="inputContainer">
                                <label>Solicitante</label>
                                <input
                                    type="text"
                                    {...register("requestor")}
                                    placeholder="Solicitante da mudança"
                                />
                                <p className="error_message">{errors.reason?.message}</p>
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

export default SolicitationModal;
