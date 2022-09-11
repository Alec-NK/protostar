import styled from "styled-components";

type CardProps = {
    disabled?: boolean;
};

export const Container = styled.div`
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 45px;

    h1 {
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        font-size: 45px;
        color: #1a1a1a;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;

    h2 {
        margin-bottom: 5px;
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        font-size: 35px;
        color: #1a1a1a;
    }

    .projects {
        margin-top: 30px;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
`;

export const Card = styled.div<CardProps>`
    visibility: ${(props) => (props.disabled ? "hidden" : "")};
    display: grid;
    grid-template-rows: 20% 65% 10%;
    width: 30%;
    min-height: 250px;
    margin: 0 40px 40px 0;
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
