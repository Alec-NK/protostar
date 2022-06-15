import Status from "../Status";

import { RequirementsDataType } from "..";
import { formatDate } from "../../../util/app.util";

import { Container } from "./styles";

type ItemTableProps = {
    data: RequirementsDataType;
    onClick?: any;
    id: number;
};

const ItemTable = ({ data, onClick, id }: ItemTableProps) => {
    return (
        <Container onClick={onClick}>
            <div>{id + 1}</div>
            <div>{data && data.description}</div>
            <div style={{ textAlign: "center" }}>
                <Status />
            </div>
            <div style={{ textAlign: "center" }}>
                {data && formatDate(data.created_data)}
            </div>
            <div style={{ textAlign: "center" }}>{data && data.version}</div>
            <div style={{ textAlign: "center" }}>asd</div>
        </Container>
    );
};

export default ItemTable;
