import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      terciary: string;
      textLight: string;
      textDark: string;
      dimmedtextLight: string;
      dimmedTerciary: string;
      dimmedSecondary: string;
    };
  }
}
