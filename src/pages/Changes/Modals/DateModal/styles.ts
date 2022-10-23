import styled from "styled-components";

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

export const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 70% 15%;
    width: 30%;
    height: 35%;
    border-radius: 6px;
    background-color: white;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    color: #1a1a1a;
    padding: 25px 30px;
    border-bottom: solid 1px rgba(242, 242, 242, 1);

    h2 {
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
    }
`;

export const Content = styled.div`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    padding: 20px 30px;
    margin-bottom: 25px;

    .inputContainer {
        margin-bottom: 15px;

        label {
            font-family: "Montserrat", sans-serif;
            font-weight: 600;
            font-size: 15px;
        }

        input {
            margin-top: 5px;
        }
    }
`;

export const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0px 30px;

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0;
        border: none;
        border-radius: 5px;
        font-family: "Maven Pro", sans-serif;
    }

    .btnSave {
        padding: 20px 35px;
        margin-right: 10px;
        background-color: #fab039;
        color: white;
        transition: 0.2s;

        &:hover {
            background-color: #f0a732;
            transition: 0.2s;
        }
    }

    .btnCancel {
        padding: 20px 25px;
        background-color: transparent;
        border: solid 1px #fab039;
        color: #fab039;
    }
`;
