import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { http } from "../../services/http";
import { endpoints } from "../../endpoints";
import { Form, TextArea, WrapperSelect, Select, WrapperInput } from "../../theme/objects/Forms";
import { WrapperKudosNick, ErrorMessage, RemoveUser } from "./addKudosStyled";
import { Button } from "../../theme/objects/Buttons";
import { User } from "../../models/User";
import { Headline } from "src/indexStyled";
import { LabelNick } from "src/theme/objects/Labels";

export interface Props {
    context?: IContext;
}

interface State {
    kudos: string;
    currentUser: string;
    usersKudos: string[];
    usersKudosErrorMessage: boolean;
    kudosTextErrorMessage: boolean;
}

class AddKudos extends React.Component<Props, State> {
    public readonly state = {
        kudos: "",
        currentUser: "",
        usersKudos: [],
        usersKudosErrorMessage: false,
        kudosTextErrorMessage: false,
    };

    public componentWillMount() {
        if (!this.props.context) {
            return;
        }
        this.props.context.fetchUsers();
    }

    public render() {
        if (!this.props.context) {
            return;
        }

        const { users } = this.props.context;

        const usersInOptionsElement = users.map(u => {
            return (
                <option key={u.uuid} value={u.uuid}>
                    {u.displayName}, @{u.nick}
                </option>
            );
        });
        return (
            <>
                <Headline>Give kudos</Headline>
                <Form onSubmit={this.addKudos}>
                    <WrapperInput>
                        <WrapperSelect>
                            <Select onChange={this.onChangeUser} value={this.state.currentUser}>
                                <option key={0} value={0}>
                                    My kudos goes to...
                                </option>
                                {usersInOptionsElement}
                            </Select>
                        </WrapperSelect>
                        <ErrorMessage show={this.state.usersKudosErrorMessage}>Choose who are you giving kudos to</ErrorMessage>
                    </WrapperInput>
                    <WrapperKudosNick show={this.state.usersKudos.length > 0}>{this.renderAssignedUsers()}</WrapperKudosNick>
                    <WrapperInput>
                        <TextArea onChange={this.onChangeDescription} value={this.state.kudos} placeholder="What I most appreciated is..." />
                        <ErrorMessage show={this.state.kudosTextErrorMessage}>Write some kudos</ErrorMessage>
                    </WrapperInput>
                    <Button big={true}>Send Kudos</Button>
                </Form>
            </>
        );
    }

    private onChangeUser = (e: React.ChangeEvent<any>) => {
        if (e.target.value !== "0" && !this.state.usersKudos.find(u => u === e.target.value)) {
            this.setState({ currentUser: e.target.value, usersKudos: [...this.state.usersKudos, e.target.value], usersKudosErrorMessage: false });
        }
    };

    private onChangeDescription = (e: React.ChangeEvent<any>) => {
        this.setState({ kudos: e.target.value, kudosTextErrorMessage: false });
    };

    private addKudos = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (this.state.usersKudos.length < 1) {
            this.setState({ usersKudosErrorMessage: true });
        }

        if (!this.state.kudos) {
            this.setState({ kudosTextErrorMessage: true });
        }

        if (this.state.usersKudos.length < 1 || !this.state.kudos) {
            return;
        }

        if (this.props.context) {
            this.props.context.setSpinner(true);
        }

        http(endpoints.kudos(), { description: this.state.kudos, uuid: this.state.usersKudos }).then(() => {
            if (this.props.context) {
                this.props.context.fetchKudos();
                this.props.context.fetchUsers();
                this.setState({ usersKudos: [], currentUser: "0", kudos: "" });
                this.props.context.setSpinner(false);
            }
        });
    };

    private renderAssignedUsers = (): JSX.Element[] | null => {
        return this.state.usersKudos.map(u => {
            if (!this.props.context) {
                return <div key={Math.random()} />;
            }
            const assignedUser: User | undefined = this.props.context.users.find(user => u === user.uuid);
            if (assignedUser) {
                return (
                    <LabelNick key={assignedUser.uuid}>
                        {assignedUser.nick}
                        <RemoveUser onClick={() => this.removeUser(assignedUser.uuid)}>x</RemoveUser>
                    </LabelNick>
                );
            } else {
                return <div key={Math.random()} />;
            }
        });
    };

    private removeUser = (uuId: string) => this.setState({ usersKudos: this.state.usersKudos.filter(u => u !== uuId) });
}

export const AddKudosComponent = wrapperComponent(AddKudos);
