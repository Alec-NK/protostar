import Status from "../Status";

import { Container } from "./styles";

type ItemTableProps = {
    data?: any;
    onClick?: any;
};

const ItemTable = ({ data, onClick }: ItemTableProps) => {
    return (
        <Container onClick={onClick}>
            <div>{data && data.title ? data.title : "01"}</div>
            <div>O sistema deverá permitir o cadastro de usuários</div>
            <div style={{ textAlign: "center" }}>
                <Status />
            </div>
            <div style={{ textAlign: "center" }}>10/05/2022</div>
            <div style={{ textAlign: "center" }}>v1</div>
            <div style={{ textAlign: "center" }}>asd</div>
        </Container>
    );
};

export default ItemTable;
