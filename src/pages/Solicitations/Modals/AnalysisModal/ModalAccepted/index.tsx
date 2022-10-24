import { useState } from "react";
import { toast } from "react-toastify";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import api from "../../../../../services/api";

import { Input } from "@chakra-ui/react";
import Select from "react-select";

import { ChangeDataType } from "../../../../Changes/Modals/InformationModal";
import { ChangesStatusEnum } from "../../../../../util/Enums";

import { Background, Caption, Container, Content, Footer, Header } from "./styles";

type ModalAcceptedProps = {
    solicitationData: ChangeDataType | undefined;
    setIsOpen: () => void;
    setIsConcluded: () => void;
};

type SelectType = {
    value: string;
    label: string;
};

type Inputs = {
    impact: string;
    size: SelectType;
    start_date: any;
    final_date: any;
};

const sizeOptions = [
    { value: "PEQUENA", label: "Pequena" },
    { value: "GRANDE", label: "Grande" },
];

const impactOptions = [
    { value: "Baixo", label: "Baixo" },
    { value: "Médio", label: "Médio" },
    { value: "Grande", label: "Grande" },
];

const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        boxShadow: "none",
        marginTop: "5px",
        outline: "none",
        border: "1px solid #e2e2e2",
        "&:hover": {
            border: "1px solid #e2e2e2",
        },
    }),
    menu: (provided: any, state: any) => ({
        ...provided,
        fontFamily: '"Montserrat", sans-serif;',
    }),
};

const ModalAccepted = ({ solicitationData, setIsOpen, setIsConcluded }: ModalAcceptedProps) => {
    const {
        register,
        handleSubmit,
        resetField,
        control,
        formState: { errors },
    } = useForm<Inputs>();
    const [selectedImpact, setSelectedImpact] = useState<SelectType>();
    const [selectedSize, setSelectedSize] = useState<SelectType>();

    const handleChangeSize = (option: any) => {
        setSelectedSize(option);
    };

    const handleChangeImpact = (option: any) => {
        setSelectedImpact(option);
    };

    const onSubmit: SubmitHandler<any> = async (data: Inputs) => {
        if (selectedImpact === undefined) {
            return toast.error("Selecione o nível de impacto!");
        }

        if (selectedSize === undefined) {
            return toast.error("Selecione o tamanho da mudança!");
        }

        if (
            selectedSize &&
            selectedSize.value === "PEQUENA" &&
            (data.start_date === undefined || data.final_date === undefined)
        ) {
            return toast.error("Selecione as datas planejadas!");
        }

        const dataChange = {
            impact: selectedImpact && selectedImpact.value,
            change: selectedSize && selectedSize.value,
            status:
                selectedSize?.value === "GRANDE"
                    ? ChangesStatusEnum.priorizando
                    : ChangesStatusEnum.aprovado,
            data_planejada:
                selectedSize?.value === "GRANDE"
                    ? {}
                    : {
                          data_inicio: data.start_date,
                          data_final: data.final_date,
                      },
            reason: solicitationData && solicitationData.reason,
            requisito_mudanca: solicitationData && solicitationData.requisito_mudanca,
        };

        await api
            .put(`/pedido_mudanca/${solicitationData?.id}/`, dataChange)
            .then((response) => {
                toast.success("Mudança aprovada!");
                setIsOpen();
                setIsConcluded();
            })
            .catch((error) => {
                toast.error("Houve um erro");
            });
    };

    return (
        <Background>
            <Container>
                <Header>
                    <h2>Aprovar Mudança</h2>
                </Header>
                <Content>
                    <form id="form_change_status" onSubmit={handleSubmit(onSubmit)}>
                        <div className="inputContainer">
                            <label>Impacto da mudança</label>
                            <Controller
                                name="impact"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            {...field}
                                            value={selectedImpact}
                                            options={impactOptions}
                                            onChange={(option) => handleChangeImpact(option)}
                                            placeholder="Selecione o nível do impacto da mudança"
                                            styles={customStyles}
                                        />
                                    );
                                }}
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Tamanho da mudança</label>
                            <Controller
                                name="size"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            {...field}
                                            value={selectedSize}
                                            options={sizeOptions}
                                            onChange={(option) => handleChangeSize(option)}
                                            placeholder="Selecione o tamanho da mudança"
                                            styles={customStyles}
                                        />
                                    );
                                }}
                            />
                        </div>
                        <Caption>PERÍODO PLANEJADO PARA IMPLEMENTAÇÃO</Caption>
                        <div className="inputContainer">
                            <label>Data início</label>
                            <Input
                                type="datetime-local"
                                focusBorderColor="#fab039"
                                {...register("start_date")}
                                disabled={
                                    selectedSize?.value === "GRANDE" || selectedSize === undefined
                                }
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Data final</label>
                            <Input
                                type="datetime-local"
                                focusBorderColor="#fab039"
                                {...register("final_date")}
                                disabled={
                                    selectedSize?.value === "GRANDE" || selectedSize === undefined
                                }
                            />
                        </div>
                    </form>
                </Content>
                <Footer>
                    <button type="submit" form="form_change_status" className="btnSave">
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

export default ModalAccepted;
