import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    background-color: #FFFFFF;
    overflow-x: hidden;
  }

  #root {
    display: flex;
    flex-direction: column;
  }
`;
