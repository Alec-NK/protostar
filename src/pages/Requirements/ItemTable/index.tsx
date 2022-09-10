import { Tooltip } from "@chakra-ui/react";

import { AiOutlineEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

import Status from "../../../components/Status";

import { RequirementsDataType } from "..";
import { formatDate } from "../../../util/app.util";
import { StatusKinds } from "../../../util/Enums";

import { Container } from "./styles";

type ItemTableProps = {
    id: number;
    data: RequirementsDataType;
    openInfoModal?: () => void;
    openEditModal?: () => void;
};

const ItemTable = ({ data, openInfoModal, id, openEditModal }: ItemTableProps) => {
    return (
        <Container>
            <div onClick={openInfoModal}>{id + 1 < 10 ? `0${id + 1}` : id + 1}</div>
            <div onClick={openInfoModal}>{data && data.title}</div>
            <div onClick={openInfoModal}>
                {data && data.description.length >= 55
                    ? `${data.description.substring(0, 55)}...`
                    : data.description}
            </div>
            <div style={{ textAlign: "center" }} onClick={openInfoModal}>
                <Status status={data.status} type={StatusKinds.requirements} />
            </div>
            <div style={{ textAlign: "center" }} onClick={openInfoModal}>
                {data && formatDate(data.created_data)}
            </div>
            <div style={{ textAlign: "center" }} onClick={openInfoModal}>
                {data && data.version}
            </div>
            <div style={{ textAlign: "center" }} className="function_icon">
                <Tooltip label="Visualizar" placement="top" bg="grey">
                    <button onClick={openInfoModal}>
                        <AiOutlineEye />
                    </button>
                </Tooltip>
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
            </div>
        </Container>
    );
};

export default ItemTable;
