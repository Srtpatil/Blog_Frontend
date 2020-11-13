import styled, { css, keyframes } from "styled-components";
import { ReactComponent as HeartIcon } from "../assets/heart.svg";

export const SocialButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "80px")};
  height: ${(props) => (props.height ? props.height : "40px")};
  background: ${(props) => (props.background ? props.background : "#c62641")};
  font-size: 0.8rem;

  @media screen and (max-width: 450px) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: 0.6rem;
  }
`;

const beating = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
`;

const animation = (props) =>
  css`
    ${beating} 150ms linear 2 alternate
  `;

export const StyledLogo = styled(HeartIcon)`
  height: 65px;
  width: 35px;
  stroke: black;
  transition: fill 150ms ease-in;
  fill: ${(props) => (props.isLiked ? "#C11F23" : "white")};
  animation: ${(props) => (props.isLiked ? animation : "")};
  cursor: pointer;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  user-select: none;

  @media screen and (max-width: 450px) {
    width: 60px;
    height: 30px;
  }
`;
