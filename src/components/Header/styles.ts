import styled from "styled-components";

export const Container = styled.div`
    grid-area: header;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    width: 100%;
    padding-right: 50px;
    font-size: 25px;
    border-bottom: solid 1px #c7c7c7;

    button {
        margin-left: 20px;
    }
`;
