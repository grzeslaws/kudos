import styled from "..";
import SendKudosSvg from "../../assets/images/send-kudos-button.svg";
import IconGSvg from "../../assets/images/icon-g.svg";
import { css } from "..";
import { colors, fonts, spacing } from "../settings/settings-project";

interface IButton {
    big?: boolean;
    revers?: boolean;
    centered?: boolean;
    hide?: boolean;
}

const baseStyfeForButton = props => {
    return `
        font-size: ${props.theme.fonts.sizeBase}; 
        outline: 0;
        transition: ${props.theme.transitions.transitionDefault};
        align-items: center;
        line-height: 1;
        justify-content: center;
        height: fit-content;
        text-transform: uppercase;
        min-height: ${props.theme.spacing.defaultSpacing(4)};
        cursor: pointer;
        opacity: 0.8;
        font-family: ${props.theme.fonts.fontFamilyDefault};
        font-weight: ${props.theme.fonts.fontBold};
        padding: ${props.theme.spacing.defaultSpacing(0.3) + " " + props.theme.spacing.defaultSpacing(2)};
        border: 0;
        display: flex;

        &:hover {
            opacity: 1;
        }
    `;
};

const Button = styled<IButton, "button">("button")`
    ${props => baseStyfeForButton(props)}

    color: ${props => (props.revers ? props.theme.colors.colorPrimary() : props.theme.colors.colorWhite())};
    border: 1px solid ${props => (props.revers ? props.theme.colors.colorPrimary() : "transparent")};
    background-color: ${props => (props.revers ? "transparent" : props.theme.colors.colorPrimary())};
    border-radius: ${props => props.theme.radius.defaultRadius};
    display: ${props => (!props.hide ? "flex" : "none")};
    width: ${props => (props.big ? "100%" : "unset")};
    margin-top: ${props => props.theme.spacing.defaultSpacing()};
    ${props => (props.centered ? "margin: 0 auto;" : null)}
`;

const SendKudosButton = styled.button`
    ${props => baseStyfeForButton(props)}
    background-image: url(${SendKudosSvg});
    background-repeat: no-repeat;
    height: 40px;
    width: 40px;
    position: absolute;
    right: -1px;
    bottom: -1px;
`;

const ButtonPure = styled<{ show: boolean }, "a">("a")`
    ${props => baseStyfeForButton(props)}
    transition: ${p => p.theme.transitions.transitionDefault};

    opacity: ${p => (p.show ? "0.8" : "0")};
    visibility: ${p => (p.show ? "visuble" : "hidden")};
    padding: 3px 16px 1px;
    color: ${props => props.theme.colors.colorPrimary()};
`;

const boogleBtn = css`
    .boogle-btn {
        background-color: ${colors.colorPrimary()} !important;
        display: flex !important;
        box-shadow: unset !important;
        color: ${colors.colorWhite()} !important;
        font-size: ${fonts.sizeMedium} !important;
        height: ${spacing.defaultSpacing(4)} !important;
        padding-left: ${spacing.defaultSpacing(2)} !important;
        padding-right: ${spacing.defaultSpacing(2)} !important;
        font-family: ${fonts.fontFamilyDefault} !important;
        font-family: ${fonts.fontFamilyDefault} !important;
        text-transform: uppercase;
        outline: 0;
        width: fit-content;

        &:before {
            content: "";
            background-image: url(${IconGSvg});
            background-repeat: no-repeat;
            width: 14px;
            height: 14px;
            margin-right: 6px;
        }

        & > div {
            display: none;
        }

        & > span {
            padding: unset !important;
            font-weight: ${fonts.fontBold} !important;
        }
    }
`;

export { Button, ButtonPure, SendKudosButton, boogleBtn };
