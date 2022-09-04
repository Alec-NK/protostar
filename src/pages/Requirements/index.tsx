import { useCallback, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import ItemTable from "./ItemTable";
import RegisterModal from "./Modals/RegisterModal";
import InfoModal from "./Modals/InfoModal";

import { formatDate } from "../../util/app.util";

import api from "../../services/api";

import {
    ButtonSection,
    Container,
    ContentTable,
    Header,
    HeaderTable,
    SectionsPage,
    TableList,
} from "./styles";

export type RequirementsDataType = {
    id: number;
    title: string;
    type: string;
    stake_holders: Array<string>;
    description: string;
    status: string;
    created_data: string;
    version: string;
    category: string | null;
    source: string;
    requirements: Array<number>;
    relations: Array<number>;
};

const Requirements = () => {
    const [isPageFunctional, setIsPageFunctional] = useState(true);
    const [isPageNFunctional, setIsPageNFunctional] = useState(false);
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const [data, setData] = useState([]);
    const [functionalData, setFunctionalData] = useState<RequirementsDataType[]>([]);
    const [nFunctionalData, setNFunctionalData] = useState<RequirementsDataType[]>([]);
    const [requirementId, setRequirementId] = useState<number | null>(null);

    const getRequirements = useCallback(async () => {
        await api
            .get("/requisitos/")
            .then((response) => {
                setData(response.data);
            })
            .catch(() => {
                toast.error("Houve um erro");
            });
    }, []);

    const toggleFunctionalPage = () => {
        setIsPageFunctional(true);
        setIsPageNFunctional(false);
    };

    const toggleNFunctionalPage = () => {
        setIsPageFunctional(false);
        setIsPageNFunctional(true);
    };

    const toggleModalRegister = () => {
        setIsModalRegisterOpen((prevState) => !prevState);
    };

    const toggleInfoModal = () => {
        setIsModalInfoOpen((prevState) => !prevState);
    };

    const handleInfoModal = (id: number) => {
        setRequirementId(id);
        toggleInfoModal();
    };

    const handleReloadPage = () => {
        getRequirements();
    };

    useEffect(() => {
        let reqFunc: any = [];
        let reqNFunc: any = [];
        data?.map((requirement: RequirementsDataType) => {
            requirement.type === "F" ? reqFunc.push(requirement) : reqNFunc.push(requirement);
        });

        setFunctionalData(reqFunc);
        setNFunctionalData(reqNFunc);
    }, [data]);

    useEffect(() => {
        getRequirements();
    }, [getRequirements]);

    return (
        <Container>
            <Header>
                <h1>REQUISITOS</h1>
                <Button text="NOVO" icon={<BsPlusLg />} onClick={toggleModalRegister} />
            </Header>
            <SectionsPage>
                <ButtonSection isActive={isPageFunctional} onClick={toggleFunctionalPage}>
                    Funcionais
                </ButtonSection>
                <ButtonSection isActive={isPageNFunctional} onClick={toggleNFunctionalPage}>
                    Não Funcionais
                </ButtonSection>
            </SectionsPage>
            <TableList>
                <HeaderTable>
                    <div>ID</div>
                    <div>Título</div>
                    <div>Descrição</div>
                    <div style={{ textAlign: "center" }}>Status</div>
                    <div style={{ textAlign: "center" }}>Data de Criacao</div>
                    <div style={{ textAlign: "center" }}>Versão</div>
                    <div style={{ textAlign: "center" }}>Funções</div>
                </HeaderTable>
                <ContentTable>
                    {/* {isFetching && <div>Carregando...</div>} */}
                    {isPageFunctional &&
                        functionalData.length > 0 &&
                        functionalData?.map((req: RequirementsDataType, index: number) => {
                            return (
                                <ItemTable
                                    key={index}
                                    data={req}
                                    id={index}
                                    onClick={() => handleInfoModal(req.id)}
                                />
                            );
                        })}

                    {isPageNFunctional &&
                        nFunctionalData?.map((req: RequirementsDataType, index: number) => {
                            return (
                                <ItemTable
                                    key={index}
                                    data={req}
                                    id={index}
                                    onClick={() => handleInfoModal(req.id)}
                                />
                            );
                        })}
                </ContentTable>
            </TableList>
            {isModalInfoOpen && (
                <InfoModal requirementId={requirementId} setIsOpen={toggleInfoModal} />
            )}
            {isModalRegisterOpen && (
                <RegisterModal setIsOpen={toggleModalRegister} reloadPage={handleReloadPage} />
            )}
        </Container>
    );
};

export default Requirements;
