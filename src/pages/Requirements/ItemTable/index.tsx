import { Tooltip } from "@chakra-ui/react";

import { AiOutlineEye } from "react-icons/ai";

import Status from "../../../components/Status";

import { RequirementsDataType } from "..";
import { formatDate } from "../../../util/app.util";
import { StatusKinds } from "../../../util/Enums";

import { Container } from "./styles";

type ItemTableProps = {
    data: RequirementsDataType;
    onClick?: any;
    id: number;
};

const ItemTable = ({ data, onClick, id }: ItemTableProps) => {
    return (
        <Container onClick={onClick}>
            <div>{id + 1 < 10 ? `0${id + 1}` : id + 1}</div>
            <div>{data && data.title}</div>
            <div>
                {data && data.description.length >= 55
                    ? `${data.description.substring(0, 55)}...`
                    : data.description}
            </div>
            <div style={{ textAlign: "center" }}>
                <Status status={data.status} type={StatusKinds.requirements} />
            </div>
            <div style={{ textAlign: "center" }}>{data && formatDate(data.created_data)}</div>
            <div style={{ textAlign: "center" }}>{data && data.version}</div>
            <Tooltip label="Visualizar" placement="top" bg="grey">
                <div style={{ textAlign: "center" }} className="function_icon">
                    <AiOutlineEye />
                </div>
            </Tooltip>
        </Container>
    );
};

export default ItemTable;
