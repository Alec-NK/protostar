import { useCallback, useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";

import ItemChangeTable from "./ItemsSolicitationTable";
import AnalysisModal from "./Modals/AnalysisModal";

import { ChangesDataType } from "../Changes";
import { ChangesStatusEnum } from "../../util/Enums";

import { Container, ContentTable, Header, HeaderTable, TableList } from "./styles";

const Solicitations = () => {
    const { authorization } = useContext(AuthContext);
    const [isModalAnalysisOpen, setIsModalAnalysisOpen] = useState(false);
    const [data, setData] = useState<ChangesDataType[]>();
    const [changeId, setChangeId] = useState<number>(1);

    const getChanges = useCallback(async () => {
        await api
            .get(`/pedido_mudanca/`)
            .then((response) => {
                const solicitations = response.data.filter((change: ChangesDataType) => {
                    return change.status === ChangesStatusEnum.analisando;
                });

                setData(solicitations);
            })
            .catch((error) => {
                toast.error("Houve um erro");
            });
    }, []);

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

    return authorization(["MEMBRO_COMITE", "ADMINISTRADOR"]) ? (
        <Container>
            <Header>
                <h1>SOLICITAÇÕES</h1>
            </Header>
            <TableList>
                <HeaderTable>
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
                                onClick={() => handleAnalysisModal(change.id)}
                            />
                        );
                    })}
                </ContentTable>
            </TableList>
            {isModalAnalysisOpen && (
                <AnalysisModal
                    changeId={changeId}
                    setIsOpen={toggleAnalysisModal}
                    reloadData={handleReloadPage}
                />
            )}
        </Container>
    ) : (
        <Container>
            <div>Não possui permissão</div>
        </Container>
    );
};

export default Solicitations;
