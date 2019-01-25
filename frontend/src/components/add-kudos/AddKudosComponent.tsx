import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { http } from "../../services/http";
import { endpoints } from "../../endpoints";
import { WrapperInput, WrapperInputText, InputPure, Textarea } from "../../theme/objects/Forms";
import { ErrorMessage, UserItem, UserImage, UserNick, UserDisplayName, WrapperUsers, WrapperKudosNick, RemoveUser, Wrapper, Logos } from "./addKudosStyled";
import { Button } from "../../theme/objects/Buttons";
import { User } from "../../models/User";
import { LabelNick } from "src/theme/objects/Labels";

export interface Props {
    context?: IContext;
}

export type Direction = "ArrowUp" | "ArrowDown" | "Enter" | "Escape" | null;

interface UserKudos {
    uuId: string;
    nick: string;
}

interface State {
    textUserKudos: string;
    descriptionKudos: string;
    usersKudos: UserKudos[];
    usersKudosErrorMessage: boolean;
    kudosTextErrorMessage: boolean;
    direction: Direction;
    indexOfUser: number;
    focusedInput: boolean;
}

class AddKudos extends React.Component<Props, State> {
    private static readonly SETTINGS = {
        hideDelay: 200,
    };

    public readonly state = {
        textUserKudos: "",
        descriptionKudos: "",
        usersKudos: [{ uuId: "", nick: "" }],
        usersKudosErrorMessage: false,
        kudosTextErrorMessage: false,
        direction: null,
        indexOfUser: 0,
        focusedInput: false,
    };

    public render() {
        if (!this.props.context) {
            return;
        }

        const usersList =
            this.props.context && this.props.context.users
                ? this.props.context.users.map((u: User, i: number) => {
                      return (
                          <UserItem
                              key={u.uuid}
                              selected={i === this.state.indexOfUser}
                              onClick={() => this.onClick(u.uuid)}
                              onMouseEnter={() => this.onMouseOver(i)}>
                              <UserImage src={u.image} />
                              <UserNick>@{u.nick}</UserNick>
                              <UserDisplayName>{u.displayName}</UserDisplayName>
                          </UserItem>
                      );
                  })
                : null;

        return (
            <Wrapper>
                <Logos />
                <WrapperInput>
                    <WrapperInputText focused={this.state.focusedInput} onKeyDown={this.onKeyPress}>
                        <WrapperKudosNick show={this.state.usersKudos.length > 0}>{this.renderAssignedUsers()}</WrapperKudosNick>{" "}
                        <InputPure
                            value={this.state.textUserKudos}
                            onChange={this.onChange}
                            onBlur={this.onBlur}
                            onFocus={this.onFocus}
                            placeholder="My kudos goes to @..."
                        />
                    </WrapperInputText>
                    <WrapperUsers show={this.props.context.users.length > 0}>{usersList}</WrapperUsers>
                    <ErrorMessage show={this.state.usersKudosErrorMessage}>Choose who are you giving kudos to</ErrorMessage>
                </WrapperInput>
                <WrapperInput>
                    <Textarea value={this.state.descriptionKudos} onChange={this.onChangeDescription} placeholder="What I most appreciated is..." />
                    <ErrorMessage show={this.state.kudosTextErrorMessage}>Write some kudos</ErrorMessage>
                </WrapperInput>
                <Button onClick={this.addKudos} big={true}>
                    Send Kudos
                </Button>
            </Wrapper>
        );
    }

    private onFocus = () => {
        this.setState({ focusedInput: true });
    };

    private hideUserList = () => {
        setTimeout(() => {
            if (this.props.context) {
                this.props.context.fetchUsers("");
            }
        }, AddKudos.SETTINGS.hideDelay);
        this.setState({ indexOfUser: 0 });
    };

    private onMouseOver = (index: number) => {
        this.setState({ indexOfUser: index });
    };

    private onClick = (uuId: string) => {
        this.selectUsers(uuId);
    };

    private onBlur = () => {
        this.hideUserList();
        this.setState({ focusedInput: false });
    };

    private selectUsers = (uuId: string) => {
        const isUserAdded = this.state.usersKudos.find((u: UserKudos) => u.uuId === uuId);
        if (!isUserAdded && this.props.context) {
            const selectedUser: User | undefined = this.props.context.users.find(u => u.uuid === uuId);
            if (selectedUser && selectedUser.uuid && selectedUser.nick) {
                this.setState({
                    usersKudos: [...this.state.usersKudos, { uuId: selectedUser.uuid, nick: selectedUser.nick }],
                    textUserKudos: "",
                });
            }
        }
    };

    private onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown" && this.props.context && this.props.context.users.length - 1 > this.state.indexOfUser) {
            this.setState({ indexOfUser: this.state.indexOfUser + 1 });
        } else if (e.key === "ArrowUp" && this.state.indexOfUser > 0) {
            this.setState({ indexOfUser: this.state.indexOfUser - 1 });
        } else if (e.key === "Escape" && this.props.context) {
            this.hideUserList();
        } else if (e.key === "Enter" && this.props.context) {
            this.selectUsers(this.props.context.users[this.state.indexOfUser].uuid);
            this.hideUserList();
        }
    };

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.props.context) {
            return;
        }
        this.setState({ textUserKudos: e.target.value, usersKudosErrorMessage: false });
        this.props.context.fetchUsers(e.target.value);
    };

    private onChangeDescription = (e: React.ChangeEvent<any>) => {
        this.setState({ descriptionKudos: e.target.value, kudosTextErrorMessage: false });
    };

    private addKudos = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (this.state.usersKudos.length < 2) {
            this.setState({ usersKudosErrorMessage: true });
        }

        if (!this.state.descriptionKudos) {
            this.setState({ kudosTextErrorMessage: true });
        }

        if (this.state.usersKudos.length < 2 || !this.state.descriptionKudos) {
            return;
        }

        const payload = {
            description: this.state.descriptionKudos,
            uuid: this.state.usersKudos.map(u => u.uuId),
        };

        http(endpoints.kudos(), payload).then(() => {
            if (this.props.context) {
                this.props.context.fetchKudos();
                this.setState({ usersKudos: [{ uuId: "", nick: "" }], descriptionKudos: "" });
                this.props.context.setSpinner(false);
            }
        });
    };

    private renderAssignedUsers = (): JSX.Element[] | null => {
        if (!this.props.context) {
            return null;
        }
        return this.state.usersKudos
            .filter(u => u.uuId !== "")
            .map(u => {
                return (
                    <LabelNick key={u.uuId}>
                        {u.nick}
                        <RemoveUser onClick={() => this.removeUser(u.uuId)}>x</RemoveUser>
                    </LabelNick>
                );
            });
    };

    private removeUser = (uuId: string) => this.setState({ usersKudos: this.state.usersKudos.filter(u => u.uuId !== uuId) });
}

export const AddKudosComponent = wrapperComponent(AddKudos);
