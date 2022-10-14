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

export const CloseButton = styled.button`
    display: flex;
    font-size: 28px;
    padding: 5px;
    border: none;
    border-radius: 8px;
    background-color: transparent;
    opacity: 70%;
    transition: all 0.2s;

    &:hover {
        opacity: 100%;
        transition: all 0.2s;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 68%;
    height: 70%;
    border-radius: 6px;
    background-color: white;
`;

export const ModalHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 15px 20px;
    border-bottom: solid 1px rgba(242, 242, 242, 1);
    color: #1a1a1a;

    h2 {
        font-family: "Montserrat", sans-serif;
        font-weight: 700;
    }
`;

export const HeaderContent = styled.div`
    margin-bottom: 50px;

    .row_title {
        width: 100%;
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        font-size: 25px;
    }
`;

export const Content = styled.div`
    padding: 20px 35px;
    width: 100%;
    height: calc(100% - 65px);
    overflow: auto;
`;

export const RowTwo = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    margin-bottom: 30px;
`;

export const RowThree = styled.div`
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
    margin-bottom: 30px;
`;

export const Element = styled.div`
    margin-right: 10px;

    .attribute {
        font-weight: bold;
        margin-bottom: 10px;
        color: ${(props) => props.theme.grey};
    }

    .value_info {
        text-align: justify;
        margin-top: 15px;
        margin-right: 20px;
        color: #b3b3b3;
    }
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding: 20px;
    border-top: solid 1px rgba(242, 242, 242, 1);
`;
