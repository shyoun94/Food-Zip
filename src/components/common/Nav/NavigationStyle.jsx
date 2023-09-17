import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import fulllogo from "../../../assets/images/full-logo-xs.svg";

const slideRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;
const NavWrapper = styled.nav`
  position: fixed;
  max-width: 390px;
  z-index: 100;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #dbdbdb;

  @media (min-width: 768px) {
    box-sizing: border-box;
    width: var(--nav-medium-width);
    height: 100vh;
    position: fixed;
    top: 0;
    margin: 0 auto 0 0;
    padding: 40px 34px;
    border-right: 1px solid #c4c4c4;
  }
  @media (min-width: 1024px) {
    width: var(--nav-wide-width);
  }
`;

const NavList = styled.ul`
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (min-width: 768px) {
    margin-top: 70px;
    flex-direction: column;
    justify-content: initial;
    gap: 30px;
    align-items: left;
    height: 100vh;
    & li {
      width: 100%;
    }
    & li:last-of-type {
      margin-top: 200px;
    }
  }
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #767676;

  &.active {
    color: #286140;
  }
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledNavText = styled.p`
  margin-top: 4px;
  font-size: 10px;
  @media (min-width: 1024px) {
    font-size: 19px;
    padding-left: 16px;
  }
`;
const ButtonContainer = styled.div`
  position: absolute;
  top: -58px;
  right: 0;
`;
const ScrollButton = styled.button`
  position: sticky;
  top: 88%;
  left: 85%;
  background-color: #629678;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 999;
  margin-right: 12px;
`;

const TopIcon = styled.img`
  width: 24px;
  height: 24px;
`;
const HeaderRightBtn = styled.button`
  border: 0;
  padding: 10px;
  padding-right: 0;
  background-color: transparent;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    padding: 0;
    font-size: 19px;
    & img {
      margin-right: 10px;
    }
    & span {
      line-height: 28px;
    }
  }
`;
const HeaderTitle = styled(Link)`
  font-size: 30px;
  font-style: italic;
  font-weight: 600;
  padding: 30px 0 0 5px;
`;
const HeaderLogoBtn = styled.button`
  background: url(${fulllogo}) no-repeat center center;
  width: 30px;
  height: 30px;
  margin-right: 216px;
`;
const LogoGroup = styled.div`
  display: flex;
  gap: 5px;
`;
const SearchBar = styled.div`
  position: fixed;
  left: ${props => (props.open ? "-270px" : "-375px")};
  top: 80px;
  width: 300px;
  height: 100vh;
  background-color: #fff;
  animation-name: ${props => (props.open ? slideRight : "none")};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  padding: 20px;
  z-index: 999;
`;
const HeaderSearchInp = styled.input`
  width: 300px;
  background-color: #f2f2f2;
  border: 0;
  border-radius: 32px;
  padding: 7px 16px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus {
    outline: 0;
  }
  &::placeholder {
    color: #c4c4c4;
  }
`;
export {
  NavWrapper,
  NavList,
  NavLink,
  StyledNavText,
  ScrollButton,
  TopIcon,
  ButtonContainer,
  HeaderRightBtn,
  HeaderTitle,
  HeaderLogoBtn,
  LogoGroup,
  SearchBar,
  HeaderSearchInp,
};
