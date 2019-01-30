import styled, { keyframes } from "../../theme";
import { hoverOpacity } from "src/theme/tools/utils";
import { MessageType } from "src/models/Message";
import IconClose from "-!svg-react-loader?name=Icon!../../../assets/images/icon-close.svg";

interface Type {
    type?: MessageType;
    show?: boolean;
}

export const Wrapper = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
`;

const showMessage = keyframes`
    from {
        transform: translateY(-30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
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
    opacity: ${props => (props.show ? 1 : 0)};
    animation: ${showMessage} ${props => props.theme.transitions.transitionDefault};
`;

export const IconToClose = styled(IconClose)`
    ${hoverOpacity}

    fill: ${props => props.theme.colors.colorWhite()};
    position: absolute;
    right: ${props => props.theme.spacing.defaultSpacing(2.5)};
    cursor: pointer;
    width: ${props => props.theme.spacing.defaultSpacing(2)};
`;
