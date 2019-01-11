import styled from "..";

interface IButton {
    big?: boolean;
    revers?: boolean;
    centered?: boolean;
}

const Button = styled<IButton, "button">("button")`
    color: ${props => props.revers ? props.theme.colors.colorPrimary() : props.theme.colors.colorWhite()};
    border: 1px solid ${props => props.revers ? props.theme.colors.colorPrimary() : "transparent"};
    background-color: ${props => props.revers ? "transparent" : props.theme.colors.colorPrimary()};
    font-family: ${props => props.theme.fonts.fontFamilyDefault};
    font-weight: ${props => props.theme.fonts.fontBold};
    padding: ${props => props.theme.spacing.defaultSpacing(0.3) + " " + props.theme.spacing.defaultSpacing(2)};
    border-radius: ${props => props.theme.radius.defaultRadius};
    font-size: ${props => props.theme.fonts.sizeBase}; 
    outline: 0;
    transition: ${props => props.theme.transitions.transitionDefault};
    display: flex;
    align-items: center;
    line-height: 1;
    justify-content: center;
    height: fit-content;
    text-transform: uppercase;
    min-height: ${props => props.theme.spacing.defaultSpacing(4)};
    width: ${props => (props.big ? "100%" : "unset")};
    cursor: pointer;
    opacity: 0.8;
    ${props => props.centered ? "margin: 0 auto;" : null}

    &:hover {
        opacity: 1;
    }
`;

export { Button };
