import styled, { css, keyframes } from "styled-components";
import { ReactComponent as HeartIcon } from "../assets/heart.svg";
import { ReactComponent as OptimizeItLogo } from "../assets/Logo_2.svg";

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
  // margin-right: 20px;
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

export const PaginationButton = styled.div`
  min-width: 150px;
  height: 45px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  z-index: 3;
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
  pointer-events: ${(props) => (props.disabled ? "none" : "all")};

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

export const CompanyLogo = styled(OptimizeItLogo)`
  width: max(20vw, 200px);
  display: flex;
  padding-top: 5px;

  &:hover {
    .bg-bulb {
      fill-opacity: 1;
    }

    .bg-bulb2 {
      fill-opacity: 1;
    }
    .logoFill {
      -webkit-filter: drop-shadow(12px 12px 10px rgba(0, 0, 0, 0.35));
      filter: drop-shadow(12px 12px 10px rgba(0, 0, 0, 0.35));
    }
  }
`;

export const LoginButton = styled.div`
  background-color: ${(props) => props.backgroundColor};
  max-width: 300px;
  padding: 0 18px;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: rgba(0, 0, 0, 0.84) !important; */
  color: ${(props) => props.color};
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.05);
  outline: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  border: ${(props) => (props.border ? "1px solid rgba(0, 0, 0, 0.61)" : "0")};
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 20px 0 rgba(1, 1, 1, 0.15);
  }
`;
