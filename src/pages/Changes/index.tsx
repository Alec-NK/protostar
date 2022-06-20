import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import ItemChangeTable from "./ItemChangeTable";
import SolicitationModal from "./Modals/SolicitationModal";
import AnalysisModal from "./Modals/AnalysisModal";

import { BsPlusLg } from "react-icons/bs";

import { Container, ContentTable, Header, HeaderTable, TableList } from "./styles";

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
    const [isModalAnalysisOpen, setIsModalAnalysisOpen] = useState(false);
    const [data, setData] = useState<ChangesDataType[]>();
    const [changeId, setChangeId] = useState<number>(1);

    const getChanges = useCallback(async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/pedido_mudanca/`)
            .then((response) => {
                setData(response.data);
            })
            .catch(() => {
                toast.error("Houve um erro");
            });
    }, []);

    const toggleSolicitationModal = () => {
        setIsModalSolicitationOpen((prevState) => !prevState);
    };

    const toggleAnalysisModal = () => {
        setIsModalAnalysisOpen((prevState) => !prevState);
    };

    const handleReloadPage = () => {
        getChanges();
    };

    const handleAnalysisModal = (id: number) => {
        setChangeId(id);
        toggleAnalysisModal();
    };

    useEffect(() => {
        getChanges();
    }, [getChanges]);

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
                        return (
                            <ItemChangeTable
                                key={index}
                                data={change}
                                id={index}
                                onClick={() => handleAnalysisModal(change.id)}
                            />
                        );
                    })}
                </ContentTable>
            </TableList>
            {isModalSolicitationOpen && (
                <SolicitationModal
                    setIsOpen={toggleSolicitationModal}
                    reloadPage={handleReloadPage}
                />
            )}
            {isModalAnalysisOpen && (
                <AnalysisModal
                    changeId={changeId}
                    setIsOpen={toggleAnalysisModal}
                    reloadData={handleReloadPage}
                />
            )}
        </Container>
    );
};

export default Changes;
