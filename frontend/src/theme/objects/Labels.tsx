import styled from "..";

const LabelNick = styled.span`
    padding: 2px;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    border-radius: ${props => props.theme.radius.defaultRadius};
    margin-right: ${props => props.theme.spacing.defaultSpacing(0.5)};
    min-height: 18px;
    background-color: ${props => props.theme.colors.colorInfo(0.2)};
    color: ${props => props.theme.colors.colorPrimary()};
    font-size: ${props => props.theme.fonts.sizeBase};
    border-radius: ${props => props.theme.radius.defaultRadius};
    position: relative;

    &:before {
        content: "@"
    }
`;

export { LabelNick };
