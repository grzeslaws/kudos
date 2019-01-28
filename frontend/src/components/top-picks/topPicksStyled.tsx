import styled from "../../theme";
import { H2 } from "src/theme/elements/Headings";

export const Wrapper = styled.div`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(5)};
`;

export const WrapperUser = styled.div`
    display: flex;
    font-size: ${props => props.theme.fonts.sizeMedium};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(2)};
`;

export const UserName = styled.div`
    font-weight: ${props => props.theme.fonts.fontBold};
    line-height: 1.4;
`;

export const KudosNumber = styled.span`
    font-weight: ${props => props.theme.fonts.fontMedium};
`;

export const Description = styled.div`
    font-weight: ${props => props.theme.fonts.fontLight};
    color: ${props => props.theme.colors.colorGray()};
    font-size: ${props => props.theme.fonts.sizeMedium};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(3)};
`;

export const Headline = styled(H2)`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(0.4)};
`;

export const WrapperUserName = styled.div`
    display: flex;
    flex-direction: column;
`;

export const UserImage = styled.img`
    border-radius: ${props => props.theme.radius.oval};
    width: ${props => props.theme.spacing.defaultSpacing(4)};
    height: ${props => props.theme.spacing.defaultSpacing(4)};
    margin-right: ${props => props.theme.spacing.defaultSpacing()};
`;
