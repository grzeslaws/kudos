import styled from "../../theme";

export const KudosItem = styled.div`
    font-size: ${props => props.theme.fonts.sizeBase};
    font-weight: ${props => props.theme.fonts.fontLight};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing()};
    line-height: ${props => props.theme.fonts.lineHeightSmall};
`;
