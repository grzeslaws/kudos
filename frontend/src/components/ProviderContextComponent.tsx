import { parse, parseArray } from "sparkson";

import * as React from "react";
import { endpoints } from "../endpoints";
import { http } from "../services/http";
import { User } from "../models/User";
import { KudosList } from "src/models/KudosList";
import { Message } from "src/models/Message";

export interface IContext {
    kudos: KudosList | null;
    users: User[];
    profile: User | null;
    topPicks: User[];
    showSpinner: boolean;
    authInProgress: boolean;
    messages: Message[];
    fetchKudos: (page?: number) => void;
    fetchUsers: () => void;
    fetchTopPicks: () => void;
    fetchProfile: () => void;
    createPdf: (range: string) => Promise<{ pdf_url: string }>;
    setSpinner: (setting: boolean) => void;
    addMessage: (message: Message) => void;
    removeMessage: (message: Message) => void;
}

export const { Consumer, Provider } = React.createContext<IContext | null>(null);

class ProviderContextComponent extends React.Component<{}, IContext> {
    public readonly state = {
        kudos: null,
        users: [],
        profile: null,
        topPicks: [],
        showSpinner: false,
        authInProgress: true,
        messages: [],
        fetchKudos: (page = 1) => this.fetchKudos(page),
        createPdf: (range = "week") => this.createPdf(range),
        fetchUsers: () => this.fetchUsers(),
        fetchTopPicks: () => this.fetchTopPicks(),
        fetchProfile: () => this.fetchProfile(),
        setSpinner: (setting: boolean) => this.setSpiner(setting),
        addMessage: (message: Message) => this.addMessage(message),
        removeMessage: (message: Message) => this.removeMessage(message),
    };

    public render() {
        console.log(this.state);
        return (
            <>
                <Provider value={this.state}>{this.props.children}</Provider>
            </>
        );
    }
    private setSpiner = (setting: boolean) => this.setState({ showSpinner: setting });
    private setAuthInProgress = (setting: boolean) => {
        this.setState({ authInProgress: setting });
        setting ? this.setSpiner(true) : this.setSpiner(false);
    };
    private fetchKudos = (page: number) => {
        this.setSpiner(true);
        http(endpoints.kudos(page)).then(json => {
            this.setSpiner(false);
            this.setState({ kudos: parse(KudosList, json) });
        });
    };
    private createPdf = (range: string) => http(endpoints.createPdf(range));
    private fetchUsers = () => http(endpoints.users).then(json => (json ? this.setState({ users: parseArray(User, json.users) }) : null));
    private fetchTopPicks = () => http(endpoints.topPicks).then(json => (json ? this.setState({ topPicks: parseArray(User, json.top_picks) }) : null));
    private fetchProfile = () => {
        this.setAuthInProgress(true);
        http(endpoints.profile)
            .then(json => (json ? this.setState({ profile: parse(User, json.profile), authInProgress: false }) : null))
            .catch(() => {
                this.setAuthInProgress(false);
                this.setState({ profile: null });
            });
    };
    private addMessage = (message: Message) => {
        message.id = Math.random();
        this.setState({ messages: [...this.state.messages, message] });
    };
    private removeMessage = (message: Message) => {
        this.setState({ messages: this.state.messages.filter((m: Message) => m.id !== message.id) });
    };
}

export default ProviderContextComponent;
