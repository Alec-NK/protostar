import styled from "styled-components";

export const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.8);
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    height: 25%;
    padding: 10px 30px;
    border-radius: 6px;
    background-color: white;
`;

export const MainMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: 600;
    height: 60%;
    /* background-color: red; */
`;

export const ButtonConfirm = styled.button`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 50%;
    margin-right: 25px;
    font-size: 15px;
    border-radius: 5px;
    padding: 5px 15px;
    font-weight: 500;
    color: white;
    background-color: #02bf90;

    &:hover {
        background-color: #00af84;
        transition: 0.2s;
    }

    .icon_button {
        font-size: 20px;
        margin-right: 5px;
    }
`;

export const ButtonCancel = styled.button`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 50%;
    font-size: 15px;
    border-radius: 5px;
    padding: 5px 15px;
    font-weight: 500;
    color: white;
    background-color: #f44545;

    &:hover {
        background-color: #dd3737;
        transition: 0.2s;
    }

    .icon_button {
        font-size: 20px;
        margin-right: 5px;
    }
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 40%;
`;
