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
    width: 50%;
    height: 60%;
    border-radius: 6px;
    background-color: white;
`;

export const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 30px 20px;
    /* border-bottom: solid 3px rgba(242, 242, 242, 1); */
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

export const Content = styled.div`
    display: grid;
    grid-template-columns: auto 35%;
    padding: 20px 35px;
    width: 100%;
    height: calc(100% - 65px);
    overflow: auto;

    .column:first-child {
        /* background-color: #b3b3b3; */
    }

    .column:last-child {
        margin-left: 2rem;
        /* background-color: #b3b3b3; */
    }

    .element {
        margin-bottom: 2rem;
    }

    .row_title {
        width: 100%;
        font-family: "Montserrat", sans-serif;
        margin-bottom: 30px;
    }

    .row {
        display: flex;
        text-align: justify;
        margin-bottom: 30px;

        .caption {
            margin-bottom: 15px;
            font-family: "Montserrat", sans-serif;
            color: #b3b3b3;
        }
    }

    .row_items {
        display: grid;
        grid-template-columns: 35% 35% 35%;
        width: 100%;
        /* background-color: red; */
        /* margin-bottom: 20px; */
    }
`;

export const Row = styled.div``;

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
