import styled from "../../theme";
import GraphicSvg from "-!svg-react-loader?name=Icon!src/assets/images/be-frank.svg";
import { media } from "src/theme/tools/utils";

export const Wrapper = styled.div`
    flex: 1;
`;

export const TextDescription = styled.div`
    font-size: ${props => props.theme.fonts.h3};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(4)};
    font-weight: ${props => props.theme.fonts.fontLight};
`;

export const Graphic = styled(GraphicSvg)`
    ${media().desktop`
        width: 100%;
    `}
`;
