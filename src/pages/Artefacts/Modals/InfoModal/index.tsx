import { IoMdClose } from "react-icons/io";
import { ArtefactDataType } from "../..";

import {
    Background,
    CloseButton,
    Container,
    Content,
    Element,
    Footer,
    HeaderContent,
    ModalHeader,
    RowThree,
    RowTwo,
} from "./styles";

type InfoModalProps = {
    artefactData: ArtefactDataType;
    setIsOpen: () => void;
};

const InfoModal = ({ artefactData, setIsOpen }: InfoModalProps) => {
    const toggleIsModalOpen = () => {
        setIsOpen();
    };

    return (
        <Background>
            <Container>
                <ModalHeader>
                    <h2 className="title">Informações do artefato</h2>
                    <CloseButton onClick={toggleIsModalOpen}>
                        <IoMdClose />
                    </CloseButton>
                </ModalHeader>
                <Content>
                    <HeaderContent>
                        <div className="row_title">
                            <h2>{artefactData.name}</h2>
                        </div>
                    </HeaderContent>
                    <RowTwo>
                        <Element>
                            <div className="attribute">Descrição:</div>
                            <div className="value_info">*FAZER REQUISIÇÃO*</div>
                        </Element>
                        <Element>
                            <div className="attribute">Tipo:</div>
                            <div className="value_info">{artefactData.type}</div>
                        </Element>
                    </RowTwo>
                    <RowThree>
                        {/* <Element>
                            <div className="attribute">Atributo:</div>
                            <div className="value_info">*FAZER REQUISIÇÃO*</div>
                        </Element>
                        <Element>
                            <div className="attribute">Atributo:</div>
                            <div className="value_info">*FAZER REQUISIÇÃO*</div>
                        </Element>
                        <Element>
                            <div className="attribute">Atributo:</div>
                            <div className="value_info">*FAZER REQUISIÇÃO*</div>
                        </Element> */}
                    </RowThree>
                </Content>
                <Footer />
            </Container>
        </Background>
    );
};

export default InfoModal;
