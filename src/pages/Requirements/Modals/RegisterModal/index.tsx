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
                    <div className="caption">INFORMAÇÕES</div>
                    <div className="row" id="firstRow">
                        <div className="inputContainer">
                            <label>ID</label>
                            <input
                                type="text"
                                className="id"
                                placeholder="ID"
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Descrição</label>
                            <input
                                type="text"
                                className="descricao"
                                placeholder="Descrição do requisito"
                            />
                        </div>
                    </div>
                    <div className="row" id="secondRow">
                        <div className="inputContainer">
                            <label>Status</label>
                            <input
                                type="text"
                                className="status"
                                placeholder="Status"
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Tipo</label>
                            <input
                                type="text"
                                className="Tipo"
                                placeholder="Tipo"
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Versão</label>
                            <input
                                type="text"
                                className="version"
                                placeholder="Ex: v1"
                            />
                        </div>
                    </div>
                    <div className="caption">RELACIONAMENTOS</div>
                    <div className="row" id="thirdRow">
                        <div className="inputContainer">
                            <label>Requisitos</label>
                            <input
                                type="text"
                                className="requirements"
                                placeholder="Requisitos"
                            />
                        </div>
                        <div className="inputContainer">
                            <label>Stakeholders</label>
                            <input
                                type="text"
                                className="stakeholders"
                                placeholder="Stakeholders"
                            />
                        </div>
                    </div>
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
