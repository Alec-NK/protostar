import { useCallback, useEffect, useState } from "react";
import api from "../../../../services/api";
import { toast } from "react-toastify";

import Status from "../../../../components/Status";

import { RequirementsDataType } from "../..";
import { formatDate } from "../../../../util/app.util";
import { StatusKinds } from "../../../../util/Enums";

import { IoMdClose } from "react-icons/io";

import {
    Background,
    ButtonSection,
    CloseButton,
    Columns,
    Container,
    Content,
    Footer,
    HeaderContent,
    ModalHeader,
    RowItems,
    SectionsPage,
    Tag,
} from "./styles";

type InfoModalProps = {
    requirementId: number | null;
    setIsOpen: () => void;
};

const InfoModal = ({ requirementId, setIsOpen }: InfoModalProps) => {
    const [isGeneralWindow, setIsGeneralWindow] = useState(true);
    const [isVersionsWindow, setIsVersionsWindow] = useState(false);
    const [data, setData] = useState<RequirementsDataType>({} as RequirementsDataType);
    const [relatedRequirements, setRelatedRequirements] = useState<RequirementsDataType[][]>([]);

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

    const getRelatedRequirements = useCallback(async () => {
        await api
            .post(`/related_requirements/`, { id: requirementId })
            .then((response) => {
                setRelatedRequirements(response.data.relacionamento);
            })
            .catch(() => {
                toast.error("Houve um erro");
            });
    }, [requirementId]);

    const toggleIsModalOpen = () => {
        setIsOpen();
    };

    const toggleGeneralWindow = () => {
        setIsVersionsWindow(false);
        setIsGeneralWindow(true);
    };

    const toggleVersionWindow = () => {
        setIsGeneralWindow(false);
        setIsVersionsWindow(true);
    };

    useEffect(() => {
        getRequirement();
        getRelatedRequirements();
    }, [requirementId, getRequirement, getRelatedRequirements]);

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
                    <ButtonSection isActive={isGeneralWindow} onClick={toggleGeneralWindow}>
                        Geral
                    </ButtonSection>
                    <ButtonSection isActive={isVersionsWindow} onClick={toggleVersionWindow}>
                        Versões
                    </ButtonSection>
                </SectionsPage>
                {isGeneralWindow && (
                    <>
                        <Content>
                            <HeaderContent>
                                <div className="row_title">
                                    <h2>{data.title}</h2>
                                </div>
                            </HeaderContent>
                            <Columns>
                                <div className="column">
                                    <div className="row">{data.description}</div>
                                    <RowItems>
                                        <div className="element">
                                            <div className="atribute">Data de criação:</div>
                                            <div>
                                                {data && data.created_data
                                                    ? formatDate(data.created_data)
                                                    : ""}
                                            </div>
                                        </div>
                                        <div className="element">
                                            <div className="atribute">Fonte:</div>
                                            <div>Nome alguem</div>
                                        </div>
                                        <div className="element">
                                            <div className="atribute">Tipo:</div>
                                            <div>
                                                {data && data.type === "F"
                                                    ? "Funcional"
                                                    : "Não Funcional"}
                                            </div>
                                        </div>
                                    </RowItems>
                                    <RowItems>
                                        <div className="element">
                                            <div className="atribute">Versão</div>
                                            <div>{data.version}</div>
                                        </div>
                                        <div className="element">
                                            <div className="atribute">Status</div>
                                            <Status
                                                status={data.status}
                                                type={StatusKinds.requirements}
                                            />
                                        </div>
                                        {data && data.type === "NF" ? (
                                            <div className="element">
                                                <div className="atribute">Categoria</div>
                                                <div>{data.category}</div>
                                            </div>
                                        ) : (
                                            <div />
                                        )}
                                    </RowItems>
                                </div>
                                <div className="column">
                                    <div className="caption">REQUISITOS RELACIONADOS</div>
                                    <div className="requirements">
                                        {relatedRequirements.map((reqrmnt) => {
                                            return <Tag>{reqrmnt[0].title}</Tag>;
                                        })}
                                    </div>
                                </div>
                            </Columns>
                        </Content>
                    </>
                )}
                {isVersionsWindow && (
                    <>
                        <Content>
                            <div>Testando versões</div>
                        </Content>
                    </>
                )}
                <Footer>
                    <button className="btnEditar">EDITAR</button>
                    <button className="btnExcluir">EXCLUIR</button>
                </Footer>
            </Container>
        </Background>
    );
};

export default InfoModal;
