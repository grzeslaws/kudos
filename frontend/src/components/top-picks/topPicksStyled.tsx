import styled from "../../theme";
import { H2 } from "src/theme/elements/Headings";

export const Wrapper = styled.div`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(5)};
    padding-top: ${props => props.theme.spacing.defaultSpacing(10)};
`;

export const WrapperUser = styled.div`
    display: flex;
    flex-direction: column;
    font-size: ${props => props.theme.fonts.sizeBase};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(0.4)};
`;

export const UserName = styled.div`
    font-weight: ${props => props.theme.fonts.fontBold};
`;

export const KudosNumber = styled.span`
    font-weight: ${props => props.theme.fonts.fontMedium};
`;

export const Description = styled.div`
    font-weight: ${props => props.theme.fonts.fontLight};
    color: ${props => props.theme.colors.colorGray()};
    font-size: ${props => props.theme.fonts.sizeBase};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(3)};
`;

export const Headline = styled(H2)`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(0.4)};
`;
