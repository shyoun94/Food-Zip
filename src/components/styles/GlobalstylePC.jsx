const { createGlobalStyle } = require("styled-components");
const { default: reset } = require("styled-reset");

export const GlobalStylePC = createGlobalStyle`
    ${reset}
    @font-face {
    font-family: 'SUIT-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  :root {
  font-family: 'SUIT-Regular', sans-serif;
  background-color: #2861311f;
  -ms-overflow-style: none;
}

::-webkit-scrollbar {
  display: none;
}

@media (max-width: 767px) {
  :root {
    --nav-narrow-width: 72px; /* 좁은 너비 */
    --nav-medium-width: unset; /* 중간 너비를 해제 */
    --nav-wide-width: unset; /* 넓은 너비를 해제 */
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  :root {
    --nav-narrow-width: unset; /* 좁은 너비를 해제 */
    --nav-medium-width: 244px; /* 중간 너비 */
    --nav-wide-width: unset; /* 넓은 너비를 해제 */
  }
}

@media (min-width: 1024px) {
  :root {
     --nav-narrow-width: unset; /* 좁은 너비를 해제 */
     --nav-medium-width: unset; /* 중간 너비를 해제 */
     --nav-wide-width :335px ;/* 넓은 너비 */
  }
}



  
  li{
    list-style:none;
  }
  button {
    font-family: 'SUIT-Regular', sans-serif;
    cursor: pointer;
    padding: 0;
    border: 0;
    background-color: transparent;
    color: inherit;
  }

  img {
    vertical-align: top;
  }

  a {
    color: black;
    text-decoration: none;
  }

  input {
    border: 0;
    font-family: 'SUIT-Regular';
    resize: none;
    -webkit-appearance: none;
	  -webkit-border-radius: 0;
    &:focus {
      outline: none;
    }
  }
  #root{
    width: 100vw;
    min-height: 100vh;
    background-color: #fff;
  }
  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
  .my-icon{
    margin: 20px auto 0;
    border: 4px solid;
  }
`;
