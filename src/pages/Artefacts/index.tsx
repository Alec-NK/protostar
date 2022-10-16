import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

import Button from "../../components/Button";
import ItemTable from "./ItemTable";
import InfoModal from "./Modals/InfoModal";

import { BsPlusLg } from "react-icons/bs";

import { Container, ContentTable, Header, HeaderTable, TableList } from "./styles";
import RegisterModal from "./Modals/RegisterModal";

export type ArtefactDataType = {
    id: number;
    name: string;
    type: string;
};

const Artefacts = () => {
    const [data, setData] = useState<ArtefactDataType[]>([]);
    const [currentArtefact, setCurrentArtefact] = useState<ArtefactDataType>(
        {} as ArtefactDataType
    );
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(true);

    const getArtefacts = useCallback(async () => {
        await api
            .get(`/artefatos/`)
            .then((response) => {
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
        // setIsModalEditOpen((prevState) => !prevState);
    };

    const handleInfoModal = (artefact: ArtefactDataType) => {
        setCurrentArtefact(artefact);
        toggleInfoModal();
    };

    const handleEditModal = (artefact: ArtefactDataType) => {
        setCurrentArtefact(artefact);
        toggleEditModal();
    };

    const handleReloadPage = () => {
        getArtefacts();
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
        </Container>
    );
};

export default Artefacts;
