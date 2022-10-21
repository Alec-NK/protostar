import Status from "../../../components/Status";

import { TbReportSearch } from "react-icons/tb";

import { ChangesDataType } from "../../Changes";
import { formatDate } from "../../../util/app.util";
import { StatusKinds } from "../../../util/Enums";

import { Container } from "./styles";

type ItemTableProps = {
    data: ChangesDataType;
    onClick?: any;
};

const ItemsSolicitationTable = ({ data, onClick }: ItemTableProps) => {
    return (
        <Container onClick={onClick}>
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

export default ItemsSolicitationTable;
