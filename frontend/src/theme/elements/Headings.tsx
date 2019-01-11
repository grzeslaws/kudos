import styled from "..";

const H2 = styled.h2`
    font-size: ${props => props.theme.fonts.h2};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(1.5)};
    font-weight: ${props => props.theme.fonts.fontMedium};
`;

export { H2 };
