import styled from "..";

interface IButton {
    big?: boolean;
}

const Button = styled<IButton, "button">("button")`
    color: ${props => props.theme.colors.colorWhite()};
    background-color: ${props => props.theme.colors.colorPrimary(0.8)};
    font-family: ${props => props.theme.fonts.fontFamilyDefault};
    font-weight: ${props => props.theme.fonts.fontBold};
    padding: ${props => props.theme.spacing.defaultSpacing(0.3) + " " + props.theme.spacing.defaultSpacing(2)};
    border-radius: ${props => props.theme.radius.defaultRadius};
    font-size: ${props => props.theme.fonts.sizeBase}; 
    outline: 0;
    transition: ${props => props.theme.transitions.transitionDefault};
    border: none;
    display: flex;
    align-items: center;
    line-height: 1;
    justify-content: center;
    height: fit-content;
    text-transform: uppercase;
    min-height: ${props => props.theme.spacing.defaultSpacing(4)};
    width: ${props => (props.big ? "100%" : "unset")};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.colors.colorPrimary()};
    }
`;

export { Button };
