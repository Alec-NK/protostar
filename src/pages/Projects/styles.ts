import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;

    h1 {
        font-family: "Prompt", sans-serif;
        font-size: 45px;
        color: #1a1a1a;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

export const Card = styled.div`
    width: 40%;
    min-height: 250px;
    margin: 0 20px 20px 0;
    padding: 20px;
    box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.2);

    .name_project {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .description_project {
        display: flex;
        flex-flow: column nowrap;
        text-align: justify;
        font-size: 15px;
        color: #878787;
        width: 100%;
        margin-bottom: 20px;
    }

    &:hover {
        cursor: pointer;
    }
`;
