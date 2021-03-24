import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  html, body, #__next{
    height: 100%;
  }
  body {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .nav-link.active > div {
    background-color: #ffffff;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    background: #f1f1f1; 
  }
  ::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`
export default GlobalStyles
