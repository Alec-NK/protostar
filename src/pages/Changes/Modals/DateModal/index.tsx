import { useState } from "react";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@chakra-ui/react";
import api from "../../../../services/api";

import { ChangeDataType } from "../InformationModal";
import { ChangesStatusEnum } from "../../../../util/Enums";

import { Background, Container, Content, Footer, Header } from "./styles";

type DateModalProps = {
    changeData: ChangeDataType | undefined;
    setIsOpen: () => void;
    setIsConcluded: () => void;
};

type Inputs = {
    start_date: any;
    final_date: any;
};

const DateModal = ({ changeData, setIsOpen, setIsConcluded }: DateModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<any> = async (data: Inputs) => {
        const dataChange = {
            status:
                changeData && changeData.status === ChangesStatusEnum.priorizando
                    ? ChangesStatusEnum.aprovado
                    : ChangesStatusEnum.finalizado,
            data_planejada:
                changeData && changeData.status === ChangesStatusEnum.priorizando
                    ? {
                          data_inicio: data.start_date,
                          data_final: data.final_date,
                      }
                    : {
                          data_inicio: changeData?.data_planejada.data_inicio,
                          data_final: changeData?.data_planejada.data_final,
                      },
            data_realizada:
                changeData && changeData.status === ChangesStatusEnum.priorizando
                    ? {}
                    : {
                          data_inicio: data.start_date,
                          data_final: data.final_date,
                      },
            reason: changeData && changeData.reason,
            requisito_mudanca: changeData && changeData.requisito_mudanca,
        };

        console.log("asd", dataChange);

        await api
            .put(`/pedido_mudanca/${changeData?.id}/`, dataChange)
            .then((response) => {
                toast.success("Status atualizado com sucesso!");
                setIsOpen();
                setIsConcluded();
            })
            .catch((error) => {
                toast.error("Houve um erro ao atualizar status");
            });
    };

    return (
        <Background>
            <Container>
                <Header>
                    <h2>
                        {changeData?.status === ChangesStatusEnum.priorizando
                            ? "PERÍODO PLANEJADO PARA IMPLEMENTAÇÃO"
                            : "PERÍODO DE IMPLEMENTAÇÃO"}
                    </h2>
                </Header>
                <Content>
                    <form id="form_date" onSubmit={handleSubmit(onSubmit)}>
                        <div className="inputContainer">
                            <label>Data início</label>
                            <Input
                                type="datetime-local"
                                focusBorderColor="#fab039"
                                {...register("start_date")}
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Data final</label>
                            <Input
                                type="datetime-local"
                                focusBorderColor="#fab039"
                                {...register("final_date")}
                            />
                        </div>
                    </form>
                </Content>
                <Footer>
                    <button type="submit" form="form_date" className="btnSave">
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

export default DateModal;
