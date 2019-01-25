import styled from "./theme";
import { H2 } from "./theme/elements/Headings";
import { media } from "./theme/tools/utils";
import photos from "src/assets/images/photos.jpg";

interface IColumn {
    width: "1" | "2" | "3" | "4";
    sticky?: boolean;
}

export const WrapperMain = styled.div`
    font-family: ${props => props.theme.fonts.fontFamilyDefault};
    color: ${props => props.theme.colors.colorBlack()};
    line-height: ${props => props.theme.fonts.lineHeight};
    flex: 1;
`;

export const Headline = styled(H2)`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(6)};
`;

export const WrapperColumns = styled.div`
    display: flex;
    background-color: ${props => props.theme.colors.colorGrayLight()};

    ${media.desktop`
        flex-direction: column;
        max-height: unset;
        padding: 80px;
    `}

    ${media.mobile`
        padding: 20px;
    `}
`;

export const Photos = styled.div`
    position: sticky;
    top: ${props => props.theme.spacing.defaultSpacing(6)};
    background-image: url(${photos});
    background-size: cover;
    height: ${props => props.theme.spacing.defaultSpacing(10)};
    z-index: 1;
`;

export const Navbar = styled.div`
    height: ${props => props.theme.spacing.defaultSpacing(6)};
    position: sticky;
    top: 0;
    background-color: ${props => props.theme.colors.colorWhite()};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;
`;

export const WrapperFull = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    position: relative;
    z-index: 2;
`;

export const Column = styled<IColumn, "div">("div")`
    flex: ${props => props.width};
    margin-top: ${props => props.theme.spacing.defaultSpacing(5)};
    padding-left: ${props => props.theme.spacing.defaultSpacing(5)};
    padding-right: ${props => props.theme.spacing.defaultSpacing(5)};
    padding-bottom: ${props => props.theme.spacing.defaultSpacing(10)};
    ${props => (props.sticky ? `position: sticky; top: ${props.theme.spacing.defaultSpacing(6 + 6 + 8)}; height: 100%;` : null)}

    &:last-child {
        margin-right: unset;
        overflow: auto;

        ::-webkit-scrollbar {
            width: ${props => props.theme.spacing.defaultSpacing()};
        }

        ::-webkit-scrollbar-track {
            background-color: transparent;
        }

        ::-webkit-scrollbar-thumb {
            background-color: ${props => props.theme.colors.colorGray(0.5)};
            outline: 0;
        }
    }

    ${media.desktop`
        margin-right: unset;
        margin-top: unset;
    `}
`;
