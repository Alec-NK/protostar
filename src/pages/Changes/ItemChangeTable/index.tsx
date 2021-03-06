import Status from "../../../components/Status";

import { TbReportSearch } from "react-icons/tb";

import { ChangesDataType } from "..";
import { formatDate } from "../../../util/app.util";
import { StatusKinds } from "../../../util/Enums";

import { Container } from "./styles";

type ItemTableProps = {
    data: ChangesDataType;
    onClick?: any;
    id: number;
};

const ItemChangeTable = ({ data, onClick, id }: ItemTableProps) => {
    return (
        <Container onClick={onClick}>
            <div>{id + 1 < 10 ? `0${id + 1}` : id + 1}</div>
            <div>{data && formatDate(data.data_pedido)}</div>
            <div>
                {data && data.title.length >= 30 ? `${data.title.substring(0, 30)}...` : data.title}
            </div>
            <div>{data.requestor}</div>
            <div>{data.accountable}</div>
            <div style={{ textAlign: "center" }}>
                <Status status={data.status} type={StatusKinds.changes} />
            </div>
            <div style={{ textAlign: "center" }} className="function_icon">
                <TbReportSearch />
            </div>
        </Container>
    );
};

export default ItemChangeTable;
