import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { Divider, Tooltip } from "@chakra-ui/react";
import api from "../../../../services/api";

import Status from "../../../../components/Status";

import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { AiFillQuestionCircle } from "react-icons/ai";

import { useFetch } from "../../../../hooks/useFetch";
import { formatDate } from "../../../../util/app.util";
import { RequirementsDataType } from "../../../Requirements";
import { StatusKinds } from "../../../../util/Enums";

import {
    Background,
    ButtonSection,
    Caption,
    CloseButton,
    Container,
    Content,
    Element,
    ElementList,
    Footer,
    ModalHeader,
    RowFour,
    RowOne,
    RowThree,
    RowTwo,
    Section,
    SectionsPage,
    Tag,
    Title,
} from "./styles";

type InfoModalProps = {
    setIsOpen: () => void;
    reloadData: () => void;
    changeId: number;
};

type NewRequirementType = {
    title_requirement: string;
    description: string;
    status_requirement: string;
    type: string;
    category: string | null;
    requirements: Array<number>;
    stakeholders: string;
    source: string;
    version: string;
};

type ChangeDataType = {
    id: number;
    title: string;
    reason: string;
    accountable: string;
    data_mudanca: null;
    data_pedido: string;
    is_accepted: boolean;
    new_req: NewRequirementType;
    requestor: string;
    status: string;
    requisito_mudanca: number;
};

type RelatedDataType = {
    requirements: RequirementsDataType[][];
    artefacts: any[][];
};

