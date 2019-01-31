import styled from "../../theme";
import { Button } from "src/theme/objects/Buttons";
import { media } from 'src/theme/tools/utils';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${p => p.theme.colors.colorGrayLight()};
    width: 215px;
    color: ${p => p.theme.colors.colorBlack()};
    padding: 20px;
    line-height: ${p => p.theme.fonts.lineHeightSmall};
`;

export const ProfileName = styled.h3`
    font-weight: ${p => p.theme.fonts.fontLight};
    margin-top: ${p => p.theme.spacing.defaultSpacing(3)};
    margin-bottom: ${p => p.theme.spacing.defaultSpacing()};
`;

export const ProfileEmail = styled.div`
    font-size: ${p => p.theme.fonts.sizeMedium};
    color: ${p => p.theme.colors.colorGray()};
    margin-bottom: ${p => p.theme.spacing.defaultSpacing(2)};
`;

export const KudosNumber = styled.div`
    font-size: ${p => p.theme.fonts.sizeMedium};
    margin-bottom: ${p => p.theme.spacing.defaultSpacing()};
`;

export const Label = styled.div`
    font-size: ${p => p.theme.fonts.sizeMedium};
    font-weight: ${p => p.theme.fonts.fontBold};
`;

export const SingOutButton = styled(Button)`
    margin-top: ${p => p.theme.spacing.defaultSpacing()};
`;

export const WrapperPosition = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;

    ${props => media(props).desktop`
        display: none;
    `}
`;
