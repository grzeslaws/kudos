import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { http } from "../../services/http";
import { endpoints } from "../../endpoints";
import { WrapperInput, WrapperInputText } from "../../theme/objects/Forms";
import { ErrorMessage, Wrapper, Logos } from "./addKudosStyled";
import { SendKudosButton } from "../../theme/objects/Buttons";
import { User } from "../../models/User";
import { EditorState } from "draft-js";
import createMentionPlugin, { defaultSuggestionsFilter } from "draft-js-mention-plugin";
import Editor from "draft-js-plugins-editor";
export interface Props {
    context?: IContext;
}

export type Direction = "ArrowUp" | "ArrowDown" | "Enter" | "Escape" | null;

interface State {
    textUserKudos: string;
    descriptionKudos: string;
    usersKudos: User[];
    usersKudosErrorMessage: boolean;
    kudosTextErrorMessage: boolean;
    indexOfUser: number;
    focusedInput: boolean;
    editorState: EditorState;
    suggestions: User[];
}

class AddKudos extends React.Component<Props, State> {
    private mentionPlugin: any;
    private editor: React.RefObject<any> = React.createRef();

    public componentWillMount() {
        this.mentionPlugin = createMentionPlugin({ mentionPrefix: "@", supportWhitespace: true });
        this.props.context!.fetchUsers();
    }

    public readonly state = {
        textUserKudos: "",
        descriptionKudos: "",
        usersKudos: [new User(0, "", 0)],
        usersKudosErrorMessage: false,
        kudosTextErrorMessage: false,
        indexOfUser: 0,
        focusedInput: false,
        editorState: EditorState.createEmpty(),
        suggestions: this.props.context!.users,
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
        const plugins = [this.mentionPlugin];

        return (
            <Wrapper>
                <Logos />
                <WrapperInput>
                    <WrapperInputText focused={this.state.focusedInput}>
                        <Editor
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            ref={this.editor}
                            plugins={plugins}
                            placeholder="My kudos goes to @..."
                        />
                        <MentionSuggestions
                            onSearchChange={this.onSearchChange}
                            suggestions={this.state.suggestions}
                            onAddMention={this.onAddMention}
                            entryComponent={Entry}
                        />
                    </WrapperInputText>
                    <ErrorMessage show={this.state.usersKudosErrorMessage}>Choose who are you giving kudos to</ErrorMessage>
                    <SendKudosButton onClick={this.addKudos} />
                </WrapperInput>
            </Wrapper>
        );
    }

    public onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, this.props.context!.users),
        });
    };

    private onChange = (editorState: EditorState) => {
        this.setState({
            editorState,
        });
        if (this.editor.current && this.editor.current.editor) {
            console.log(this.editor.current ? this.editor.current.editor.editor.innerHTML : null);
        }
    };

    private onAddMention = e => {
        this.setState({ usersKudos: [...this.state.usersKudos, e], usersKudosErrorMessage: false });
    };

    private addKudos = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const text = this.state.editorState.getCurrentContent().getPlainText();

        if (this.state.usersKudos.length < 2) {
            this.setState({ usersKudosErrorMessage: true });
        }

        if (!text) {
            this.setState({ kudosTextErrorMessage: true });
        }

        if (this.state.usersKudos.length < 2 || !text) {
            return;
        }

        const payload = {
            description: this.editor.current ? this.editor.current.editor.editor.innerHTML : "",
            uuid: this.state.usersKudos.map(u => u.uuid),
        };

        http(endpoints.kudos(), payload).then(() => {
            if (this.props.context) {
                this.props.context.fetchKudos();
                this.props.context.fetchTopPicks();
                this.props.context.setSpinner(false);
                this.setState({ editorState: EditorState.createEmpty() });
            }
        });
    };
}

export const AddKudosComponent = wrapperComponent(AddKudos);
