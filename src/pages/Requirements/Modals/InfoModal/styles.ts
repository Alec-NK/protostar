import styled from "styled-components";

type ButtonSectionProps = {
    isActive?: boolean;
};

export const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.8);
`;

export const CloseButton = styled.button`
    display: flex;
    font-size: 28px;
    padding: 5px;
    border: none;
    border-radius: 8px;
    background-color: transparent;
    opacity: 70%;
    transition: all 0.2s;

    &:hover {
        opacity: 100%;
        transition: all 0.2s;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 68%;
    height: 70%;
    border-radius: 6px;
    background-color: white;
`;

export const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 30px 20px;
    color: #1a1a1a;

    h2 {
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
    }
`;

export const SectionsPage = styled.div`
    display: flex;
    flex-direction: row;
    border-bottom: solid 1px rgba(242, 242, 242, 0.5);
    padding-left: 30px;

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
        props.isActive ? "2px solid #fab039" : "1px solid rgba(242, 242, 242, 0.5)"};
    color: ${(props) => (props.isActive ? "#282828" : "#a3a3a3")};
    font-weight: ${(props) => (props.isActive ? "500" : "300")};
    transition: 0.2s;

    &:hover {
        background-color: rgba(242, 242, 242, 0.5);
    }
`;

export const HeaderContent = styled.div`
    margin-bottom: 30px;

    .row_title {
        width: 100%;
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        font-size: 20px;
    }
`;

export const Content = styled.div`
    padding: 20px 35px;
    width: 100%;
    height: calc(100% - 65px);
    overflow: auto;

    .column:last-child {
        margin-left: 2rem;
    }

    .element {
        margin-bottom: 30px;
    }

    .row {
        display: flex;
        text-align: justify;
        margin-bottom: 30px;
    }

    .caption {
        margin-bottom: 15px;
        font-family: "Montserrat", sans-serif;
        color: ${(props) => props.theme.grey};
        font-weight: 600;
    }

    .requirements {
        display: flex;
        flex-flow: row wrap;
    }
`;

export const Columns = styled.div`
    display: grid;
    grid-template-columns: auto 35%;
`;

export const RowItems = styled.div`
    display: grid;
    grid-template-columns: 35% 35% 35%;
    width: 100%;

    .atribute {
        font-weight: 700;
        margin-bottom: 5px;
        color: ${(props) => props.theme.grey};
    }
`;

export const Tag = styled.button`
    display: flex;
    justify-content: center;
    padding: 5px 10px;
    margin: 0 5px 10px 0;
    font-weight: 500;
    border-radius: 5px;
    border: 2px solid #dfe1e6;
    background-color: #ebecf0;
    color: #7a869a;
    transition: all 0.2s;

    &:hover {
        background-color: #dfe1e6;
        transition: all 0.2s;
    }
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding: 20px;
    border-top: solid 1px rgba(242, 242, 242, 1);

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0;
        padding: 20px 25px;
        border: none;
        border-radius: 5px;
        font-family: "Maven Pro", sans-serif;
    }

    .btnEditar {
        margin-right: 10px;
        background-color: #fab039;
        color: white;
        transition: 0.2s;

        &:hover {
            background-color: #f0a732;
            transition: 0.2s;
        }
    }

    .btnExcluir {
        background-color: transparent;
        border: solid 1px #fab039;
        color: #fab039;
    }
`;
