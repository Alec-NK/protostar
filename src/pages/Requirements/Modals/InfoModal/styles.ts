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

export const Content = styled.div`
    padding: 20px 35px;
    width: 100%;
    height: calc(100% - 65px);
    overflow: auto;
`;

export const HeaderContent = styled.div`
    margin-bottom: 35px;

    .row_title {
        width: 100%;
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        font-size: 25px;
    }
`;

export const Columns = styled.div`
    display: grid;
    grid-template-columns: auto 35%;

    .column:last-child {
        margin-left: 2rem;
    }
`;

export const TitleColumn = styled.div`
    margin-bottom: 20px;
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    font-size: 18px;
    /* color: ${(props) => props.theme.grey}; */
`;

export const RowThree = styled.div`
    display: grid;
    grid-template-columns: 35% 35% 35%;
    width: 100%;
`;

export const Element = styled.div`
    margin-bottom: 30px;

    .atribute {
        font-weight: 700;
        margin-bottom: 5px;
        color: ${(props) => props.theme.grey};
    }

    .value {
        color: #b3b3b3;
    }
`;

export const Relations = styled.div`
    margin-bottom: 35px;

    .caption {
        margin-bottom: 15px;
        font-family: "Montserrat", sans-serif;
        color: ${(props) => props.theme.grey};
        font-weight: 700;
        font-size: 15px;
    }

    .requirements {
        display: flex;
        flex-flow: row wrap;
    }

    .stakeholders {
        display: flex;
        flex-wrap: wrap;
        text-align: justify;
        width: 95%;
        color: #b3b3b3;
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

export const CardVersion = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 12px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.white_grey};

    .title_card {
        font-weight: 700;
        margin-bottom: 5px;
    }
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding: 20px;
    border-top: solid 1px rgba(242, 242, 242, 1);
`;
