import { useEffect, useState } from "react";

import { StatusKinds } from "../../util/Enums";
import { RequirementStatusInfos, ChangeStatusInfos } from "../../util/StatusInfos";

import { Container } from "./styles";

type StatusProps = {
    status: string;
    type: string;
};

const Status = ({ status, type }: StatusProps) => {
    const [dataStatus, setDataStatus] = useState({
        id: "NN",
        label: "none",
        textColor: "#505F79",
        backColor: "#C1C7D0",
    });

    useEffect(() => {
        if (type === StatusKinds.requirements) {
            RequirementStatusInfos.forEach((reqmntStatus) => {
                if (reqmntStatus.id === status) {
                    setDataStatus(reqmntStatus);
                }
            });
        } else if (type === StatusKinds.changes) {
            ChangeStatusInfos.forEach((changeStatus) => {
                if (changeStatus.id === status) {
                    setDataStatus(changeStatus);
                }
            });
        }
    }, [status, type]);

    return (
        <Container color={dataStatus.textColor} backgroundColor={dataStatus.backColor}>
            <span>{dataStatus.label}</span>
        </Container>
    );
};

export default Status;
