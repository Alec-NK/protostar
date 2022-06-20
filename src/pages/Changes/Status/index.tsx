import { useEffect, useState } from "react";
import { ChangesStatusEnum } from "../../../util/Enums";

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
            case ChangesStatusEnum.analise:
                setStatusData({
                    label: "Em análise",
                    textColor: "#e4bd23",
                    backColor: "#FFF0B3",
                });
                break;
            case ChangesStatusEnum.aprovado:
                setStatusData({
                    label: "Aprovado",
                    textColor: "#08b489",
                    backColor: "#c9f1e7",
                });
                break;
            case ChangesStatusEnum.rejeitado:
                setStatusData({
                    label: "Rejeitado",
                    textColor: "#DE350B",
                    backColor: "#FFBDAD",
                });
                break;
            case ChangesStatusEnum.bloqueado:
                setStatusData({
                    label: "Bloqueado",
                    textColor: "#505F79",
                    backColor: "#C1C7D0",
                });
                break;
            case ChangesStatusEnum.emImplementação:
                setStatusData({
                    label: "Em implementação",
                    textColor: "#2684FF",
                    backColor: "#DEEBFF",
                });
                break;
            case ChangesStatusEnum.implementado:
                setStatusData({
                    label: "Implementado",
                    textColor: "#084baf",
                    backColor: "#B3D4FF",
                });
                break;
            case ChangesStatusEnum.verificando:
                setStatusData({
                    label: "Verificando",
                    textColor: "#5243AA",
                    backColor: "#EAE6FF",
                });
                break;
            case ChangesStatusEnum.finalizado:
                setStatusData({
                    label: "Finalizado",
                    textColor: "#198511",
                    backColor: "#dff7e2",
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
