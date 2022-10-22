import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "@chakra-ui/react";
import api from "../../../../services/api";

import Status from "../../../../components/Status";
import ModalAccepted from "./ModalAccepted";

import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { AiFillQuestionCircle } from "react-icons/ai";

import { RequirementsDataType } from "../../../Requirements";
import { ArtefactDataType } from "../../../Artefacts";
import { formatDate } from "../../../../util/app.util";
import { ChangesStatusEnum, StatusKinds } from "../../../../util/Enums";

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
import ModalConfirmation from "../../../../components/ModalConfirmation";

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
    artefacts: Array<number>;
    stakeholders: string;
    source: string;
    version: string;
};

export type ChangeDataType = {
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
    data_planejada:
        | {
              data_inicio: string;
              data_final: string;
          }
        | JSON;
    data_realizada:
        | {
              data_inicio: string;
              data_final: string;
          }
        | JSON;
    requisito_mudanca: number;
};

type RelatedDataType = {
    requirements: RequirementsDataType[][];
    artefacts: ArtefactDataType[][];
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
    const [isModalAcceptedOpen, setIsModalAcceptedOpen] = useState(false);
    const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);

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

    const getRequirementRelateds = useCallback(async (requirementId: number) => {
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

    const getNewRequirementRelateds = useCallback(
        async (requirementsIds: number[], artefactsIds: number[]) => {
            const relatedRequirements: Array<RequirementsDataType> = [];
            requirementsIds.map(async (id) => {
                await api
                    .get(`/requisitos/${id}/`)
                    .then((response) => {
                        relatedRequirements.push(response.data);
                    })
                    .catch((error) => {
                        if (error.response.status !== 404) {
                            toast.error("Houve um erro");
                        }
                    });
            });

            const relatedArtefacts: Array<ArtefactDataType> = [];
            artefactsIds.map(async (id) => {
                await api
                    .get(`/artefatos/${id}/`)
                    .then((response) => {
                        relatedArtefacts.push(response.data);
                    })
                    .catch((error) => {
                        if (error.response.status !== 404) {
                            toast.error("Houve um erro");
                        }
                    });
            });

            setNewRequirementRelatedData({
                requirements: [relatedRequirements],
                artefacts: [relatedArtefacts],
            });
        },
        []
    );

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

    const toggleIsModalOpen = () => {
        setIsOpen();
    };

    const toggleModalAcceptedOpen = () => {
        setIsModalAcceptedOpen((prevState) => !prevState);
    };

    const toggleModalRejectOpen = () => {
        setIsModalRejectOpen((prevState) => !prevState);
    };

    const handleSolicitationAccepted = () => {
        toggleIsModalOpen();
        toggleModalAcceptedOpen();
        reloadData();
    };

    const handleSolicitationReject = () => {
        if (data) {
            ChangeStatus(data.id, ChangesStatusEnum.rejeitado);
        }
    };

    const ChangeStatus = useCallback(
        async (changeId: number, status: string) => {
            const dataModified = {
                reason: data && data.reason,
                status: status,
                requisito_mudanca: data && data.requisito_mudanca,
            };

            await api
                .put(`/pedido_mudanca/${changeId}/`, dataModified)
                .then((response) => {
                    toast.success("Status atualizado com sucesso!");
                    setIsOpen();
                    reloadData();
                })
                .catch((error) => {
                    toast.error("Houve um erro");
                });
        },
        [data, reloadData, setIsOpen]
    );

    useEffect(() => {
        if (data) {
            getRequirementRelateds(data.requisito_mudanca);
            getNewRequirementRelateds(data.new_req.requirements, data.new_req.artefacts);
        }
    }, [data, getRequirementRelateds, getNewRequirementRelateds]);

    useEffect(() => {
        getChange();
    }, [getChange]);

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

                            <RowOne>
                                <Element>
                                    <div className="attribute">
                                        O motivo e a descrição da mudança:
                                    </div>
                                    <div className="value_info">{data?.reason}</div>
                                </Element>
                            </RowOne>
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
                                    <div className="values_row">
                                        {newRequirementRelatedData.artefacts.map((artefact) => {
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
                                    <div className="value_info">{newReqmtData.stakeholders}</div>
                                </Element>
                            </RowOne>
                        </Section>
                    </Content>
                )}
                <Footer>
                    {data && data.status === ChangesStatusEnum.analisando && (
                        <>
                            <button
                                className="btn_footer"
                                id="btn_accept"
                                onClick={toggleModalAcceptedOpen}
                            >
                                <FaCheck className="icon_btn" />
                                ACEITAR
                            </button>
                            <button
                                className="btn_footer"
                                id="btn_reject"
                                onClick={toggleModalRejectOpen}
                            >
                                <IoCloseCircleSharp className="icon_btn" /> REJEITAR
                            </button>
                        </>
                    )}
                </Footer>
            </Container>
            {isModalAcceptedOpen && (
                <ModalAccepted
                    solicitationData={data}
                    setIsOpen={toggleModalAcceptedOpen}
                    setIsConcluded={handleSolicitationAccepted}
                />
            )}
            {isModalRejectOpen && (
                <ModalConfirmation
                    message="Você tem certeza que deseja rejeitar a solicitação?"
                    setIsOpen={toggleModalRejectOpen}
                    handleConfirm={handleSolicitationReject}
                />
            )}
        </Background>
    );
};

export default AnalysisModal;
