import { useContext } from "react";
import { Tooltip } from "@chakra-ui/react";

import { AiOutlineEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

import { AuthContext } from "../../../contexts/AuthContext";

import { ArtefactDataType } from "..";

import { Container } from "./styles";

type ItemTableProps = {
    id: number;
    data: ArtefactDataType;
    openInfoModal?: () => void;
    openEditModal?: () => void;
};

const ItemTable = ({ data, openInfoModal, id, openEditModal }: ItemTableProps) => {
    const { authorization } = useContext(AuthContext);

    return (
        <Container>
            <div onClick={openInfoModal}>{id + 1 < 10 ? `0${id + 1}` : id + 1}</div>
            <div onClick={openInfoModal}>{data && data.name}</div>
            <div onClick={openInfoModal}>{data && data.type}</div>
            <div style={{ textAlign: "center" }} className="function_icon">
                <Tooltip label="Visualizar" placement="top" bg="grey">
                    <button onClick={openInfoModal}>
                        <AiOutlineEye />
                    </button>
                </Tooltip>
                {authorization(["MEMBRO_COMITE", "ADMINISTRADOR"]) && (
                    <>
                        <Tooltip label="Editar" placement="top" bg="grey">
                            <button onClick={openEditModal}>
                                <FiEdit />
                            </button>
                        </Tooltip>

                        <Tooltip label="Excluir" placement="top" bg="grey">
                            <button>
                                <FaRegTrashAlt />
                            </button>
                        </Tooltip>
                    </>
                )}
            </div>
        </Container>
    );
};

export default ItemTable;
