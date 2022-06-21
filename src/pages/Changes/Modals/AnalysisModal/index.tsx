import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Status from "../../Status";

import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";

import { useFetch } from "../../../../hooks/useFetch";
import { formatDate } from "../../../../util/app.util";
import { RequirementsDataType } from "../../../Requirements";

import {
    Background,
    Caption,
    CloseButton,
    Container,
    Content,
    Element,
    ElementList,
    Footer,
    FourthRow,
    ModalHeader,
    Row,
    SecondRow,
    Section,
    Tag,
    ThirdRow,
    Title,
} from "./styles";

type InfoModalProps = {
    setIsOpen: () => void;
    reloadData: () => void;
    changeId: number;
};

type ChangeDataType = {
    id: number;
    title: string;
    reason: string;
    accountable: string;
    data_mudanca: null;
    data_pedido: string;
    is_accepted: boolean;
    new_req: null;
    progrecao: Array<number>;
    requestor: string;
    status: string;
};

const AnalysisModal = ({ setIsOpen, changeId, reloadData }: InfoModalProps) => {
    const { data, isFetching }: any = useFetch(
        `${process.env.REACT_APP_API_URL}/pedido_mudanca/${changeId}`
    );
    const [reqmtData, setReqmtData] = useState<RequirementsDataType>();

    const getRequirement = useCallback(async (requirementId: number) => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/requisitos/${requirementId}/`)
            .then((response) => {
                setReqmtData(response.data);
            })
            .catch(() => {
                toast.error("Houve um erro");
            });
    }, []);

    const toggleIsModalOpen = () => {
        setIsOpen();
    };

    const ChangeStatus = useCallback(
        async (requirementId: number, choice: string) => {
            const dataModified = {
                progrecao: data && data.progrecao,
                reason: data && data.reason,
                status: choice,
            };

            await axios
                .put(
                    `${process.env.REACT_APP_API_URL}/pedido_mudanca/${requirementId}/`,
                    dataModified
                )
                .then((response) => {
                    toast.success("Status atualizado com sucesso!");
                    setIsOpen();
                    reloadData();
                })
                .catch((error) => {
                    console.log("Erro", error);
                    toast.error("Houve um erro");
                });
        },
        [data]
    );

    useEffect(() => {
        console.log("Teste", data);
        if (data && data.progrecao.length > 0) {
            getRequirement(data.progrecao[0]);
        }
    }, [data, getRequirement]);

    useEffect(() => {}, [reqmtData]);

    return (
        <Background>
            <Container>
                <ModalHeader>
                    <h2 className="title">
                        {data?.status === "AN" ? "Análise da mudança" : "Informações da Mudança"}
                    </h2>
                    <CloseButton onClick={toggleIsModalOpen}>
                        <IoMdClose />
                    </CloseButton>
                </ModalHeader>
                <Content>
                    <Section>
                        <Caption>DETALHES DA SOLICITAÇÃO</Caption>
                        <Title>
                            <h3>{`Mudança ${data?.id} - ${data?.title}`}</h3>
                        </Title>
                        <ThirdRow>
                            <Element>
                                <div className="attribute">Solicitante:</div>
                                <div className="value_info">{data?.requestor}</div>
                            </Element>
                            <Element>
                                <div className="attribute">Responsável:</div>
                                <div className="value_info">{data?.accountable}</div>
                            </Element>
                            <Element>
                                <div className="attribute">Data da solicitação:</div>
                                <div className="value_info">
                                    {data && data.data_pedido ? formatDate(data.data_pedido) : ""}
                                </div>
                            </Element>
                        </ThirdRow>
                        <SecondRow>
                            <Element>
                                <div className="attribute">O motivo e a descrição da mudança:</div>
                                <div className="value_info">{data?.reason}</div>
                            </Element>
                            <Element>
                                <div className="attribute">Stakeholders relacionados:</div>
                                <div className="value_list">
                                    <ul>
                                        {reqmtData?.stake_holders.map(
                                            (stake: string, index: number) => {
                                                return <li key={index}>{stake}</li>;
                                            }
                                        )}
                                    </ul>
                                </div>
                            </Element>
                        </SecondRow>
                    </Section>
                    <Section>
                        <Caption>INFORMAÇÕES DOS REQUISITOS</Caption>
                        <Title>
                            <h3>{`Requisito ${reqmtData?.id} - ${reqmtData?.title}`}</h3>
                        </Title>
                        <SecondRow>
                            <Element>
                                <div className="attribute">Descrição:</div>
                                <div className="value_info">{reqmtData?.description}</div>
                            </Element>
                            <Element>
                                <div className="attribute">Data de criação:</div>
                                <div className="value_info">
                                    {reqmtData &&
                                        reqmtData.created_data &&
                                        formatDate(reqmtData?.created_data)}
                                </div>
                            </Element>
                        </SecondRow>
                        <FourthRow>
                            <Element>
                                <div className="attribute">Fonte:</div>
                                <div className="value_info">{reqmtData?.source}</div>
                            </Element>
                            <Element>
                                <div className="attribute">Status:</div>
                                <Status />
                            </Element>
                            <Element>
                                <div className="attribute">Tipo:</div>
                                <div className="value_info">
                                    {reqmtData?.type === "F" ? "Funcional" : "Não Funcional"}
                                </div>
                            </Element>
                            <Element>
                                <div className="attribute">Versão:</div>
                                <div className="value_info">{reqmtData?.version}</div>
                            </Element>
                        </FourthRow>
                        <Row>
                            <ElementList>
                                <div className="attribute">Requisitos Relacionados:</div>
                                <div className="values_row">
                                    {reqmtData?.requirements.map((reqId) => {
                                        return (
                                            <Tag>Requisito {reqId < 10 ? `0${reqId}` : reqId}</Tag>
                                        );
                                    })}
                                </div>
                            </ElementList>
                        </Row>
                    </Section>
                </Content>
                <Footer>
                    {data?.status === "AN" && (
                        <>
                            <button
                                className="btn_footer"
                                id="btn_accept"
                                onClick={() => ChangeStatus(data?.id, "ING")}
                            >
                                <FaCheck className="icon_btn" />
                                ACEITAR
                            </button>
                            <button
                                className="btn_footer"
                                id="btn_reject"
                                onClick={() => ChangeStatus(data?.id, "RJ")}
                            >
                                <IoCloseCircleSharp className="icon_btn" /> REJEITAR
                            </button>
                        </>
                    )}
                    {data?.status === "ING" && (
                        <>
                            <button
                                className="btn_footer"
                                id="btn_imp"
                                onClick={() => ChangeStatus(data?.id, "VE")}
                            >
                                <FaCheck className="icon_btn" />
                                IMPLEMENTADO
                            </button>
                        </>
                    )}
                    {data?.status === "VE" && (
                        <>
                            <>
                                <button
                                    className="btn_footer"
                                    id="btn_imp"
                                    onClick={() => ChangeStatus(data?.id, "D")}
                                >
                                    <FaCheck className="icon_btn" /> IMPLEMENTAÇÃO COMPLETA
                                </button>
                                <button
                                    className="btn_footer"
                                    id="btn_reject"
                                    onClick={() => ChangeStatus(data?.id, "ING")}
                                >
                                    <IoCloseCircleSharp className="icon_btn" /> IMPLEMENTAÇÃO
                                    INCOMPLETA
                                </button>
                            </>
                        </>
                    )}
                </Footer>
            </Container>
        </Background>
    );
};

export default AnalysisModal;
