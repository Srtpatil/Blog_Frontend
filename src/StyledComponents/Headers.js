import styled from "styled-components";

export const SectionHeader = styled.div`
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "90px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
`;

export const SectionUnderline = styled.hr`
  margin-top: 20px;
  border-width: 0;
  width: 50px;
  height: 1px;
  background-color: #cccccc;
`;
