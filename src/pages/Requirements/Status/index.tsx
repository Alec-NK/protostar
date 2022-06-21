import { useEffect, useState } from "react";

import { Container } from "./styles";

type StatusProps = {
    typeStatus?: string;
};

const Status = ({ typeStatus }: StatusProps) => {
    const [statusData, setStatusData] = useState({
        label: "",
        textColor: "",
        backColor: "",
    });

    useEffect(() => {
        switch (typeStatus) {
            case "Implementado":
                setStatusData({
                    label: "Implementado",
                    textColor: "#198511",
                    backColor: "#7dba79",
                });
                break;

            default:
                setStatusData({
                    label: "None",
                    textColor: "#505F79",
                    backColor: "#C1C7D0",
                });
                break;
        }
    }, [typeStatus]);

    return (
        <Container color={statusData.textColor} backgroundColor={statusData.backColor}>
            <span>{statusData.label}</span>
        </Container>
    );
};

export default Status;
