import { useEffect, useState } from "react";

import Button from "../../components/Button";
import ItemChangeTable from "./ItemChangeTable";

import { BsPlusLg } from "react-icons/bs";

import { useFetch } from "../../hooks/useFetch";

import { ButtonSection, Container, ContentTable, Header, HeaderTable, TableList } from "./styles";
import SolicitationModal from "./Modals/SolicitationModal";

export type ChangesDataType = {
    id: number;
    title: string;
    status: string;
    requestor: string;
    accountable: Array<number>;
    is_accepted: boolean;
    reason: string;
    new_req: null;
    progrecao: Array<number>;
    data_pedido: string;
    data_mudanca: string | null;
};

const Changes = () => {
    const [isModalSolicitationOpen, setIsModalSolicitationOpen] = useState(false);
    const { data, isFetching }: any = useFetch(`${process.env.REACT_APP_API_URL}/pedido_mudanca/`);

    const toggleSolicitationModal = () => {
        setIsModalSolicitationOpen((prevState) => !prevState);
    };

    const handleReloadPage = () => {
        window.location.reload();
    };

    return (
        <Container>
            <Header>
                <h1>MUDANÇAS</h1>
                <Button
                    text="SOLICITAR MUDANÇA"
                    icon={<BsPlusLg />}
                    onClick={toggleSolicitationModal}
                />
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
                <ContentTable>
                    {data?.map((change: ChangesDataType, index: number) => {
                        return <ItemChangeTable key={index} data={change} id={index} />;
                    })}
                </ContentTable>
            </TableList>
            {isModalSolicitationOpen && (
                <SolicitationModal
                    setIsOpen={toggleSolicitationModal}
                    reloadPage={handleReloadPage}
                />
            )}
        </Container>
    );
};

export default Changes;
