import styled from "../../theme";
import AlertSvg from "../../assets/images/icon-alert.svg";
import ArrowErrorMessage from "../../assets/images/icon-arrow-error-message.svg";
import LogosSvg from "-!svg-react-loader?name=Icon!src/assets/images/logos.svg";
// import IconSmileySvg from "-!svg-react-loader?name=Icon!src/assets/images/icon-smiley.svg";

interface IErrorMessage {
    show?: boolean;
}

export const Logos = styled(LogosSvg)`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(4)};
`;

// export const IconSmiley = styled(IconSmileySvg)`
//     margin-bottom: ${props => props.theme.spacing.defaultSpacing(4)};
// `;

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
    top: calc(100% + 4px);
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

export const Wrapper = styled.div`
    max-width: ${props => props.theme.spacing.defaultSpacing(60)};
    width: 100%;
    text-align: center;
`;
