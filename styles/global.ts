import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: ${(props) => props.theme.colors.textLight};
    }

    a {
        color: inherit;
        text-decoration: none;
        padding: 0;
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }
`;
export { GlobalStyle };
