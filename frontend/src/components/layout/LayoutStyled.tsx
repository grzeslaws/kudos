import styled from "../../theme";
import { H2 } from "../../theme/elements/Headings";
import { media } from "../../theme/tools/utils";
import photos from "src/assets/images/photos.jpg";

interface IColumn {
    width: "1" | "2" | "3" | "4";
    sticky?: boolean;
}

export const Headline = styled(H2)`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(6)};
`;

export const WrapperColumns = styled.div`
    display: flex;
    padding: ${props => props.theme.spacing.defaultSpacing(5)};
    background-color: ${props => props.theme.colors.colorGrayLight()};

    ${props => media(props).desktop`
        flex-direction: column;
        max-height: unset;
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

    ${props => media(props).desktop`
        position: unset;
    `}
`;

export const Navbar = styled.div`
    height: ${props => props.theme.spacing.defaultSpacing(6)};
    position: fixed;
    width: 100%;
    top: 0;
    background-color: ${props => props.theme.colors.colorWhite()};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 3;
    padding-left: ${props => props.theme.spacing.defaultSpacing(5)};
    padding-right: ${props => props.theme.spacing.defaultSpacing(5)};

    ${props => media(props).desktop`
        padding-left: 20px;
        padding-right: 20px;
    `}
`;

export const WrapperFull = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    position: relative;
    z-index: 2;
    margin-left: ${props => props.theme.spacing.defaultSpacing(5)};
    margin-right: ${props => props.theme.spacing.defaultSpacing(5)};
    position: relative;

    ${props => media(props).desktop`
        margin: 20px;
    `}
`;

export const Column = styled<IColumn, "div">("div")`
    flex: ${props => props.width};
    margin-top: ${props => props.theme.spacing.defaultSpacing(5)};
    padding-right: ${props => props.theme.spacing.defaultSpacing(5)};
    padding-bottom: ${props => props.theme.spacing.defaultSpacing(10)};
    ${props => (props.sticky ? `position: sticky; top: ${props.theme.spacing.defaultSpacing(6 + 6 + 8)}; height: 100%;` : null)}

    &:last-child {
        margin-right: unset;
        padding-right: unset;
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

    ${media().desktop`
        margin-right: unset;
        margin-top: unset;
        position: unset;
        padding-left: unset;
        padding-right: unset;
    `}
`;
