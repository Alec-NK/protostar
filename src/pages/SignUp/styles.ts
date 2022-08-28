import styled from "styled-components";

export const Background = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    padding: 20px 7%;
`;

export const Container = styled.div`
    display: grid;
    grid-template-rows: 25% 52% 20%;
    width: 45%;
    font-family: "Montserrat", sans-serif;
    /* background-color: ${(props) => props.theme.grey}; */
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    h3 {
        font-size: 35px;
        font-weight: 600;
        margin-bottom: 10px;
    }
`;

export const SignInLink = styled.div`
    a {
        margin-left: 5px;
        color: ${(props) => props.theme.orange};

        &:hover {
            color: ${(props) => props.theme.dark_orange};
        }
    }
`;

export const BtnSignUp = styled.button`
    width: 100%;
    padding: 10px 0;
    border-radius: 5px;
    color: white;
    background-color: ${(props) => props.theme.orange};
`;

export const ErrorMessage = styled.div`
    margin-top: 10px;
    font-size: 14px;
    color: #e34444;
`;
