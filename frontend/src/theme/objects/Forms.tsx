import styled from "..";
import { hoverOpacity, placeholder } from "../tools/utils";

import ArrowSvg from "../../assets/images/arrow.svg";

interface Select {
    placeholderStyle?: boolean;
}

const Form = styled.form`
    background-image: url(${props => props.theme.paths.imagePath("logo.svg")});
`;

const WrapperInput = styled.div`
    position: relative;
`;

const Input = styled.input`
    border: 1px solid ${props => props.theme.colors.colorGrayLight()};
    border-radius: ${props => props.theme.radius.defaultRadius};
    padding: ${props => props.theme.spacing.defaultSpacing(1)};
    color: ${props => props.theme.colors.colorGray()};
    outline: 0;
    transition: ${props => props.theme.transitions.transitionDefault};
    color: ${props => props.theme.colors.colorGray()};
    width: 100%;
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(1)};
    font-family: ${props => props.theme.fonts.fontFamilyDefault};
    font-weight: ${props => props.theme.fonts.fontLight};
    font-size: ${props => props.theme.fonts.sizeBase};
    height: ${props => props.theme.spacing.defaultSpacing(4)};
    ${props => placeholder(props.theme.colors.colorGray(0.5), props.theme.fonts.fontLight, props.theme.fonts.fontFamilyDefault, props.theme.fonts.sizeBase)};

    &:focus {
        border-color: ${props => props.theme.colors.colorPrimary()};
    }
`;

const TextArea = styled(Input.withComponent("textarea"))`
    min-height: ${props => props.theme.spacing.defaultSpacing(13)};
    margin-bottom: unset;
`;

const WrapperSelect = styled(Input.withComponent("div"))`
    ${props => {
        const { spacing, fonts } = props.theme;
        return `
            ${hoverOpacity}
            position: relative;
            padding: 0;
            display: inline-flex;
            align-items: center;
            cursor: pointer;

            &:after {
                content: "";
                background-image: url(${ArrowSvg});
                background-repeat: no-repeat;
                position: relative;
                right: ${spacing.defaultSpacing(1.4)};
                width: ${spacing.defaultSpacing()};
                height: ${spacing.defaultSpacing(1.3)};
                transform: rotate(90deg);
                display: inline-block;
                z-index: 0;
            }

            & > select {
                    background: none;
                    border: 0;
                    color: inherit;
                    outline: inherit;
                    appearance: none;
                    padding-left: ${spacing.defaultSpacing(1)};
                    padding-right: ${spacing.defaultSpacing(3)};
                    cursor: pointer;
                    position: relative;
                    z-index: 1;
                    font-family: inherit;
                    width: 100%;
                    height: 100%;
                    font-weight: ${fonts.fontLight};
                }
        `;
    }};
`;

const Select = styled<Select, "select">("select")`
    ${props => {
        if (props.placeholderStyle) {
            return `
                color: ${props.theme.colors.colorGray()};
                font-style: italic;
                font-weight: ${props.theme.fonts.fontLight};
                font-family: ${props.theme.fonts.fontFamilyDefault};
                font-size: ${props.theme.fonts.h3}`;
        } else {
            return null;
        }
    }};
`;

export { Form, TextArea, WrapperSelect, Select, WrapperInput };
