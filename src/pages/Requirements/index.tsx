import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";

import Button from "../../components/Button";
import ItemTable from "./ItemTable";
import RegisterModal from "./Modals/RegisterModal";

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

    const toggleModalRegister = () => {
        setIsModalRegisterOpen((prevState) => !prevState);
    };

    const toggleFunctionalPage = () => {
        setIsPageFunctional(true);
        setIsPageNFunctional(false);
    };

    const toggleNFunctionalPage = () => {
        setIsPageFunctional(false);
        setIsPageNFunctional(true);
    };

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
                    {isPageFunctional && (
                        <>
                            <ItemTable />
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

                    {isPageNFunctional && (
                        <>
                            <ItemTable />
                            <ItemTable />
                            <ItemTable />
                        </>
                    )}
                </ContentTable>
            </TableList>
            {isModalRegisterOpen && (
                <RegisterModal setIsOpen={toggleModalRegister} />
            )}
        </Container>
    );
};

export default Requirements;
