import { parse, parseArray } from "sparkson";

import * as React from "react";
import { endpoints } from "../endpoints";
import { http } from "../services/http";
import { User } from "../models/User";
import { KudosList } from "src/models/KudosList";

export interface IContext {
    kudos: KudosList | null;
    users: User[];
    fetchKudos: (page?: number) => void;
    fetchUsers: () => void;
}

export const { Consumer, Provider } = React.createContext<IContext | null>(null);

class ProviderContextComponent extends React.Component<{}, IContext> {
    public readonly state = {
        kudos: null,
        users: [],
        fetchKudos: (page = 1) => this.fetchKudos(page),
        fetchUsers: () => this.fetchUsers(),
    };

    public render() {
        return (
            <>
                <Provider value={this.state}>{this.props.children}</Provider>
            </>
        );
    }

    private fetchKudos = (page: number) => http(endpoints.kudos(page)).then(json => this.setState({ kudos: parse(KudosList, json) }));
    private fetchUsers = () => http(endpoints.users).then(json => (json ? this.setState({ users: parseArray(User, json.users) }) : null));
}

export default ProviderContextComponent;
