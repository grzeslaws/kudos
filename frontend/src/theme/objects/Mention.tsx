import { css } from "..";
import { colors, radius, spacing, fonts } from "../settings/settings-project";

export default css`
    .public-DraftEditorPlaceholder-inner {
        position: absolute;
        z-index: -1;
        color: ${colors.colorGray(0.5)};
    }
    .draftJsMentionPlugin__mention__29BEd {
        padding: 3px 5px;
        line-height: 1;
        display: inline-flex;
        align-items: center;
        border-radius: ${radius.defaultRadius};
        margin-right: ${spacing.defaultSpacing(0.5)};
        min-height: 18px;
        background-color: ${colors.colorInfo(0.2)};
        color: ${colors.colorPrimary()};
        border-radius: ${radius.defaultRadius};
        position: relative;
        cursor: pointer;
    }

    .draftJsMentionPlugin__mention__29BEd:hover,
    .draftJsMentionPlugin__mention__29BEd:focus {
        color: #677584;
        background: #edf5fd;
        outline: 0; /* reset for :focus */
    }

    .draftJsMentionPlugin__mention__29BEd:active {
        color: #222;
        background: #455261;
    }
    .draftJsMentionPlugin__mentionSuggestionsEntry__3mSwm {
        padding: 4px 6px;
        transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);

        div {
            display: flex;
            align-items: center;
            margin-right: ${spacing.defaultSpacing(0.5)}
        }
    }

    .draftJsMentionPlugin__mentionSuggestionsEntry__3mSwm:active {
        background-color: ${colors.colorInfo(0.2)};
    }

    .draftJsMentionPlugin__mentionSuggestionsEntryFocused__3LcTd {
        background-color: ${colors.colorGray(0.2)};

        div {
            display: flex;
            align-items: center;
            margin-right: ${spacing.defaultSpacing(0.5)}
        }
    }

    .draftJsMentionPlugin__mentionSuggestionsEntryText__3Jobq {
        margin-left: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 368px;
    }

    .draftJsMentionPlugin__mentionSuggestionsEntryAvatar__1xgA9 {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 12px;
    }
    .draftJsMentionPlugin__mentionSuggestions__2DWjA {
        margin-top: 0.4em;
        position: absolute;
        min-width: 220px;
        max-width: 440px;
        background: #fff;
        border-radius: 2px;
        cursor: pointer;
        z-index: 2;
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        box-sizing: border-box;
        -webkit-transform: scale(0);
        transform: scale(0);
        background-color: ${colors.colorGrayLight()};
    }

    /* additional styles */
    .mention {
        color: #4a85bb;
        text-decoration: none;
    }

    .mentionSuggestions {
        border-top: 1px solid #eee;
        background: #fff;
        border-radius: 2px;
        cursor: pointer;
        padding-top: 8px;
        padding-bottom: 8px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        transform-origin: 50% 0%;
        transform: scaleY(0);
        margin: -16px;
    }

    .mentionSuggestionsEntryContainer {
        display: table;
        width: 100%;
    }

    .mentionSuggestionsEntryContainerLeft,
    .mentionSuggestionsEntryContainerRight {
        display: table-cell;
        vertical-align: middle;
    }

    .mentionSuggestionsEntryContainerRight {
        width: 100%;
        padding-left: 8px;
    }

    .mentionSuggestionsEntry {
        padding: 7px 10px 3px 10px;
        transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
    }

    .mentionSuggestionsEntry:active {
        background-color: #cce7ff;
    }

    .mentionSuggestionsEntryFocused {
        composes: mentionSuggestionsEntry;
        background-color: #e6f3ff;
    }

    .mentionSuggestionsEntryName {
        font-weight: ${fonts.fontMedium};
        color: ${colors.colorBlack()};
    }

    .mentionSuggestionsEntryName,
    .mentionSuggestionsDisplayName {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: ${spacing.defaultSpacing(0.5)};
        font-size: ${fonts.sizeMedium};
    }

    .mentionSuggestionsEntryTitle {
        font-size: 80%;
        color: #a7a7a7;
    }

    .mentionSuggestionsEntryAvatar {
        display: block;
        width: ${spacing.defaultSpacing(2)};
        height: ${spacing.defaultSpacing(2)};
        border-radius: 50%;
        margin-right: ${spacing.defaultSpacing(0.5)};
    }
`;
