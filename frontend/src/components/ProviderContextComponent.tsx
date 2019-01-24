import { parse, parseArray } from "sparkson";

import * as React from "react";
import { endpoints } from "../endpoints";
import { http } from "../services/http";
import { User } from "../models/User";
import { KudosList } from "src/models/KudosList";

export interface IContext {
    kudos: KudosList | null;
    users: User[];
    topPicks: User[];
    showSpinner: boolean;
    fetchKudos: (page?: number) => void;
    fetchUsers: (arg: string) => void;
    fetchTopPicks: () => void;
    createPdf: (range: string) => Promise<{ pdf_url: string }>;
    setSpinner: (setting: boolean) => void;
}

export const { Consumer, Provider } = React.createContext<IContext | null>(null);

class ProviderContextComponent extends React.Component<{}, IContext> {
    public readonly state = {
        kudos: null,
        users: [],
        topPicks: [],
        showSpinner: false,
        fetchKudos: (page = 1) => this.fetchKudos(page),
        createPdf: (range = "week") => this.createPdf(range),
        fetchUsers: (arg: string) => this.fetchUsers(arg),
        fetchTopPicks: () => this.fetchTopPicks(),
        setSpinner: (setting: boolean) => this.setSpiner(setting),
    };

    public render() {
        return (
            <>
                <Provider value={this.state}>{this.props.children}</Provider>
            </>
        );
    }
    private setSpiner = (setting: boolean) => this.setState({ showSpinner: setting });

    private fetchKudos = (page: number) => {
        this.setSpiner(true);
        http(endpoints.kudos(page)).then(json => {
            this.setSpiner(false);
            this.setState({ kudos: parse(KudosList, json) });
        });
    };
    private createPdf = (range: string) => http(endpoints.createPdf(range));
    private fetchUsers = (arg: string) => http(endpoints.users(arg)).then(json => (json ? this.setState({ users: parseArray(User, json.users) }) : null));
    private fetchTopPicks = () => http(endpoints.topPicks).then(json => (json ? this.setState({ topPicks: parseArray(User, json.top_picks) }) : null));
}

export default ProviderContextComponent;