const AnalysisModal = ({ setIsOpen, changeId, reloadData }: InfoModalProps) => {
    const [isSolicitationTab, setIsSolicitationTab] = useState(true);
    const [isRequirementTab, setIsRequirementTab] = useState(false);
    const [isNewRequirementTab, setIsNewRequirementTab] = useState(false);
    const [data, setData] = useState<ChangeDataType>();
    const [reqmtData, setReqmtData] = useState<RequirementsDataType>({} as RequirementsDataType);
    const [newReqmtData, setNewReqmtData] = useState<NewRequirementType>({} as NewRequirementType);
    const [requirementRelatedData, setRequirementRelatedData] = useState<RelatedDataType>(
        {} as RelatedDataType
    );
    const [newRequirementRelatedData, setNewRequirementRelatedData] = useState<RelatedDataType>(
        {} as RelatedDataType
    );

    const getChange = useCallback(async () => {
        await api
            .post(`/pedido_requisito/`, { id: changeId })
            .then((response) => {
                setData(response.data.pedido[0]);
                setReqmtData(response.data.requisito[0]);

                const newReqVersion = response.data.requisito[0].version;
                const versionNumber = newReqVersion.split("-")[1];
                response.data.pedido[0].new_req.version = `vs-${Number(versionNumber) + 1}`;

                setNewReqmtData(response.data.pedido[0].new_req);
            })
            .catch((erro) => {
                toast.error("Houve um erro");
            });
    }, [changeId]);

    const getRelatedRequirements = useCallback(async (requirementId: number) => {
        await api
            .post(`/related_requirements/`, { id: requirementId })
            .then((response) => {
                setRequirementRelatedData({
                    requirements: response.data.relacionamento,
                    artefacts: response.data.artefatos,
                });
            })
            .catch(() => {
                toast.error("Houve um erro");
            });
    }, []);

    const getNewRequirementRelated = useCallback(async (requirementsIds: number[]) => {
        const relatedRequirements: Array<RequirementsDataType> = [];
        requirementsIds.map(async (id) => {
            await api
                .get(`/requisitos/${id}/`)
                .then((response) => {
                    relatedRequirements.push(response.data);
                })
                .catch((error) => {
                    toast.error("Houve um erro");
                });
        });

        setNewRequirementRelatedData({
            requirements: [relatedRequirements],
            artefacts: [],
        });
    }, []);

    const toggleIsModalOpen = () => {
        setIsOpen();
    };

    const ChangeStatus = useCallback(
        async (requirementId: number, choice: string) => {
            // const dataModified = {
            //     progrecao: data && data.progrecao,
            //     reason: data && data.reason,
            //     status: choice,
            // };
            // await api
            //     .put(`/pedido_mudanca/${requirementId}/`, dataModified)
            //     .then((response) => {
            //         console.log("Response", response.data);
            //         toast.success("Status atualizado com sucesso!");
            //         setIsOpen();
            //         reloadData();
            //     })
            //     .catch((error) => {
            //         console.log("Erro", error);
            //         toast.error("Houve um erro");
            //     });
        },
        [data]
    );

    useEffect(() => {
        if (data) {
            getRelatedRequirements(data.requisito_mudanca);
            getNewRequirementRelated(data.new_req.requirements);
        }
    }, [data, getRelatedRequirements, getNewRequirementRelated]);

    useEffect(() => {
        getChange();
    }, [getChange]);

    const toggleSolicitationTab = () => {
        setIsSolicitationTab(true);
        setIsRequirementTab(false);
        setIsNewRequirementTab(false);
    };

    const toggleRequirementTab = () => {
        setIsSolicitationTab(false);
        setIsRequirementTab(true);
        setIsNewRequirementTab(false);
    };

    const toggleNewRequirementTab = () => {
        setIsSolicitationTab(false);
        setIsRequirementTab(false);
        setIsNewRequirementTab(true);
    };

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
                <SectionsPage>
                    <ButtonSection isActive={isSolicitationTab} onClick={toggleSolicitationTab}>
                        Solicitação
                    </ButtonSection>
                    <ButtonSection isActive={isRequirementTab} onClick={toggleRequirementTab}>
                        Requisito
                    </ButtonSection>
                    <ButtonSection isActive={isNewRequirementTab} onClick={toggleNewRequirementTab}>
                        Novo Requisito
                    </ButtonSection>
                </SectionsPage>
                {isSolicitationTab && (
                    <Content>
                        <Section>
                            <Caption>
                                <span>DETALHES DA SOLICITAÇÃO</span>
                            </Caption>
                            <Title>
                                <h3>{`Mudança ${
                                    data && data.id < 10 ? `0${data?.id}` : data?.id
                                } - ${data?.title}`}</h3>
                            </Title>

                            <RowTwo>
                                <Element>
                                    <div className="attribute">
                                        O motivo e a descrição da mudança:
                                    </div>
                                    <div className="value_info">{data?.reason}</div>
                                </Element>
                                <Element>
                                    <div className="attribute">Stakeholders relacionados:</div>
                                    <div className="value_info">*FAZER REQUISIÇÃO*</div>
                                </Element>
                            </RowTwo>
                            <RowThree>
                                <Element>
                                    <div className="attribute">Data da solicitação:</div>
                                    <div className="value_info">
                                        {data && data.data_pedido
                                            ? formatDate(data.data_pedido)
                                            : ""}
                                    </div>
                                </Element>
                                <Element>
                                    <div className="attribute">Solicitante:</div>
                                    <div className="value_info">{data?.requestor}</div>
                                </Element>
                                <Element>
                                    <div className="attribute">Responsável:</div>
                                    <div className="value_info">{data?.accountable}</div>
                                </Element>
                            </RowThree>
                        </Section>
                    </Content>
                )}
                {isRequirementTab && (
                    <Content>
                        <Section>
                            <Caption>
                                <span>DETALHES DO REQUISITO</span>
                                <Tooltip
                                    label="Informações atuais do requisito que sofrerá a mudança"
                                    placement="right"
                                    bg="#b3b3b3"
                                >
                                    <div>
                                        <AiFillQuestionCircle className="question_icon" />
                                    </div>
                                </Tooltip>
                            </Caption>
                            <Title>
                                <h3>{reqmtData?.title}</h3>
                            </Title>
                            <RowThree>
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
                                <Element>
                                    <div className="attribute">Versão:</div>
                                    <div className="value_info">{reqmtData?.version}</div>
                                </Element>
                            </RowThree>
                            {reqmtData.category ? (
                                <RowFour>
                                    <Element>
                                        <div className="attribute">Fonte:</div>
                                        <div className="value_info">{reqmtData?.source}</div>
                                    </Element>
                                    <Element>
                                        <div className="attribute">Status:</div>
                                        <Status
                                            status={reqmtData.status}
                                            type={StatusKinds.requirements}
                                        />
                                    </Element>
                                    <Element>
                                        <div className="attribute">Tipo:</div>
                                        <div className="value_info">
                                            {reqmtData?.type === "F"
                                                ? "Funcional"
                                                : "Não Funcional"}
                                        </div>
                                    </Element>
                                    <Element>
                                        <div className="attribute">Categoria:</div>
                                        <div className="value_info">{reqmtData?.category}</div>
                                    </Element>
                                </RowFour>
                            ) : (
                                <RowThree>
                                    <Element>
                                        <div className="attribute">Fonte:</div>
                                        <div className="value_info">{reqmtData?.source}</div>
                                    </Element>
                                    <Element>
                                        <div className="attribute">Status:</div>
                                        <Status
                                            status={reqmtData.status}
                                            type={StatusKinds.requirements}
                                        />
                                    </Element>
                                    <Element>
                                        <div className="attribute">Tipo:</div>
                                        <div className="value_info">
                                            {reqmtData?.type === "F"
                                                ? "Funcional"
                                                : "Não Funcional"}
                                        </div>
                                    </Element>
                                </RowThree>
                            )}
                            <RowTwo>
                                <ElementList>
                                    <div className="attribute">Requisitos Relacionados:</div>
                                    <div className="values_row">
                                        {requirementRelatedData.requirements.map((requirement) => {
                                            return requirement.map((req, index) => {
                                                return <Tag key={index}>{req.title}</Tag>;
                                            });
                                        })}
                                    </div>
                                </ElementList>
                                <ElementList>
                                    <div className="attribute">Artefatos Relacionados:</div>
                                    <div className="values_row">
                                        {requirementRelatedData.artefacts.map((artefact) => {
                                            return artefact.map((art, index) => {
                                                return <Tag key={index}>{art.name}</Tag>;
                                            });
                                        })}
                                    </div>
                                </ElementList>
                            </RowTwo>
                            <RowOne>
                                <Element>
                                    <div className="attribute">Stakeholders Relacionados:</div>
                                    <div className="value_info">
                                        {reqmtData?.stake_holders.stakeholders}
                                    </div>
                                </Element>
                            </RowOne>
                        </Section>
                    </Content>
                )}
                {isNewRequirementTab && (
                    <Content>
                        <Section>
                            <Caption>
                                <span>DETALHES DO NOVO REQUISITO</span>
                                <Tooltip
                                    label="Informações do requisito após as alterações solicitadas"
                                    placement="right"
                                    bg="#b3b3b3"
                                >
                                    <div>
                                        <AiFillQuestionCircle className="question_icon" />
                                    </div>
                                </Tooltip>
                            </Caption>
                            <Title>
                                <h3>{newReqmtData.title_requirement}</h3>
                            </Title>
                            <RowThree>
                                <Element>
                                    <div className="attribute">Descrição:</div>
                                    <div className="value_info">{newReqmtData.description}</div>
                                </Element>
                                <Element>
                                    <div className="attribute">Tipo:</div>
                                    <div className="value_info">
                                        {newReqmtData.type === "F" ? "Funcional" : "Não Funcional"}
                                    </div>
                                </Element>
                                <Element>
                                    <div className="attribute">Versão:</div>
                                    <div className="value_info">{newReqmtData.version}</div>
                                </Element>
                            </RowThree>
                            <RowThree>
                                <Element>
                                    <div className="attribute">Fonte:</div>
                                    <div className="value_info">{newReqmtData.source}</div>
                                </Element>
                                <Element>
                                    <div className="attribute">Status:</div>
                                    <Status
                                        status={newReqmtData.status_requirement}
                                        type={StatusKinds.requirements}
                                    />
                                </Element>
                                {newReqmtData.category && (
                                    <Element>
                                        <div className="attribute">Categoria:</div>
                                        <div className="value_info">{newReqmtData.category}</div>
                                    </Element>
                                )}
                            </RowThree>
                            <RowTwo>
                                <ElementList>
                                    <div className="attribute">Requisitos Relacionados:</div>
                                    <div className="values_row">
                                        {newRequirementRelatedData.requirements.map(
                                            (requirement) => {
                                                return requirement.map((req, index) => {
                                                    return <Tag key={index}>{req.title}</Tag>;
                                                });
                                            }
                                        )}
                                    </div>
                                </ElementList>
                                <ElementList>
                                    <div className="attribute">Artefatos Relacionados:</div>
                                    <div className="values_row">*FAZER REQUISIÇÃO*</div>
                                </ElementList>
                            </RowTwo>
                            <RowOne>
                                <Element>
                                    <div className="attribute">Stakeholders Relacionados:</div>
                                    <div className="value_info">{newReqmtData.stakeholders}</div>
                                </Element>
                            </RowOne>
                        </Section>
                    </Content>
                )}
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
