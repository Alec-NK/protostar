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
    width: 50%;
    height: 60%;
    border-radius: 6px;
    background-color: white;
`;

export const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    padding-bottom: 10px;
    border-bottom: solid 3px rgba(242, 242, 242, 1);
    color: #1a1a1a;

    h2 {
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
    }
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
    height: 300px;

    .input-container {
        width: 280px;
        position: relative;
    }

    .label {
        position: absolute;
        left: 15px;
        top: 15px;
        transition: all 0.2s;
        padding: 0 2px;
        z-index: 1;
        color: #b3b3b3;
    }

    .text-input {
        padding: 0.8rem;
        width: 100%;
        height: 100%;
        border: 2px solid #2f2c45;
        /* background: #272530; */
        border-radius: 5px;
        font-size: 15px;
        outline: none;
        transition: all 0.3s;
        color: black;
    }

    .label::before {
        content: "";
        height: 5px;
        background: white;
        position: absolute;
        left: 0px;
        top: 10px;
        width: 100%;
        z-index: -1;
    }

    .text-input:focus {
        border: 2px solid #7e4ccb;
    }

    .text-input:focus + .label,
    .filled {
        top: -10px;
        color: #7e4ccb;
        font-size: 14px;
        font-weight: bold;
    }

    .text-input::placeholder {
        font-size: 16px;
        opacity: 0;
        transition: all 0.3s;
    }
    .text-input:focus::placeholder {
        opacity: 1;
    }
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding: 20px;
    border-top: solid 3px rgba(242, 242, 242, 1);

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

    .btnRegister {
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
        background-color: transparent;
        border: solid 1px #fab039;
        color: #fab039;
    }
`;
