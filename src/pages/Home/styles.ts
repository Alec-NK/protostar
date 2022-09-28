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
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
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
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
    background-color: white;
`;

export const Members = styled.div`
    width: 28%;
    padding: 25px;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
    background-color: white;

    .header_members {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: 25px;

        h2 {
            font-family: "Montserrat", sans-serif;
            font-weight: 600;
            font-size: 20px;
            color: #1a1a1a;
            margin-right: 15px;
        }
    }
`;

export const SubHeading = styled.div`
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 25px;
    color: #1a1a1a;
`;

export const MembersList = styled.div`
    display: flex;
    flex-direction: column;

    .card_member {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: 20px;

        span {
            margin-right: 10px;
        }
    }
`;
