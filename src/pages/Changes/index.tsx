import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

import Button from "../../components/Button";
import ItemChangeTable from "./ItemChangeTable";
import SolicitationModal from "./Modals/SolicitationModal";
import InformationModal from "./Modals/InformationModal";

import { BsPlusLg } from "react-icons/bs";

import { ChangesStatusEnum } from "../../util/Enums";
import { AuthContext } from "../../contexts/AuthContext";

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
    const { authorization } = useContext(AuthContext);
    const [isModalSolicitationOpen, setIsModalSolicitationOpen] = useState(false);
    const [isModalAnalysisOpen, setIsModalAnalysisOpen] = useState(false);
    const [data, setData] = useState<ChangesDataType[]>();
    const [changeId, setChangeId] = useState<number>(1);

    const getChanges = useCallback(async () => {
        await api
            .get(`/pedido_mudanca/`)
            .then((response) => {
                const changes = response.data.filter((change: ChangesDataType) => {
                    return change.status !== ChangesStatusEnum.analisando;
                });

                setData(changes);
            })
            .catch((error) => {
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
                {authorization(["MEMBRO_COMITE", "ADMINISTRADOR"]) && (
                    <Button
                        text="SOLICITAR MUDANÇA"
                        icon={<BsPlusLg />}
                        onClick={toggleSolicitationModal}
                    />
                )}
            </Header>
            <TableList>
                <HeaderTable>
                    <div>ID</div>
                    <div>Data Solicitação</div>
                    <div>Título</div>
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
                <InformationModal
                    changeId={changeId}
                    setIsOpen={toggleAnalysisModal}
                    reloadData={handleReloadPage}
                />
            )}
        </Container>
    );
};

export default Changes;
