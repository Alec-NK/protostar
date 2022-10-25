import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;

    h1 {
        font-family: "Prompt", sans-serif;
        font-size: 45px;
        color: #1a1a1a;
    }
`;

export const TableList = styled.div`
    display: flex;
    flex-flow: column nowrap;
`;

export const HeaderTable = styled.div`
    display: grid;
    grid-template-columns: 0.3fr 1fr 2fr;
    width: 100%;
    padding: 0 10px 10px 10px;
    margin-bottom: 25px;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    border-bottom: solid 1px rgba(242, 242, 242, 0.9);
    color: #525a68;
`;

export const ContentTable = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
