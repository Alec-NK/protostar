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
    display: flex;
    flex-flow: column nowrap;
    width: 70%;
    height: 70%;
    border-radius: 6px;
    background-color: white;
`;

export const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    padding-bottom: 10px;
    border-bottom: solid 1px rgba(242, 242, 242, 1);
    color: #1a1a1a;

    h2 {
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
    }
`;

export const Content = styled.div`
    padding: 20px;
    width: 100%;
    height: calc(100% - 65px);
    overflow: auto;

    label {
        margin: 0 0 5px 5px;
        font-family: "Montserrat", sans-serif;
        font-weight: 500;
        font-size: 15px;
    }

    input {
        padding: 0.8rem;
        border: 2px solid #b3b3b3;
        border-radius: 5px;
        font-size: 15px;
        outline: none;
        transition: all 0.3s;
        color: black;
        -webkit-appearance: none;
        -moz-appearance: none;
        font-family: "Montserrat", sans-serif;

        &:disabled {
            border: 2px solid rgba(242, 242, 242, 1);
            cursor: not-allowed;

            ::placeholder {
                color: rgba(242, 242, 242, 1);
            }
        }
    }

    select {
        padding: 0.8rem;
        border: 2px solid #b3b3b3;
        border-radius: 5px;
        font-size: 15px;
        outline: none;
        transition: all 0.3s;
        color: black;
    }

    textarea {
        border: 2px solid RGBA(0, 0, 0, 0.3);
    }

    .inputContainer {
        display: flex;
        flex-flow: column nowrap;
        margin-right: 10px;

        .category {
            width: 100%;
        }

        .error_message {
            margin: 4px 0 0 5px;
            font-size: 14px;
            color: #e34444;
        }
    }

    .caption {
        margin-bottom: 15px;
        font-family: "Montserrat", sans-serif;
        color: #b3b3b3;
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
