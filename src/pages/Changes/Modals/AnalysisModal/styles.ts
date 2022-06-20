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
    border-bottom: solid 1px rgba(242, 242, 242, 1);
    color: #1a1a1a;

    h2 {
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
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
    margin-bottom: 2rem;
`;

export const Caption = styled.div`
    font-family: "Montserrat", sans-serif;
    color: #b3b3b3;
    margin-bottom: 2rem;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;

    .subcontainer {
        padding: 0 20px;
    }

    .second_title {
        font-weight: bold;
    }

    .section_title {
        margin-bottom: 25px;
    }
`;

export const SecondRow = styled.div`
    display: grid;
    grid-template-columns: 52% 47%;
    margin-bottom: 2rem;
`;

export const ThirdRow = styled.div`
    display: grid;
    grid-template-columns: 33% 33% 33%;
    margin-bottom: 2rem;
`;

export const FourthRow = styled.div`
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    margin-bottom: 2rem;
`;

export const Element = styled.div`
    margin-right: 10px;

    .attribute {
        font-weight: bold;
        margin-bottom: 10px;
    }

    .value_info {
        text-align: justify;
        margin-top: 15px;
        margin-right: 20px;
    }

    .value_list {
        margin-left: 40px;
    }
`;

export const ElementList = styled.div`
    .attribute {
        font-weight: bold;
        margin-bottom: 10px;
    }

    .values_row {
        display: flex;
        flex-direction: row;
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
