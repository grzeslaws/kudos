import styled from "..";

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

const ButtonPure = styled.a`
    ${props => baseStyfeForButton(props)}
    
    color: ${props => props.theme.colors.colorPrimary()};
`;

export { Button, ButtonPure };
