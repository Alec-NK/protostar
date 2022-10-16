import { IoMdCheckmark } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

import { Background, ButtonCancel, ButtonConfirm, Container, Footer, MainMessage } from "./styles";

type ModalConfirmationProps = {
    message: string;
    setIsOpen: () => void;
    handleConfirm: () => void;
};

const ModalConfirmation = ({ message, setIsOpen, handleConfirm }: ModalConfirmationProps) => {
    return (
        <Background>
            <Container>
                <MainMessage>{message}</MainMessage>
                <Footer>
                    <ButtonConfirm onClick={handleConfirm}>
                        <IoMdCheckmark className="icon_button" />
                        Confirmar
                    </ButtonConfirm>
                    <ButtonCancel onClick={setIsOpen}>
                        <IoCloseSharp className="icon_button" />
                        Cancelar
                    </ButtonCancel>
                </Footer>
            </Container>
        </Background>
    );
};

export default ModalConfirmation;
