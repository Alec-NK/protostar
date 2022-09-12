import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    .row {
        display: flex;
        flex-direction: row;
    }
`;

export const Header = styled.div`
    margin-bottom: 20px;
    padding: 25px;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
    background-color: white;

    h1 {
        font-family: "Montserrat", sans-serif;
        font-size: 35px;
        font-weight: 700;
        color: #1a1a1a;
    }
`;

export const Description = styled.div`
    width: 70%;
    height: 30vh;
    margin-right: 2%;
    padding: 25px;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
    background-color: white;
`;

export const Members = styled.div`
    width: 28%;
    padding: 25px;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
    background-color: white;
`;

export const SubHeading = styled.div`
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 25px;
    color: #1a1a1a;
`;
