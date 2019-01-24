import styled from "../../theme";
import AlertSvg from "../../assets/images/icon-alert.svg";
import ArrowErrorMessage from "../../assets/images/icon-arrow-error-message.svg";
import { customScrollBar } from 'src/theme/tools/utils';

interface IErrorMessage {
    show?: boolean;
}

interface IWrapperKudosNick {
    show?: boolean | null;
}

export const WrapperKudosNick = styled<IWrapperKudosNick, "div">("div")`
    display: ${props => (props.show ? "flex" : "none")};
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

export const RemoveUser = styled.span`
    color: ${props => props.theme.colors.colorAlert()};
    margin-left: ${props => props.theme.spacing.defaultSpacing(0.75)};
    margin-right: ${props => props.theme.spacing.defaultSpacing(0.5)};
    font-size: ${props => props.theme.fonts.sizeSmall};
    cursor: pointer;
`;

interface IWrapper {
    show?: boolean;
}

interface IUserItem {
    selected?: boolean;
}

export const WrapperUsers = styled<IWrapper, "div">("div")`
    position: absolute;
    left: 0;
    top: ${props => props.theme.spacing.defaultSpacing(4)};;
    max-height: ${props => props.theme.spacing.defaultSpacing(40)};
    background-color: ${props => props.theme.colors.colorGrayLight()};
    z-index: 1;
    width: 100%;
    display: ${props => props.show ? "block" : "none"};
    overflow: auto;

    ${props => customScrollBar(props)}
`;

export const UserItem = styled<IUserItem, "div">("div")`
    display: flex;
    font-size: ${props => props.theme.fonts.sizeBase};
    align-items: center;
    padding: 2px 12px;
    background-color: ${props => props.selected ? props.theme.colors.colorGray(0.2) : null};
    cursor: pointer;
`;

export const UserImage = styled.img`
    margin-right: ${props => props.theme.spacing.defaultSpacing()};
    border-radius: ${props => props.theme.radius.oval};
    max-width: ${props => props.theme.spacing.defaultSpacing(2)};
    max-height: ${props => props.theme.spacing.defaultSpacing(2)};
`;

export const UserNick = styled.div`
    margin-right: ${props => props.theme.spacing.defaultSpacing()};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
export const UserDisplayName = styled.div`
    font-weight: ${props => props.theme.fonts.fontLight};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
