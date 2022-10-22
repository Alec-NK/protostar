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
    width: 60%;
    height: 70%;
    border-radius: 6px;
    background-color: white;
`;

export const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 15px 20px;
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
    font-family: "Montserrat", sans-serif;
`;

export const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;

    h3 {
        font-size: 20px;
        font-weight: 700;
        margin-right: 10px;
    }
`;

export const Caption = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2rem;
    color: ${(props) => props.theme.grey};

    span {
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        margin-right: 5px;
    }
`;

export const RowOne = styled.div`
    display: grid;
    grid-template-columns: 100%;
    margin-bottom: 30px;
`;

export const RowTwo = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    margin-bottom: 30px;
`;

export const RowThree = styled.div`
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    margin-bottom: 30px;
`;

export const RowFour = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    margin-bottom: 30px;
`;

export const Element = styled.div`
    margin-right: 10px;
    /* padding-left: 10px;
    border-left: 2px solid #b3b3b3; */

    .attribute {
        font-weight: bold;
        margin-bottom: 10px;
        color: ${(props) => props.theme.grey};
    }

    .value_info {
        text-align: justify;
        margin-top: 15px;
        margin-right: 20px;
        color: #b3b3b3;
    }
`;

export const ElementList = styled.div`
    margin-right: 10px;
    /* background-color: grey; */

    .attribute {
        font-weight: bold;
        margin-bottom: 10px;
        color: ${(props) => props.theme.grey};
    }

    .values_row {
        display: flex;
        flex-flow: row wrap;

        div {
            margin-bottom: 5px;
        }
    }
`;

export const DateItems = styled.div`
    .subheading {
        margin-bottom: 10px;
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
        /* color: #b3b3b3; */
        margin-right: 20px;
        /* color: ${(props) => props.theme.grey}; */
    }

    .dates {
        border-left: solid 2px orange;
        padding: 0 0 0 10px;
    }

    .items {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 5px;
        /* background-color: red; */
    }

    .attribute {
        font-weight: bold;
        color: ${(props) => props.theme.grey};
        margin-right: 10px;
    }

    .value {
        color: #b3b3b3;
    }
`;

export const Section = styled.div`
    margin-bottom: 40px;
`;

export const Tag = styled.div`
    display: flex;
    justify-content: center;
    padding: 8px 10px;
    margin-right: 5px;
    font-weight: 500;
    border-radius: 5px;
    border: 2px solid #dfe1e6;
    background-color: #ebecf0;
    color: #7a869a;
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

    .btn_footer {
        margin-right: 10px;
        color: white;
        transition: 0.2s;

        .icon_btn {
            font-size: 1rem;
            margin-right: 5px;
        }
    }

    #btn_accept {
        background-color: #02bf90;

        &:hover {
            background-color: #00af84;
            transition: 0.2s;
        }
    }

    #btn_reject {
        background-color: #f44545;

        &:hover {
            background-color: #dd3737;
            transition: 0.2s;
        }
    }

    #btn_imp {
        background-color: #4a91fb;

        &:hover {
            background-color: #3d80e4;
            transition: 0.2s;
        }
    }
`;
