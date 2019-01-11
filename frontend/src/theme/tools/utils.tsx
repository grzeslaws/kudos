/* tslint:disable:no-unused-variable */
import { transitions } from "../settings/settings-project";

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

export { placeholder, hoverOpacity };
