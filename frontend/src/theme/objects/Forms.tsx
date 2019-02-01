import styled from "..";

interface IWrapperInputText {
    focused?: boolean;
}

const WrapperInput = styled<IWrapperInputText, "div">("div")`
    font-weight: ${props => props.theme.fonts.fontLight};
    color: ${props => props.theme.colors.colorGray()};
    position: relative;
    border: 1px solid ${props => (props.focused ? props.theme.colors.colorPrimary() : props.theme.colors.colorGrayLight())};
    border-radius: ${props => props.theme.radius.defaultRadius};
    padding: 6px 80px 6px 8px;
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(1)};
    transition: ${props => props.theme.transitions.transitionDefault};
    text-align: left;
`;

export { WrapperInput };
