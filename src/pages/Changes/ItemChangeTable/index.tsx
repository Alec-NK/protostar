import Status from "../Status";

import { ChangesDataType } from "..";
import { formatDate } from "../../../util/app.util";

import { Container } from "./styles";

type ItemTableProps = {
    data: ChangesDataType;
    onClick?: any;
    id: number;
};

const ItemChangeTable = ({ data, onClick, id }: ItemTableProps) => {
    return (
        <Container onClick={onClick}>
            <div>{id + 1}</div>
            <div>{data && formatDate(data.data_pedido)}</div>
            <div>{data.title}</div>
            <div>{data.requestor}</div>
            <div>{data.accountable[0]}</div>
            <div style={{ textAlign: "center" }}>
                <Status />
            </div>
            {/* <div>
                {data && data.reason.length >= 56
                    ? `${data.reason.substring(0, 56)}...`
                    : data.reason}
            </div> */}
            {/* <div style={{ textAlign: "center" }}>
                {data && data.data_mudanca ? formatDate(data.data_mudanca) : "----"}
            </div> */}
            <div style={{ textAlign: "center" }}>asd</div>
        </Container>
    );
};

export default ItemChangeTable;
