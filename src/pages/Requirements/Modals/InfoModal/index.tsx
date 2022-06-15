import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Status from "../../Status";

import {
    Background,
    ButtonSection,
    CloseButton,
    Container,
    Content,
    Footer,
    ModalHeader,
    SectionsPage,
} from "./styles";

type InfoModalProps = {
    setIsOpen: () => void;
};

const InfoModal = ({ setIsOpen }: InfoModalProps) => {
    const [isGeneralWindow, setIsGeneralWindow] = useState(true);
    const [isVersionsWindow, setIsVersionsWindow] = useState(false);

    const toggleIsModalOpen = () => {
        setIsOpen();
    };

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
                    <ButtonSection isActive={isGeneralWindow}>
                        Geral
                    </ButtonSection>
                    <ButtonSection isActive={isVersionsWindow}>
                        Versões
                    </ButtonSection>
                </SectionsPage>
                <Content>
                    <div className="column">
                        <div className="row">
                            <h2>Requisito 01 - Cadastro de usuário</h2>
                        </div>
                        <div className="row">
                            <div className="descricao">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </div>
                        </div>
                        <div className="row">
                            <div className="element">
                                <div className="atributo">Data de criação:</div>
                                <div>10/05/2022</div>
                            </div>
                            <div className="element">
                                <div className="atributo">Fonte:</div>
                                <div>Nome alguem</div>
                            </div>
                            <div className="element">
                                <div className="atributo">Tipo:</div>
                                <div>Não funcional</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="element">
                                <div className="atributo">Versão</div>
                                <div>10/05/2022</div>
                            </div>
                            <div className="element">
                                <div className="atributo">Status</div>
                                <div>Nome alguem</div>
                            </div>
                            <div />
                        </div>
                    </div>
                    <div className="column">
                        <div className="row">
                            <div className="caption">RELACIONAMENTO</div>
                        </div>
                    </div>
                </Content>
                <Footer>
                    <button className="btnEditar">EDITAR</button>
                    <button className="btnExcluir">EXCLUIR</button>
                </Footer>
            </Container>
        </Background>
    );
};

export default InfoModal;
