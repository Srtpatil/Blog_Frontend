import styled, { css, keyframes } from "styled-components";
import { ReactComponent as HeartIcon } from "../assets/heart.svg";

export const PrimaryButton = styled.div`
  min-width: 140px;
  height: 45px;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: var(--primary-color);
  z-index: 3;
  cursor: pointer;
  margin-right: 20px;
  text-decoration: none;
  border: ${(props) => (props.border ? "1px solid #c62641" : "")};

  &:hover {
    box-shadow: 0 10px 20px 0 rgba(1, 1, 1, 0.15);
  }

  @media screen and (max-width: 650px) {
    min-width: 45%;
  }
`;

export const SecondaryButton = styled.div`
  min-width: 140px;
  height: 45px;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--primary-color);
  border: ${(props) => (props.border ? "1px solid white" : "")};
  z-index: 3;
  margin-right: 20px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    box-shadow: 0 10px 20px 0 rgba(1, 1, 1, 0.15);
  }

  @media screen and (max-width: 650px) {
    min-width: 45%;
  }
`;

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
    transform: scale(1.3);
  }
`;

const animation = (props) =>
  css`
    ${beating} 200ms linear 2 alternate
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
