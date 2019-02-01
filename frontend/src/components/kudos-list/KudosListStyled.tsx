import styled from "../../theme";
import { H2 } from "src/theme/elements/Headings";
import IconPrintSvg from "src/assets/images/icon-print.svg";
import IconVoteFilledSvg from "src/assets/images/icon-vote-filled.svg";
import IconVoteUnfilledSvg from "src/assets/images/icon-vote-unfilled.svg";
import { Button } from "src/theme/objects/Buttons";

interface IVote {
    fiilled: boolean;
}

interface IRemoveKudos {
    show: boolean;
}

export const KudosItem = styled.div`
    font-size: ${props => props.theme.fonts.sizeBase};
    font-weight: ${props => props.theme.fonts.fontLight};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(3)};
    line-height: ${props => props.theme.fonts.lineHeightSmall};
    position: relative;
`;

export const HeadlineSticky = styled(H2)`
    background-color: ${props => props.theme.colors.colorGrayLight()};
    padding-bottom: ${props => props.theme.spacing.defaultSpacing(2)};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(2)};
    display: flex;
`;

export const DateElement = styled.div`
    font-size: ${props => props.theme.fonts.sizeSmall};
    color: ${props => props.theme.colors.colorGray()};
    font-weight: ${props => props.theme.fonts.fontLight};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing()};
`;

export const PrintOption = styled.div`
    background-color: ${props => props.theme.colors.colorWhite(1)};
    display: none;
    position: absolute;
    z-index: 1;
    right: 0;
    top: ${props => props.theme.spacing.defaultSpacing(3)};
    font-size: ${props => props.theme.fonts.sizeMedium};
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

export const WraperVote = styled.div`
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    align-items: center;
`;

export const VoteNumber = styled.div`
    margin-right: ${p => p.theme.spacing.defaultSpacing(0.5)};
    color: ${p => p.theme.colors.colorGray()};
`;

export const Vote = styled<IVote, "div">("div")`
    position: relative;
    width: 15px;
    height: 12px;
    cursor: pointer;
    &:before {
        content: "";
        background-image: url(${p => (p.fiilled ? IconVoteFilledSvg : IconVoteUnfilledSvg)});
        background-repeat: no-repeat;
        background-size: contain;
        width: 100%;
        height: 100%;
        display: block;
    }
`;

export const TextKudos = styled.div`
    padding-right: ${p => p.theme.spacing.defaultSpacing(7)};
`;

export const RemoveKudos = styled<IRemoveKudos, "span">("span")`
    color: ${p => p.theme.colors.colorAlert()};
    display: ${p => (p.show ? "flex" : "none")};
    cursor: pointer;
    transition: ${p => p.theme.transitions.transitionDefault};
    margin-left: ${p => p.theme.spacing.defaultSpacing(2)};

    &:before {
        content: "x";
    }

    &:hover {
        opacity: 0.8;
    }
`;
