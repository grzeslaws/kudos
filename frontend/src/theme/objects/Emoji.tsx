import { css } from "..";
import { colors } from "../settings/settings-project";
import IconSmileySvg from "src/assets/images/icon-smiley.svg";
import IconSmileyHoveredSvg from "src/assets/images/icon-smiley-hovered.svg";

export default css`
    .draftJsEmojiPlugin__emojiSelect__34S1B {
        display: inline-block;
        position: absolute;
        right: 54px;
        bottom: 5px;
    }

    .draftJsEmojiPlugin__emojiSelectButton__3sPol,
    .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu {
        width: 16px;
        height: 16px;
        cursor: pointer;
        border: 0;
        position: relative;
        outline: 0;
    }

    .draftJsEmojiPlugin__emojiSelectButton__3sPol:before {
        content: "";
        display: block;
        background-image: url(${IconSmileySvg});
        width: 16px;
        height: 16px;
        position: absolute;
        left: 0;
        top: 0;
    }

    .draftJsEmojiPlugin__emojiSelectButton__3sPol:hover:before,
    .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu:before {
        background-image: url(${IconSmileyHoveredSvg});
        content: "";
        display: block;
        width: 16px;
        height: 16px;
        position: absolute;
        left: 0;
        top: 0;
    }

    .draftJsEmojiPlugin__emojiSelectButton__3sPol:focus,
    .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu:focus {
        outline: 0;
        /* reset for :focus */
    }

    .draftJsEmojiPlugin__emojiSelectPopover__1J1s0 {
        padding: 0 0.3em;
        position: absolute;
        z-index: 1000;
        box-sizing: content-box;
        background: ${colors.colorGrayLight()};
    }

    .draftJsEmojiPlugin__emojiSelectPopoverClosed__3Kxxq {
        display: none;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverTitle__3tpXz {
        margin: 0 0 0.3em;
        padding-left: 1em;
        height: 2.5em;
        line-height: 2.5em;
        font-weight: normal;
        font-size: 1em;
        color: #9e9e9e;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m {
        margin: 0 0 0.3em;
        position: relative;
        z-index: 0;
        width: 21em;
        height: 20em;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverGroup__3zwcE {
        padding: 0 0.5em;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverGroup__3zwcE:first-child .draftJsEmojiPlugin__emojiSelectPopoverGroupTitle__2pC51 {
        display: none;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverGroupTitle__2pC51 {
        margin: 1em 0;
        padding-left: 0.5em;
        font-weight: normal;
        font-size: 1em;
        color: #9e9e9e;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverGroupList__HQ8_y {
        margin: 0;
        padding: 0;
        display: -webkit-box;
        display: flex;
        list-style: none;
        flex-wrap: wrap;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverGroupItem__2pFOS {
        width: 2.5em;
        height: 2.5em;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverToneSelect__28bny {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverToneSelectList__haFSJ {
        margin: 0.3em;
        padding: 0.3em;
        position: absolute;
        display: -webkit-box;
        display: flex;
        list-style: none;
        border: 1px solid #e0e0e0;
        border-radius: 0.5em;
        background: #fff;
        box-shadow: 0 0 0.3em rgba(0, 0, 0, 0.1);
    }

    .draftJsEmojiPlugin__emojiSelectPopoverToneSelectItem__2SgvL {
        width: 2.5em;
        height: 2.5em;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverToneSelectItem__2SgvL:first-child {
        border-right: 1px solid #e0e0e0;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverEntry__1ErDJ,
    .draftJsEmojiPlugin__emojiSelectPopoverEntryFocused__M28XS {
        padding: 0;
        width: 100%;
        height: 100%;
        background: none;
        border: none;
        outline: none;
        transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
    }

    .draftJsEmojiPlugin__emojiSelectPopoverEntryFocused__M28XS {
        background-color: #efefef;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverEntryIcon__1yNaC {
        width: 1.5em;
        height: 1.5em;
        vertical-align: middle;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverNav__1Nzd7 {
        margin: 0;
        padding: 0 0.5em;
        display: -webkit-box;
        display: flex;
        width: 20em;
        list-style: none;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverNavItem__qydCX {
        width: 2.5em;
        height: 2.5em;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverNavEntry__1OiGB,
    .draftJsEmojiPlugin__emojiSelectPopoverNavEntryActive__2j-Vk {
        padding: 0;
        width: 100%;
        height: 100%;
        font-size: 1.2em;
        color: #bdbdbd;
        background: none;
        border: none;
        outline: none;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverNavEntryActive__2j-Vk {
        color: #42a5f5;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6 {
        position: absolute;
        right: 0;
        top: 0.3em;
        bottom: 0.3em;
        width: 0.25em;
        background-color: #e0e0e0;
        border-radius: 0.125em;
        opacity: 0.1;
        transition: opacity 0.4s;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverScrollbarThumb__jGYdG {
        background-color: #000;
        border-radius: 0.125em;
        cursor: pointer;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m:hover .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6 {
        opacity: 0.3;
    }

    .draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6:hover,
    .draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6:active {
        opacity: 0.6;
    }
    .draftJsEmojiPlugin__emoji__2oqBk {
        background-position: center;
        /* make sure the background the image is only shown once */
        background-repeat: no-repeat;
        background-size: contain;
        /* move it a bit further down to align it nicer with the text */
        vertical-align: middle;

        /*
  We need to limit the emoji width because it can be multiple characters
  long if it is a 32bit unicode. Since the proper width depends on the font and
  it's relationship between 0 and other characters it's not ideal. 1.95ch is not
  the best value, but hopefully a good enough approximation for most fonts.
  */
        display: inline-block;
        overflow: hidden;
        max-width: 1.95ch;
        /*
  Needed for iOS rendering to avoid some icons using a lot of height without
  actually needing it.
  */
        max-height: 1em;
        line-height: inherit;
        margin: -0.2ex 0em 0.2ex;
        /*
  In the past we used opacity: 0 to hide the original Emoji icon no matter what
  system it is. Recently we switched to color: transparent since it started to
  work in recent iOS version.
  */
        color: transparent;

        /*
  Some SVG files (say 2764 for :heart:) don't have default width/height, thus
  may not be rendered properly on some platforms/browsers (e.g., Windows 10 +
  Chrome 61).
  */
        min-width: 1em;
    }
    .draftJsEmojiPlugin__emojiSuggestionsEntry__2-2p_ {
        padding: 5px 10px 1px 10px;
        transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
        display: flex;
        align-items: baseline;
    }

    .draftJsEmojiPlugin__emojiSuggestionsEntry__2-2p_:active {
        background-color: #cce7ff;
    }

    .draftJsEmojiPlugin__emojiSuggestionsEntryFocused__XDntY {
        background-color: ${colors.colorGray(0.2)};
    }

    .draftJsEmojiPlugin__emojiSuggestionsEntryText__2sPjk {
        display: inline-block;
        margin-left: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 368px;
        font-size: 0.9em;
    }

    .draftJsEmojiPlugin__emojiSuggestionsEntryIcon__1qC2V {
        width: 1em;
        height: 1em;
        margin-left: 0.25em;
        margin-right: 0.25em;
        display: inline-block;
    }
    .draftJsEmojiPlugin__emojiSuggestions__2ffcV {
        margin-top: 24px;
        position: absolute;
        min-width: 220px;
        max-width: 440px;
        background: ${colors.colorGrayLight()};
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
    }
`;
