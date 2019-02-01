import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { WrapperInput } from "../../theme/objects/Forms";
import { ErrorMessage, Wrapper } from "./addKudosStyled";
import { SendKudosButton } from "../../theme/objects/Buttons";
import { User } from "../../models/User";
import { EditorState, convertToRaw } from "draft-js";
import createMentionPlugin, { defaultSuggestionsFilter } from "draft-js-mention-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
import Editor from "draft-js-plugins-editor";
import { Logos } from "src/theme/objects/Logos";
import { PayloadKudos } from "src/models/PayloadKudos";
export interface Props {
    context?: IContext;
}

interface State {
    textUserKudos: string;
    descriptionKudos: string;
    usersKudosErrorMessage: boolean;
    indexOfUser: number;
    editorState: EditorState;
    suggestions: User[];
    isFocused: boolean;
}

class AddKudos extends React.Component<Props, State> {
    private mentionPlugin: any;
    private emojiPlugin: any;
    private editor: React.RefObject<any> = React.createRef();

    public componentWillMount() {
        this.mentionPlugin = createMentionPlugin({ mentionPrefix: "@", supportWhitespace: true });
        this.emojiPlugin = createEmojiPlugin({ selectButtonContent: "" });
        this.props.context!.fetchUsers();
    }

    public readonly state = {
        textUserKudos: "",
        descriptionKudos: "",
        usersKudosErrorMessage: false,
        indexOfUser: 0,
        editorState: EditorState.createEmpty(),
        suggestions: this.props.context!.users,
        isFocused: false,
    };

    public render() {
        const Entry = props => {
            const { mention, searchValue, isFocused, ...parentProps } = props;

            return (
                <div {...parentProps}>
                    <div>
                        <div className="mentionSuggestionsEntryContainerLeft">
                            <img src={mention.image} className="mentionSuggestionsEntryAvatar" role="presentation" />
                        </div>

                        <div>
                            <div className="mentionSuggestionsEntryName">@{mention.name}</div>
                            <div className="mentionSuggestionsDisplayName">{mention.displayName}</div>
                        </div>
                    </div>
                </div>
            );
        };

        const { MentionSuggestions } = this.mentionPlugin;
        const { EmojiSuggestions, EmojiSelect } = this.emojiPlugin;
        const plugins = [this.mentionPlugin, this.emojiPlugin];
        const suggestionsWithoutCurrentUser = this.state.suggestions.filter(u => u.uuid !== this.props.context!.profile!.uuid);

        return (
            <Wrapper>
                <Logos />
                <WrapperInput focused={this.state.isFocused}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        ref={this.editor}
                        plugins={plugins}
                        placeholder="My kudos goes to @..."
                        onFocus={() => this.setInputBorder(true)}
                        onBlur={() => this.setInputBorder(false)}
                    />
                    <MentionSuggestions onSearchChange={this.onSearchChange} suggestions={suggestionsWithoutCurrentUser} entryComponent={Entry} />
                    <EmojiSuggestions />
                    <EmojiSelect />
                    <ErrorMessage show={this.state.usersKudosErrorMessage}>Choose who are you giving kudos to</ErrorMessage>
                    <SendKudosButton onClick={this.addKudos} />
                </WrapperInput>
            </Wrapper>
        );
    }

    private setInputBorder = (flag: boolean) => this.setState({ isFocused: flag });

    private onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, this.props.context!.users),
        });
    };

    private onChange = (editorState: EditorState) => {
        const isTextIncludesAt =
            editorState
                .getCurrentContent()
                .getPlainText()
                .indexOf("@") !== -1;
        this.setState({ editorState });
        if (isTextIncludesAt) {
            this.setState({ usersKudosErrorMessage: false });
        }
    };

    private addKudos = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.getUsersKudos().length < 1) {
            this.setState({ usersKudosErrorMessage: true });
            return;
        }

        this.props.context!.addKudos(new PayloadKudos(this.editor.current.editor.editor.innerHTML, this.getUsersKudos()));
        this.setState({ editorState: EditorState.createEmpty() });
    };

    private getUsersKudos = () => {
        const usersArr: string[] = [];
        const entityMap = convertToRaw(this.state.editorState.getCurrentContent()).entityMap;

        Object.keys(entityMap).forEach(key => {
            if (entityMap[key].type === "mention") {
                const user: string = entityMap[key].data.mention.uuid;
                usersArr.push(user);
            }
        });

        return usersArr;
    };
}

export const AddKudosComponent = wrapperComponent(AddKudos);
