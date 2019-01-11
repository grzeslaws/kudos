const label = props => {
    return `
        font-size: ${props.theme.fonts.small};
        color: ${props.theme.colors.colorWhite()};
        padding: ${props.theme.spacing.defaultSpacing(0.1) + " " + props.theme.spacing.defaultSpacing(0.4) + " " + props.theme.spacing.defaultSpacing(0.2)};
        border-radius: ${props.theme.radius.smallRadius};
        display: inline-flex;
    `;
};

export { label };
