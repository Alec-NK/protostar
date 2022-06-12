import styled from "styled-components";

export const ButtonContainer = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0;
    padding: 22px 45px;
    margin-right: 7rem;
    border: none;
    border-radius: 5px;
    font-family: "Maven Pro", sans-serif;
    font-weight: bold;
    background-color: #fab039;
    transition: 0.2s;

    &:hover {
        background-color: #f0a732;
        transition: 0.2s;
    }

    .icon {
        display: flex;
        margin-right: 10px;
    }
`;
