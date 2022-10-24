import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Divider } from "@chakra-ui/react";
import api from "../../../../services/api";

import Status from "../../../../components/Status";

import { RequirementsDataType } from "../..";
import { formatDate } from "../../../../util/app.util";
import { StatusKinds } from "../../../../util/Enums";
import { ArtefactDataType } from "../../../Artefacts";

import { IoMdClose } from "react-icons/io";

import {
    Background,
    ButtonSection,
    CardVersion,
    CloseButton,
    Columns,
    Container,
    Content,
    Element,
    Footer,
    HeaderContent,
    ModalHeader,
    Relations,
    RowThree,
    SectionsPage,
    Tag,
    TitleColumn,
} from "./styles";

type InfoModalProps = {
    requirementId: number | null;
    setIsOpen: () => void;
};

const InfoModal = ({ requirementId, setIsOpen }: InfoModalProps) => {
    const [isGeneralTab, setIsGeneralTab] = useState(true);
    const [isVersionsTab, setIsVersionsTab] = useState(false);
    const [data, setData] = useState<RequirementsDataType>({} as RequirementsDataType);
    const [relatedRequirements, setRelatedRequirements] = useState<RequirementsDataType[][]>([]);
    const [relatedArtefacts, setRelatedArtefacts] = useState<ArtefactDataType[][]>([]);
    const [versions, setVersions] = useState<RequirementsDataType[][]>([]);

    const getRequirement = useCallback(async () => {
        await api
            .get(`/requisitos/${requirementId}`)
            .then((response) => {
                setData(response.data);
            })
            .catch(() => {
                toast.error("Houve um erro ao buscar requisito");
            });
    }, [requirementId]);

    const getRelatedElements = useCallback(async () => {
        await api
            .post(`/related_requirements/`, { id: requirementId })
            .then((response) => {
                setRelatedArtefacts(response.data.artefatos);
                setRelatedRequirements(response.data.relacionamento);
            })
            .catch(() => {
                toast.error("Houve um erro com o relacionamento");
            });
    }, [requirementId]);

    const getVersions = useCallback(async () => {
        await api
            .post(`/relacionamento_versionamento/`, { id: requirementId })
            .then((response) => {
                setVersions(response.data.versionamento);
            })
            .catch(() => {
                toast.error("Houve um erro");
            });
    }, [requirementId]);

    const toggleIsModalOpen = () => {
        setIsOpen();
    };

    const toggleGeneralTab = () => {
        setIsVersionsTab(false);
        setIsGeneralTab(true);
    };

    const toggleVersionTab = () => {
        setIsGeneralTab(false);
        setIsVersionsTab(true);
    };

    const handleVersionTab = () => {
        getVersions();
        toggleVersionTab();
    };

    useEffect(() => {
        getRequirement();
        getRelatedElements();
    }, [requirementId, getRequirement, getRelatedElements]);

    return (
        <Background>
            <Container>
                <ModalHeader>
                    <h2 className="title">Informações do requisito</h2>
                    <CloseButton onClick={toggleIsModalOpen}>
                        <IoMdClose />
                    </CloseButton>
                </ModalHeader>
                <SectionsPage>
                    <ButtonSection isActive={isGeneralTab} onClick={toggleGeneralTab}>
                        Geral
                    </ButtonSection>
                    <ButtonSection isActive={isVersionsTab} onClick={handleVersionTab}>
                        Versões
                    </ButtonSection>
                </SectionsPage>
                {isGeneralTab && (
                    <>
                        <Content>
                            <HeaderContent>
                                <div className="row_title">
                                    <h2>{data.title}</h2>
                                </div>
                            </HeaderContent>
                            <Columns>
                                <div className="column">
                                    <TitleColumn>
                                        <span>DETALHES</span>
                                        <Divider />
                                    </TitleColumn>
                                    <Element>
                                        <div className="atribute">Descrição:</div>
                                        <div className="value">{data.description}</div>
                                    </Element>
                                    <RowThree>
                                        <Element>
                                            <div className="atribute">Data de criação:</div>
                                            <div className="value">
                                                {data && data.created_data
                                                    ? formatDate(data.created_data)
                                                    : ""}
                                            </div>
                                        </Element>
                                        <Element>
                                            <div className="atribute">Fonte:</div>
                                            <div className="value">{data.source}</div>
                                        </Element>
                                        <Element>
                                            <div className="atribute">Tipo:</div>
                                            <div className="value">
                                                {data && data.type === "F"
                                                    ? "Funcional"
                                                    : "Não Funcional"}
                                            </div>
                                        </Element>
                                    </RowThree>
                                    <RowThree>
                                        <Element>
                                            <div className="atribute">Versão</div>
                                            <div className="value">{data.version}</div>
                                        </Element>
                                        <Element>
                                            <div className="atribute">Status</div>
                                            <Status
                                                status={data.status}
                                                type={StatusKinds.requirements}
                                            />
                                        </Element>
                                        {data && data.type === "NF" ? (
                                            <Element>
                                                <div className="atribute">Categoria</div>
                                                <div className="value">{data.category}</div>
                                            </Element>
                                        ) : (
                                            <div />
                                        )}
                                    </RowThree>
                                </div>
                                <div className="column">
                                    <TitleColumn>
                                        <span>RELACIONAMENTOS</span>
                                        <Divider />
                                    </TitleColumn>
                                    <Relations>
                                        <div className="caption">Requisitos Relacionados</div>
                                        <div className="requirements">
                                            {relatedRequirements.map((reqrmnt, index) => {
                                                return <Tag key={index}>{reqrmnt[0].title}</Tag>;
                                            })}
                                        </div>
                                    </Relations>
                                    <Relations>
                                        <div className="caption">Artefatos Relacionados</div>
                                        <div className="requirements">
                                            {relatedArtefacts.map((artefact, index) => {
                                                return <Tag key={index}>{artefact[0].name}</Tag>;
                                            })}
                                        </div>
                                    </Relations>
                                    <Relations>
                                        <div className="caption">Stakeholders Relacionados</div>
                                        <div className="stakeholders">
                                            {data.stake_holders
                                                ? data.stake_holders.stakeholders
                                                : ""}{" "}
                                        </div>
                                    </Relations>
                                </div>
                            </Columns>
                        </Content>
                    </>
                )}
                {isVersionsTab && (
                    <>
                        <Content>
                            {versions.map((version, index) => {
                                return (
                                    <CardVersion key={index}>
                                        <div className="date">
                                            {formatDate(version[0].created_data)}
                                        </div>
                                        <div className="version_info">
                                            <div className="title_card">{`${version[0].version.toLocaleUpperCase()} - ${
                                                version[0].title
                                            }`}</div>
                                            <div className="description">
                                                {version[0].description}
                                            </div>
                                        </div>
                                    </CardVersion>
                                );
                            })}
                        </Content>
                    </>
                )}
                <Footer>
                    {/* <button className="btnEditar">EDITAR</button>
                    <button className="btnExcluir">EXCLUIR</button> */}
                </Footer>
            </Container>
        </Background>
    );
};

export default InfoModal;
