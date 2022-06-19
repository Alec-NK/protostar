import { Container, ContentTable, Header, HeaderTable, TableList } from "./styles";

const Solicitations = () => {
    return (
        <Container>
            <Header>
                <h1>SOLICITAÇÕES</h1>
                {/* <Button
                    text="SOLICITAR MUDANÇA"
                    icon={<BsPlusLg />}
                    onClick={toggleSolicitationModal}
                /> */}
            </Header>
            <TableList>
                <HeaderTable>
                    <div>ID</div>
                    <div>Data Solicitação</div>
                    <div>Titulo</div>
                    <div>Solicitante</div>
                    <div>Responsável</div>
                    <div style={{ textAlign: "center" }}>Status</div>
                    <div style={{ textAlign: "center" }}>Funções</div>
                </HeaderTable>
                <ContentTable>asd</ContentTable>
            </TableList>
        </Container>
    );
};

export default Solicitations;
