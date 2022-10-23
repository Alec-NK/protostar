import styled from "styled-components";

export const Container = styled.div`
    grid-area: header;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    width: 100%;
    padding-right: 50px;
    border-bottom: solid 1px #c7c7c7;

    .notification_icon {
        font-size: 25px;
        margin-right: 20px;
    }

    .button_logout {
        > span {
            margin-left: 10px;
        }
    }
`;
