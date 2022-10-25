import { NotificationType } from "..";

import { Container } from "./styles";

type ItemTableProps = {
    id: number;
    data: NotificationType;
};

const ItemTable = ({ data, id }: ItemTableProps) => {
    return (
        <Container>
            <div>{id + 1 < 10 ? `0${id + 1}` : id + 1}</div>
            <div>{data && data.title}</div>
            <div>{data && data.mensagem}</div>
        </Container>
    );
};

export default ItemTable;
