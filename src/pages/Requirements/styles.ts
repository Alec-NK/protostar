import styled from "styled-components";

type ButtonSectionProps = {
    isActive: boolean;
};

export const Container = styled.div`
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;

    h1 {
        font-family: "Prompt", sans-serif;
        font-size: 45px;
        color: #1a1a1a;
    }
`;

export const SectionsPage = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;
    border-bottom: solid 1px rgba(242, 242, 242, 0.5);

    button {
        padding: 10px 15px;
        background-color: transparent;
        font-family: "Prompt", sans-serif;
        font-size: 15px;
    }
`;

export const ButtonSection = styled.button<ButtonSectionProps>`
    border: none;
    border-bottom: ${(props) =>
        props.isActive
            ? "2px solid orange"
            : "1px solid rgba(242, 242, 242, 0.5)"};
    color: ${(props) => (props.isActive ? "orange" : "#a3a3a3")};
    font-weight: ${(props) => (props.isActive ? "500" : "300")};
    transition: 0.2s;

    &:hover {
        background-color: rgba(242, 242, 242, 0.5);
    }
`;

export const TableList = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;

export const HeaderTable = styled.div`
    display: grid;
    grid-template-columns: 0.3fr 1.5fr 0.6fr 0.7fr 0.5fr 1fr;
    width: 100%;
    padding: 0 10px 10px 10px;
    margin-bottom: 25px;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    border-bottom: solid 1px rgba(242, 242, 242, 0.9);
    color: #525a68;
`;

export const ContentTable = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const RowContent = styled.div``;
