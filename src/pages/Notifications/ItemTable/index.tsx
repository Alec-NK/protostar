import { NotificationType } from "..";

import { formatDate } from "../../../util/app.util";

import { Container } from "./styles";

type ItemTableProps = {
    id: number;
    data: NotificationType;
};

const ItemTable = ({ data, id }: ItemTableProps) => {
    return (
        <Container>
            <div>{formatDate(data.data_notificado)}</div>
            <div>{data && data.title}</div>
            <div>{data && data.mensagem}</div>
        </Container>
    );
};

export default ItemTable;
