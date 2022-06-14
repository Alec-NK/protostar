import {
    ButtonSection,
    Container,
    ContentTable,
    Header,
    HeaderTable,
    TableList,
} from "./styles";

const Changes = () => {
    return (
        <Container>
            <Header>
                <h1>MUDANÇAS</h1>
                {/* <Button
          text="SOLICITAR MUDANÇA"
          icon={<BsPlusLg />}
          onClick={}
      /> */}
            </Header>
            <TableList>
                <HeaderTable>
                    <div>ID</div>
                    <div>Data</div>
                    <div>Titulo</div>
                    <div>Status</div>
                    <div>Solicitante</div>
                    <div>Responsável</div>
                    <div>Funções</div>
                </HeaderTable>
                <ContentTable>
                    <div>asd</div>
                </ContentTable>
            </TableList>
        </Container>
    );
};

export default Changes;
