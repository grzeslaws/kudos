import styled from "../../theme";
import { hoverOpacity } from "src/theme/tools/utils";
import { MessageType } from "src/models/Message";
import IconClose from "-!svg-react-loader?name=Icon!src/assets/images/icon-close.svg";

interface Type {
    type?: MessageType;
}

interface IWrapper {
    show: boolean;
}

export const Wrapper = styled<IWrapper, "div">("div")`
    position: fixed;
    right: ${props => props.theme.spacing.defaultSpacing(3)};
    top: ${props => props.show ? props.theme.spacing.defaultSpacing(3) : props.theme.spacing.defaultSpacing(-3)};
    opacity: ${props => props.show ? "1" : "0"};
    transition: ${props => props.theme.transitions.transitionDefault};
`;

export const WrapperMessage = styled<Type, "div">("div")`
    background-color: ${p => {
        if (p.type === MessageType.succces) {
            return p.theme.colors.colorInfo();
        } else if (p.type === MessageType.error) {
            return p.theme.colors.colorAlert();
        } else {
            return p.theme.colors.colorGray();
        }
    }};
    min-height: ${props => props.theme.spacing.defaultSpacing(6)};
    color: ${props => props.theme.colors.colorWhite()};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${props => props.theme.transitions.transitionDefault};
    font-family: ${props => props.theme.fonts.fontFamilyDefault};
    font-weight: ${props => props.theme.fonts.fontLight};
    padding-right: ${props => props.theme.spacing.defaultSpacing(20)};
    padding-left: ${props => props.theme.spacing.defaultSpacing(3)};
    border-radius: ${props => props.theme.radius.defaultRadius};
`;

export const IconToClose = styled(IconClose)`
    ${hoverOpacity}

    fill: ${props => props.theme.colors.colorWhite()};
    position: absolute;
    right: ${props => props.theme.spacing.defaultSpacing(2.5)};
    cursor: pointer;
    width: ${props => props.theme.spacing.defaultSpacing(2)};
`;
