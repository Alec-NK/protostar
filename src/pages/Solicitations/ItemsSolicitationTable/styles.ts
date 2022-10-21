import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1fr 0.8fr 0.8fr 0.6fr 0.3fr;
    align-items: center;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    font-family: "Montserrat", sans-serif;
    font-size: 15px;
    background-color: rgba(242, 242, 242, 0.5);
    cursor: pointer;

    div {
        flex-wrap: wrap;
    }

    .function_icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        color: grey;
    }
`;
