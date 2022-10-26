import { useContext } from "react";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@chakra-ui/react";
import api from "../../../../services/api";
import { AuthContext } from "../../../../contexts/AuthContext";

import { ChangeDataType } from "../InformationModal";
import { ChangesStatusEnum, UserFunctionEnum } from "../../../../util/Enums";

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
    const { user } = useContext(AuthContext);
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

        if (changeData && changeData.status === ChangesStatusEnum.verificando) {
            const newRequirementData = {
                title: changeData.new_req.title_requirement,
                active: true,
                description: changeData.new_req.description,
                type: changeData.new_req.type,
                status: changeData.new_req.status_requirement,
                category: changeData.new_req.category ? changeData.new_req.category : null,
                created_data: new Date(),
                source: changeData.new_req.source,
                requirements: changeData.new_req.requirements,
                artefacts: changeData.new_req.artefacts,
                project_related: user.selectedProject,
                stake_holders: {
                    stakeholders: changeData.new_req.stakeholders,
                },
                versions: changeData.requisito_mudanca,
            };

            await api
                .post(`/muda_versao/`, newRequirementData)
                .then((response) => {})
                .catch((error) => {
                    toast.error("Erro na mudança da versão do requisito");
                });
        }

        let wasRequested = false;

        await api
            .put(`/pedido_mudanca/${changeData?.id}/`, dataChange)
            .then((response) => {
                wasRequested = true;
                toast.success("Status atualizado com sucesso!");
                setIsOpen();
                setIsConcluded();
            })
            .catch((error) => {
                toast.error("Houve um erro ao atualizar status");
            });

        if (wasRequested && dataChange.status === ChangesStatusEnum.finalizado) {
            const notificationData = {
                title: "Solicitação de mudança finalizada",
                mensagem: `O processo de mudança da sua solicitação foi finalizada`,
                funcao_notificacao: UserFunctionEnum.comite,
                user: user.id,
                data_notificado: new Date(),
            };

            await api
                .post(`/notificacao/`, notificationData)
                .then((response) => {})
                .catch((error) => {
                    toast.error("Erro na notificação");
                });
        }
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
