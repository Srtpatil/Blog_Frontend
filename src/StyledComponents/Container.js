import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const SectionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: max(min(1100px, 90vw), 60vw);
  z-index: 2;
  box-shadow: 0 30px 50px 0 rgba(1, 1, 1, 0.15);
  background-color: #ffffff;
  padding-bottom: 20px;
  top: -10vh;
  overflow: hidden;

  @media screen and (max-width: 650px) {
    width: 100%;
    padding: 0 10px;
    top: 0;
  }
`;
