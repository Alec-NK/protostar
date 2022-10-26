import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1fr 2fr;
    align-items: center;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    font-family: "Montserrat", sans-serif;
    font-size: 15px;
    background-color: rgba(242, 242, 242, 0.5);
    cursor: pointer;

    .function_icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: grey;

        button {
            margin-left: 12px;
        }
    }

    .teste {
        background-color: red;
    }
`;
