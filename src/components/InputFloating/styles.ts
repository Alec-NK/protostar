import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    input {
        width: 100%;
        height: 50px;
        padding: 14px 16px 0 12px;
        border-radius: 4px;
        background: #fff;
        font-size: 14px;
        font-weight: bold;
        color: ${(props) => props.theme.black_grey};
        background-color: ${(props) => props.theme.white_grey};
        outline: 0;
    }

    label {
        position: absolute;
        transform: translate(0, 14px) scale(1);
        padding: 0 16px;
        font-size: 14px;
        font-weight: bold;
        color: ${(props) => props.theme.grey};
        transform-origin: top left;
        transition: all 0.2s ease-out;
        pointer-events: none;
    }

    &:focus-within input {
        border: 1px solid ${(props) => props.theme.white_grey};
        background: #fff;
        transition: all 0.2s ease-out;
    }

    &:focus-within label {
        transform: translate(0, 5px) scale(0.75);
    }

    .Active {
        transform: translate(0, 5px) scale(0.75);
    }
`;
