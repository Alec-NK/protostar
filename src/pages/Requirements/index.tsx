import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useFetch } from "../../hooks/useFetch";

import Button from "../../components/Button";
import ItemTable from "./ItemTable";
import RegisterModal from "./Modals/RegisterModal";
import InfoModal from "./Modals/InfoModal";

import {
    ButtonSection,
    Container,
    ContentTable,
    Header,
    HeaderTable,
    SectionsPage,
    TableList,
} from "./styles";

const Requirements = () => {
    const [isPageFunctional, setIsPageFunctional] = useState(true);
    const [isPageNFunctional, setIsPageNFunctional] = useState(false);
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const { data, isFetching }: any = useFetch(
        `${process.env.REACT_APP_API_URL}/requisitos/`
    );
    const [functionalData, setFunctionalData] = useState<any>();
    const [nFunctionalData, setNFunctionalData] = useState<any>();

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
        data?.map((requirement: any) => {
            requirement.type === "F"
                ? reqFunc.push(requirement)
                : reqNFunc.push(requirement);
        });

        setFunctionalData(reqFunc);
        setNFunctionalData(reqNFunc);
    }, [data]);

    return (
        <Container>
            <Header>
                <h1>REQUISITOS</h1>
                <Button
                    text="NOVO"
                    icon={<BsPlusLg />}
                    onClick={toggleModalRegister}
                />
            </Header>
            <SectionsPage>
                <ButtonSection
                    isActive={isPageFunctional}
                    onClick={toggleFunctionalPage}
                >
                    Funcionais
                </ButtonSection>
                <ButtonSection
                    isActive={isPageNFunctional}
                    onClick={toggleNFunctionalPage}
                >
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
                    {isFetching && <div>Carregando...</div>}
                    {isPageFunctional && (
                        <>
                            <ItemTable onClick={toggleInfoModal} />
                            <ItemTable />
                            <ItemTable />
                            <ItemTable />
                            <ItemTable />
                            <ItemTable />
                            <ItemTable />
                            <ItemTable />
                            <ItemTable />
                            <ItemTable />
                        </>
                    )}

                    {isPageNFunctional &&
                        nFunctionalData.map((req: any) => {
                            return <ItemTable data={req} />;
                        })}
                </ContentTable>
            </TableList>
            {isModalInfoOpen && <InfoModal setIsOpen={toggleInfoModal} />}
            {isModalRegisterOpen && (
                <RegisterModal setIsOpen={toggleModalRegister} />
            )}
        </Container>
    );
};

export default Requirements;
