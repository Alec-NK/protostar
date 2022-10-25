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

    .button_logout {
        > span {
            margin-left: 10px;
        }
    }
`;

export const Notification = styled.button`
    font-size: 25px;
    margin-right: 20px;

    .badge {
        position: absolute;
        top: 12px;
        background-color: rgba(212, 19, 13, 1);
        color: #fff;
        border-radius: 3px;
        padding: 1px 3px;
        font-size: 8px;
    }
`;

export const NotificationItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 20px 0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 0.5px rgba(0, 0, 0, 0.1);

    .title {
        font-weight: 500;
    }

    .description {
        color: #b3b3b3;
    }
`;
