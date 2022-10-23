import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

import Button from "../../components/Button";
import ItemTable from "./ItemTable";
import InfoModal from "./Modals/InfoModal";
import RegisterModal from "./Modals/RegisterModal";
import EditModal from "./Modals/EditModal";
import ModalConfirmation from "../../components/ModalConfirmation";

import { BsPlusLg } from "react-icons/bs";

import { ArtefactsTypes } from "../../util/Types";

import { Container, ContentTable, Header, HeaderTable, TableList } from "./styles";

export type ArtefactDataType = {
    id: number;
    name: string;
    description: string | null;
    type: {
        value: string;
        label: string;
    };
};

const Artefacts = () => {
    const [data, setData] = useState<ArtefactDataType[]>([]);
    const [currentArtefact, setCurrentArtefact] = useState<ArtefactDataType>(
        {} as ArtefactDataType
    );
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
    const [IsModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);
    const [currentArtefactId, setCurrentArtefactId] = useState<number>();
    const [deleteMessage, setDeleteMessage] = useState("");

    const getArtefacts = useCallback(async () => {
        await api
            .get(`/artefatos/`)
            .then((response) => {
                response.data = response.data.map((art: any) => {
                    const type = ArtefactsTypes.find((artefactType) => {
                        return artefactType.value === art.type;
                    });
                    art.type = type;
                    return art;
                });

                setData(response.data);
            })
            .catch((error) => {
                toast.error("Houve um erro");
            });
    }, []);

    const toggleModalRegister = () => {
        setIsModalRegisterOpen((prevState) => !prevState);
    };

    const toggleInfoModal = () => {
        setIsModalInfoOpen((prevState) => !prevState);
    };

    const toggleEditModal = () => {
        setIsModalEditOpen((prevState) => !prevState);
    };

    const toggleConfirmationModal = () => {
        setIsModalConfirmationOpen((prevState) => !prevState);
    };

    const handleInfoModal = (artefact: ArtefactDataType) => {
        setCurrentArtefact(artefact);
        toggleInfoModal();
    };

    const handleEditModal = (artefact: ArtefactDataType) => {
        setCurrentArtefact(artefact);
        toggleEditModal();
    };

    const handleDeleteModal = (id: number, name: string) => {
        setCurrentArtefactId(id);
        setDeleteMessage(`Você tem certeza que deseja excluir "${name}"?`);
        toggleConfirmationModal();
    };

    const handleReloadPage = () => {
        getArtefacts();
    };

    const handleDeleteArtefact = async () => {
        await api
            .delete(`/artefatos/${currentArtefactId}/`)
            .then(() => {
                toast.success("Artefato deletado com sucesso!");
                toggleConfirmationModal();
                handleReloadPage();
            })
            .catch((erro) => {
                toast.error("Erro ao excluir artefato");
            });
    };

    useEffect(() => {
        getArtefacts();
    }, []);

    return (
        <Container>
            <Header>
                <h1>ARTEFATOS</h1>
                <Button text="NOVO" icon={<BsPlusLg />} onClick={toggleModalRegister} />
            </Header>
            <TableList>
                <HeaderTable>
                    <div>ID</div>
                    <div>Nome</div>
                    <div>Tipo</div>
                    <div style={{ textAlign: "center" }}>Funções</div>
                </HeaderTable>
                <ContentTable>
                    {data.length > 0 &&
                        data?.map((artefact: ArtefactDataType, index: number) => {
                            return (
                                <ItemTable
                                    key={index}
                                    data={artefact}
                                    id={index}
                                    openInfoModal={() => handleInfoModal(artefact)}
                                    openEditModal={() => handleEditModal(artefact)}
                                    openDeleteModal={() =>
                                        handleDeleteModal(artefact.id, artefact.name)
                                    }
                                />
                            );
                        })}
                </ContentTable>
            </TableList>
            {isModalInfoOpen && (
                <InfoModal artefactData={currentArtefact} setIsOpen={toggleInfoModal} />
            )}
            {isModalRegisterOpen && (
                <RegisterModal setIsOpen={toggleModalRegister} reloadPage={handleReloadPage} />
            )}
            {IsModalEditOpen && (
                <EditModal
                    artefactData={currentArtefact}
                    setIsOpen={toggleEditModal}
                    reloadPage={handleReloadPage}
                />
            )}
            {isModalConfirmationOpen && (
                <ModalConfirmation
                    message={deleteMessage}
                    setIsOpen={toggleConfirmationModal}
                    handleConfirm={handleDeleteArtefact}
                />
            )}
        </Container>
    );
};

export default Artefacts;
