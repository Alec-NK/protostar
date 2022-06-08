import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 85%;
  grid-template-rows: 6% auto;
  grid-template-areas:
    "sidebar header"
    "sidebar content";
  width: 100vw;
  height: 100vh;

  .content {
    display: flex;
    flex-direction: column;
    grid-area: content;
    padding: 20px;
  }
`;
