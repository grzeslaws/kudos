import { css } from "..";

/* tslint:disable:no-unused-variable */
import { transitions } from "../settings/settings-project";
import { Interpolation } from "styled-components";

const placeholder = (color: string, fontWeight: number, fontFamily: string, fontSize = "14px") => {
    return `
    ::-webkit-input-placeholder {
        color: ${color};
        font-weight: ${fontWeight};
        font-family: ${fontFamily};
        font-size: ${fontSize};
    }
    ::-moz-placeholder {
        color: ${color};
        font-weight: ${fontWeight};
        font-family: ${fontFamily};
        font-size: ${fontSize};
    }
    :-ms-input-placeholder {
        color: ${color};
        font-weight: ${fontWeight};
        font-family: ${fontFamily};
        font-size: ${fontSize};
    }
    :-moz-placeholder {
        color: ${color};
        font-weight: ${fontWeight};
        font-family: ${fontFamily};
        font-size: ${fontSize};
    }`;
};

const hoverOpacity = () => {
    return `
        transition: ${transitions.transitionDefault};

        &:hover {
            opacity: 0.8;
        }
    `;
};

const customScrollBar = (props) => {
    return `margin-right: unset;
            overflow: auto;

            ::-webkit-scrollbar {
                width: ${props.theme.spacing.defaultSpacing(0.5)};
            }

            ::-webkit-scrollbar-track {
                background-color: transparent;
            }

            ::-webkit-scrollbar-thumb {
                background-color: ${props.theme.colors.colorGray(0.1)};
                outline: 0;
            }`;
};

export const media = {
    desktop: function desktop<P>(strings: TemplateStringsArray, ...interpolations: Array<Interpolation<P>>) {
        return css`
            @media (max-width: 1170px) {
                ${css(strings, ...interpolations)}
            }
        `;
    },

    mobile: function mobile<P>(strings: TemplateStringsArray, ...interpolations: Array<Interpolation<P>>) {
        return css`
            @media (max-width: 760px) {
                ${css(strings, ...interpolations)}
            }
        `;
    },
};

export { placeholder, hoverOpacity, customScrollBar };
