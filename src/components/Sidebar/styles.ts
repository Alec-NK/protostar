import styled from "styled-components";

type SideItemsProps = {
    active: boolean;
};

export const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 10% 75% 5%;
    grid-area: sidebar;
    background-color: #1a1a1a;
    border-right: solid 1px rgba(0, 0, 0, 0.2);
    /* box-shadow: 3px 0px 5px 1px rgba(0, 0, 0, 0.2); */
    padding: 20px 30px;

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;

        img {
            width: 90%;
            /* border: 1px solid white; */
        }
    }

    .pages {
        height: 60%;
        margin-top: 10px;
    }

    // Seções - Habilitar na versão final
    .title {
        font-family: "Maven Pro", sans-serif;
        font-weight: lighter;
        font-size: 14px;
        color: rgba(242, 242, 242, 0.6);
        margin-bottom: 10px;
    }
`;

export const SideItem = styled.div<SideItemsProps>`
    a {
        text-decoration: none;
    }

    .link {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        width: 100%;
        padding: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
        text-align: center;
        background-color: ${(props) => (props.active ? "#282828" : "transparent")};
        color: ${(props) => (props.active ? "white" : "#616060")};
        transition: 0.2s;
        font-family: "Maven Pro", sans-serif;
        font-weight: 500;
        font-size: 15px;

        &:hover {
            background-color: #404040;
            transition: 0.2s;
        }
    }

    .link_icon {
        display: flex;
        margin-right: 15px;
    }
`;

export const ButtonProject = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 100%;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    text-align: center;
    color: #616060;
    transition: 0.2s;
    font-family: "Maven Pro", sans-serif;
    font-weight: 500;
    font-size: 15px;

    &:hover {
        background-color: #404040;
        transition: 0.2s;
    }

    .btn_icon {
        display: flex;
        margin-right: 15px;
        padding: 0;
    }
`;
