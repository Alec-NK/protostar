import { Background, Container, Content, Footer, ModalHeader } from "./styles";

type RegisterModalProps = {
    setIsOpen: any;
};

const RegisterModal = ({ setIsOpen }: RegisterModalProps) => {
    const toggleIsModalOpen = () => {
        setIsOpen();
    };

    return (
        <Background>
            <Container>
                <ModalHeader>
                    <h2 className="title">Cadastrar requisito</h2>
                </ModalHeader>
                <Content>
                    {/* <div className="input-container">
                        <input
                            type="text"
                            id="username"
                            className="text-input"
                            autoComplete="off"
                            placeholder="Enter your username"
                            required
                        />
                        <label className="label">Username</label>
                    </div> */}
                </Content>
                <Footer>
                    <button className="btnRegister">CADASTRAR</button>
                    <button className="btnCancel" onClick={toggleIsModalOpen}>
                        CANCELAR
                    </button>
                </Footer>
            </Container>
        </Background>
    );
};

export default RegisterModal;
