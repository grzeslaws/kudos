import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { http } from "../../services/http";
import { endpoints } from "../../endpoints";
import { Form, TextArea, WrapperSelect, Select } from "../../theme/objects/Forms";
import { WrapperKudosNick } from "./addKudosStyled";
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
}

class AddKudos extends React.Component<Props, State> {
    public readonly state = {
        kudos: "",
        currentUser: "",
        usersKudos: [],
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
                    {u.firstName} {u.lastName}, @{u.nick}
                </option>
            );
        });
        return (
            <>
                <Headline>Give kudos</Headline>
                <Form onSubmit={this.addKudos}>
                    <WrapperSelect>
                        <Select onChange={this.onChangeUser} value={this.state.currentUser}>
                            <option key={0} value={0}>
                                My kudos goes to...
                            </option>
                            {usersInOptionsElement}
                        </Select>
                    </WrapperSelect>
                    {this.state.usersKudos.length > 0 && <WrapperKudosNick>{this.renderAssignedUsers()}</WrapperKudosNick>}
                    <TextArea onChange={this.onChangeDescription} placeholder="What I most appreciated is..." />
                    <Button big={true}>Send Kudos</Button>
                </Form>
            </>
        );
    }

    private onChangeUser = (e: React.ChangeEvent<any>) => {
        if (e.target.value !== "0") {
            this.setState({ currentUser: e.target.value, usersKudos: [...this.state.usersKudos, e.target.value] });
        }
    };

    private onChangeDescription = (e: React.ChangeEvent<any>) => {
        this.setState({ kudos: e.target.value });
    };

    private addKudos = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.target.reset();
        this.setState({ usersKudos: [] });
        http(endpoints.kudos(), { description: this.state.kudos, uuid: this.state.usersKudos }).then(() => {
            if (this.props.context) {
                this.props.context.fetchKudos();
                this.props.context.fetchUsers();
            }
        });
    };

    private renderAssignedUsers = (): JSX.Element[] => {
        return this.state.usersKudos.map(u => {
            if (!this.props.context) {
                return <div key={Math.random()} />;
            }
            const assignedUser: User | undefined = this.props.context.users.find(user => u === user.uuid);
            if (assignedUser) {
                return <LabelNick key={assignedUser.uuid}>{assignedUser.nick}</LabelNick>;
            } else {
                return <div key={Math.random()} />;
            }
        });
    };
}

export const AddKudosComponent = wrapperComponent(AddKudos);
