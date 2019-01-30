import styled from "..";
import LogosSvg from "-!svg-react-loader?name=Icon!src/assets/images/logos.svg";

const Logos = styled(LogosSvg)`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(4)};
`;

export { Logos };
