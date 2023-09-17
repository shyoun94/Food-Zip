import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
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
} from "./NavigationStyle";
import sprite from "../../../assets/images/SpriteIcon.svg";
import MorePc from "../../../assets/images/MorePC.svg";
import debounce from "lodash/debounce";
import { userSearch } from "../../../api/search";
import SearchList from "../../Search/SearchList";

export default function Navigation() {
  const [showButton, setShowButton] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const SocialSVG = ({ id, color = "white", size = 34 }) => (
    <svg fill={color} width={size} height={size}>
      <use href={`${sprite}#${id}`} style={{ stroke: "currentColor" }} />
    </svg>
  );
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const showButtonClick = () => {
      if (window.scrollY > 800) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", showButtonClick);
    return () => {
      window.removeEventListener("scroll", showButtonClick);
    };
  }, []);
  function handleClick() {
    if (!showSearch) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }
  function randomOpen() {
    // if (!isRandomOpening) {
    //   setIsRandomOpening(true);
    //   setRandomShow(true);
    //   handleRecommendation();
    //   setTimeout(() => {
    //     setRandomShow(false);
    //     setIsRandomOpening(false);
    //   }, 6800);
    // }
  }
  const handleSearchKeyword = event => {
    setSearchKeyword(event.target.value);
  };

  return (
    <>
      <NavWrapper>
        {/* <LogoGroup> */}
        <HeaderTitle to="/home">FOODZIP</HeaderTitle>
        {/* <HeaderLogoBtn
            type="button"
            onClick={randomOpen}
            aria-label="추천 음식 버튼"
          /> */}
        {/* </LogoGroup> */}
        {/* <ButtonContainer>
          {showButton && (
            <ScrollButton onClick={scrollToTop}>
              <TopIcon src={topIcon} alt="Top" />
            </ScrollButton>
          )}
        </ButtonContainer> */}
        <NavList>
          <li>
            <NavLink
              to="/home"
              className={`nav-link ${
                location.pathname === "/home" ? "active" : ""
              }`}
            >
              <SocialSVG
                id={
                  location.pathname === "/home" ? "icon-home-fill" : "icon-home"
                }
              />
              <StyledNavText>홈</StyledNavText>
            </NavLink>
          </li>
          <li>
            <HeaderRightBtn
              type="button"
              aria-label="검색페이지 이동 버튼"
              onClick={handleClick}
            >
              <SocialSVG id="icon-search" />
              <StyledNavText>검색</StyledNavText>
            </HeaderRightBtn>
          </li>
          <li>
            <NavLink
              to="/chat"
              className={`nav-link ${
                location.pathname === "/chat" ? "active" : ""
              }`}
            >
              <SocialSVG
                id="icon-message-circle"
                color={location.pathname === "/chat" ? "#286140" : "white"}
                strokeColor={
                  location.pathname === "/chat" ? "#286140" : undefined
                }
              />
              <StyledNavText>채팅</StyledNavText>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/makepost"
              className={`nav-link ${
                location.pathname === "/makepost" ? "active" : ""
              }`}
            >
              <SocialSVG id="icon-edit" />
              <StyledNavText>게시물 작성</StyledNavText>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myprofile"
              className={`nav-link ${
                location.pathname === "/myprofile" ? "active" : ""
              }`}
            >
              <SocialSVG
                id="icon-user"
                color={location.pathname === "/myprofile" ? "#286140" : "white"}
                strokeColor={
                  location.pathname === "/myprofile" ? "#286140" : undefined
                }
              />
              <StyledNavText>프로필</StyledNavText>
            </NavLink>
          </li>
          <li>
            <HeaderRightBtn
              type="button"
              // onClick={modalOpen}
              aria-label="더보기 버튼"
            >
              <img src={MorePc} alt="더보기 햄버거 아이콘" />
              <span> 더보기</span>
            </HeaderRightBtn>
          </li>
        </NavList>
      </NavWrapper>

      <SearchBar open={showSearch}>
        <HeaderSearchInp
          type="text"
          placeholder="계정 검색"
          value={searchKeyword}
          onChange={handleSearchKeyword}
        />
        <SearchList searchKeyword={searchKeyword} />
      </SearchBar>
    </>
  );
}
