import styled from "./theme";
import { H2 } from "./theme/elements/Headings";

interface IColumn {
    isKudosList?: boolean;
}

export const Headline = styled(H2)`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(6)};
`;

export const Wrapper = styled.div`
    display: flex;
    font-family: ${props => props.theme.fonts.fontFamilyDefault};
    color: ${props => props.theme.colors.colorBlack()};
    line-height: ${props => props.theme.fonts.lineHeight};
    padding-left: ${props => props.theme.spacing.defaultSpacing(10)};
    flex: 1;
    max-height: 100vh;
    position: relative;
`;

export const Column = styled<IColumn, "div">("div")`
    flex: 1;
    margin-right: ${props => props.theme.spacing.defaultSpacing(10)};
    margin-top: ${props => (!props.isKudosList ? props.theme.spacing.defaultSpacing(10) : null)};
    background-color: ${props => (props.isKudosList ? props.theme.colors.colorGrayLight() : null)};
    padding-left: ${props => (props.isKudosList ? props.theme.spacing.defaultSpacing(5) : null)};
    padding-right: ${props => (props.isKudosList ? props.theme.spacing.defaultSpacing(5) : null)};
    padding-bottom: ${props => props.theme.spacing.defaultSpacing(10)};

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
`;
