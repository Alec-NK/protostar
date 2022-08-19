import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    font-family: "Montserrat", sans-serif;
`;

export const BoxContent = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 25vw;
    height: 60vh;
    border-radius: 5px;
    padding: 15px;
    background-color: white;
    box-shadow: 1px 1px 8px 5px ${(props) => props.theme.white_grey};
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30%;
    margin-bottom: 15px;
    /* background-color: red; */

    h4 {
        color: ${(props) => props.theme.black};
        margin-bottom: 25px;
        font-size: 25px;
        font-weight: 600;
    }

    span {
        font-size: 15px;
        color: ${(props) => props.theme.grey};
    }
`;

export const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    /* background-color: blue; */
    margin-bottom: 15px;

    input {
        margin-bottom: 10px;
    }

    .error {
        font-size: 15px;
        color: red;
        margin: 0 0 10px 5px;
    }
`;

export const BtnSignIn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    margin-bottom: 30px;
    font-weight: 500;
    border-radius: 5px;
    color: #f0f0f0;
    background-color: ${(props) => props.theme.orange};
    transition: all 0.2s;

    &:hover {
        background-color: ${(props) => props.theme.dark_orange};
        transition: all 0.2s;
    }
`;

export const RegisterLink = styled.div`
    display: flex;
    flex-flow: row nowrap;
    font-size: 14px;

    a {
        margin-left: 5px;
        color: ${(props) => props.theme.orange};

        &:hover {
            color: ${(props) => props.theme.dark_orange};
        }
    }
`;
