import styled from "../../theme";
import AlertSvg from "../../assets/images/icon-alert.svg";
import ArrowErrorMessage from "../../assets/images/icon-arrow-error-message.svg";

interface IErrorMessage {
    show?: boolean;
}

interface IWrapperKudosNick {
    show?: boolean;
}

export const WrapperKudosNick = styled<IWrapperKudosNick, "div">("div")`
    display: ${props => (props.show ? "flex" : "none")};
    margin-top: ${props => props.theme.spacing.defaultSpacing()};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing()};
    flex-wrap: wrap;
`;

export const ErrorMessage = styled<IErrorMessage, "div">("div")`
    display: ${props => (props.show ? "flex" : "none")};
    color: ${props => props.theme.colors.colorAlert()};
    font-size: ${props => props.theme.fonts.sizeSmall};
    line-height: 1;
    align-items: center;
    font-weight: ${props => props.theme.fonts.fontLight};
    padding: ${props => props.theme.spacing.defaultSpacing()};
    background-color: ${props => props.theme.colors.colorGrayLight()};
    border: 1px solid ${props => props.theme.colors.colorGray(0.2)};
    border-radius: ${props => props.theme.radius.defaultRadius};
    position: absolute;
    left: 0;
    top: calc(100% - 2px);
    z-index: 1;

    &:before {
        content: "";
        background-image: url(${AlertSvg});
        width: 12px;
        height: 12px;
        margin-right: ${props => props.theme.spacing.defaultSpacing(0.5)};
    }

    &:after {
        content: "";
        background-image: url(${ArrowErrorMessage});
        width: 5px;
        height: 4px;
        position: absolute;
        top: -5px;
        left: 50%;
    }
`;

export const RemoveUser = styled.span`
    color: ${props => props.theme.colors.colorAlert()};
    margin-left: ${props => props.theme.spacing.defaultSpacing(0.75)};
    margin-right: ${props => props.theme.spacing.defaultSpacing(0.5)};
    font-size: ${props => props.theme.fonts.sizeSmall};
    cursor: pointer;
`;
