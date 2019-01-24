import styled from "../../theme";
import { H2 } from "src/theme/elements/Headings";
import IconPrintSvg from "src/assets/images/icon-print.svg";
import { Button } from 'src/theme/objects/Buttons';

export const KudosItem = styled.div`
    font-size: ${props => props.theme.fonts.sizeBase};
    font-weight: ${props => props.theme.fonts.fontLight};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(3)};
    line-height: ${props => props.theme.fonts.lineHeightSmall};
`;

export const HeadlineSticky = styled(H2)`
    position: sticky;
    background-color: ${props => props.theme.colors.colorGrayLight()};
    margin-left: ${props => props.theme.spacing.defaultSpacing(-5)};
    margin-right: ${props => props.theme.spacing.defaultSpacing(-5)};
    padding-right: ${props => props.theme.spacing.defaultSpacing(5)};
    padding-left: ${props => props.theme.spacing.defaultSpacing(5)};
    padding-top: ${props => props.theme.spacing.defaultSpacing(3)};
    padding-bottom: ${props => props.theme.spacing.defaultSpacing(2)};
    top: 0;
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(2)};
    z-index: 1;
    display: flex;
`;

export const DateElement = styled.div`
    font-size: ${props => props.theme.fonts.sizeSmall};
    color: ${props => props.theme.colors.colorGray()};
    font-weight: ${props => props.theme.fonts.fontLight};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing()};
`;

export const PrintOption = styled.div`
    background-color: ${props => props.theme.colors.colorWhite(0.4)};
    display: none;
    position: absolute;
    right: 0;
    top: ${props => props.theme.spacing.defaultSpacing(3)};
    font-size: ${props => props.theme.fonts.sizeBase};
    font-weight: ${props => props.theme.fonts.fontLight};
    width: ${props => props.theme.spacing.defaultSpacing(19)};
    padding: ${props => props.theme.spacing.defaultSpacing() + " " + props.theme.spacing.defaultSpacing(2)};
`;

export const IconPrint = styled.div`
    cursor: pointer;
    transition: ${props => props.theme.transitions.transitionDefault};
    margin-left: auto;
    position: relative;
    &:before {
        content: "";
        background-image: url(${IconPrintSvg});
        width: ${props => props.theme.spacing.defaultSpacing(3)};
        height: ${props => props.theme.spacing.defaultSpacing(3)};
        display: block;
    }
    &:hover ${PrintOption} {
        display: block;
    }
`;

export const PrintOptionItem = styled.div`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(0.5)};
    text-align: right;
    transition: ${props => props.theme.transitions.transitionDefault};
    &:last-child {
        margin-bottom: unset;
    }
    &:hover {
        opacity: 0.8;
    }
`;

export const ShowMore = styled(Button)`
    margin-top: ${props => props.theme.spacing.defaultSpacing(4)};
`;