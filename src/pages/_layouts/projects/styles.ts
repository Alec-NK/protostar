import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-rows: 8% 92%;
    grid-template-areas:
        "header"
        "projects_content";
`;

export const Content = styled.div`
    grid-area: "projects_content";
    width: 100vw;
    padding: 40px;
`;
