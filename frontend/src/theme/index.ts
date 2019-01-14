import * as styledComponents from "styled-components";
import * as settings from "./settings/settings-project";

const { default: styled, css, injectGlobal, keyframes, ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<settings.ThemeProps>;

export default styled;
export { css, injectGlobal, keyframes, ThemeProvider };

export const themeProps = {
    colors: settings.colors,
    spacing: settings.spacing,
    radius: settings.radius,
    fonts: settings.fonts,
    transitions: settings.transitions,
    paths: settings.paths,
    breakpoints: settings.breakpoints,
};
