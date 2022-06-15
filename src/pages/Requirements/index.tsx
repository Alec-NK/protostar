import { useCallback, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";

import Button from "../../components/Button";
import ItemTable from "./ItemTable";
import RegisterModal from "./Modals/RegisterModal";
import InfoModal from "./Modals/InfoModal";

import { formatDate } from "../../util/app.util";

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
    id: string;
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
    const { data, isFetching }: any = useFetch(`${process.env.REACT_APP_API_URL}/requisitos/`);
    const [functionalData, setFunctionalData] = useState<RequirementsDataType[]>([]);
    const [nFunctionalData, setNFunctionalData] = useState<RequirementsDataType[]>([]);

    // const getRequirements = useCallback(async () => {
    //     await axios
    //         .get(`${process.env.REACT_APP_API_URL}/requisitos/`)
    //         .then((response) => {
    //             const requirements = response.data;

    //             requirements.map((req: RequirementsDataType, index: number) => {
    //                 req.created_data = formatDate(req.created_data);
    //             });
    //         })
    //         .catch((error) => {
    //             console.log("Error", error);
    //         })
    //         .finally(() => {
    //             // Acontece independente se o response for true ou false
    //             // setIsFetching(false);
    //         });
    // }, []);

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

    useEffect(() => {
        console.log("Data", data);
        let reqFunc: any = [];
        let reqNFunc: any = [];
        data?.map((requirement: RequirementsDataType) => {
            requirement.type === "F" ? reqFunc.push(requirement) : reqNFunc.push(requirement);
        });

        setFunctionalData(reqFunc);
        setNFunctionalData(reqNFunc);
    }, [data]);

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
                                    onClick={toggleInfoModal}
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
                                    onClick={toggleInfoModal}
                                />
                            );
                        })}
                </ContentTable>
            </TableList>
            {isModalInfoOpen && <InfoModal setIsOpen={toggleInfoModal} />}
            {isModalRegisterOpen && <RegisterModal setIsOpen={toggleModalRegister} />}
        </Container>
    );
};

export default Requirements;
