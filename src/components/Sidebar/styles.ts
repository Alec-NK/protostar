import styled from "styled-components";

export const Container = styled.div`
    grid-area: sidebar;
    background-color: #1a1a1a;
    border-right: solid 1px #404040;
    padding: 20px;

    .logo {
        margin-bottom: 50px;
    }
`;

export const SideItems = styled.div`
    div {
        width: 100%;
        margin-bottom: 5px;
        padding: 12px;
        border-radius: 5px;
        text-align: center;
        background-color: #404040;
        color: white;
    }

    a {
        text-decoration: none;
    }
`;
