import styled from "styled-components";

type ContainerProps = {
    color: string;
    backgroundColor: string;
};

export const Container = styled.div<ContainerProps>`
    span {
        padding: 6px 10px;
        border-radius: 4px;
        background-color: ${(props) => props.backgroundColor};
        color: ${(props) => props.color};
        font-family: "Maven Pro", sans-serif;
        font-weight: 600;
    }
`;
