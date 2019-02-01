import { parse, parseArray } from "sparkson";

import * as React from "react";
import { endpoints } from "../endpoints";
import { http } from "../services/http";
import { User } from "../models/User";
import { KudosList } from "src/models/KudosList";
import { Message } from "src/models/Message";
import { PayloadKudos } from "src/models/PayloadKudos";

export interface IContext {
    kudos: KudosList | null;
    users: User[];
    profile: User | null;
    showSpinner: boolean;
    authInProgress: boolean;
    messages: Message[];
    fetchKudos: (page?: number) => void;
    fetchUsers: () => void;
    fetchProfile: (onAuth?: boolean) => void;
    createPdf: (range: string) => Promise<{ pdf_url: string }>;
    setSpinner: (setting: boolean) => void;
    addMessage: (message: Message) => void;
    removeMessage: (message: Message) => void;
    voteForKudos: (kuid: string, uuid: string, limit: number) => void;
    addKudos: (payload: PayloadKudos) => void;
    removeKudos: (kuid: string, limit: number) => void;
}

export const { Consumer, Provider } = React.createContext<IContext | null>(null);

class ProviderContextComponent extends React.Component<{}, IContext> {
    public readonly state = {
        kudos: null,
        users: [],
        profile: null,
        showSpinner: false,
        authInProgress: true,
        messages: [],
        fetchKudos: (page = 1) => this.fetchKudos(page),
        createPdf: (range = "week") => this.createPdf(range),
        fetchUsers: () => this.fetchUsers(),
        fetchProfile: (onAuth = true) => this.fetchProfile(onAuth),
        setSpinner: (setting: boolean) => this.setSpiner(setting),
        addMessage: (message: Message) => this.addMessage(message),
        removeMessage: (message: Message) => this.removeMessage(message),
        voteForKudos: (kuid: string, uuid: string, limit: number) => this.voteForKudos(kuid, uuid, limit),
        addKudos: (payload: PayloadKudos) => this.addKudos(payload),
        removeKudos: (kuid: string, limit: number) => this.removeKudos(kuid, limit),
    };

    public render() {
        console.group(this.state);
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
    private fetchProfile = (onAuth = true) => {
        if (onAuth) {
            this.setAuthInProgress(true);
        }
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
    private voteForKudos = (kuid: string, uuid: string, limit: number) =>
        http(endpoints.voteForKudos, { kuid, uuid }).then(() => {
            this.fetchProfile(false);
            this.fetchKudos(limit);
        });
    private removeKudos = (kuid: string, limit: number) =>
        http(endpoints.removeKudos(kuid)).then(() => {
            this.fetchProfile(false);
            this.fetchKudos(limit);
            this.fetchUsers();
        });
    private addKudos = (payload: PayloadKudos) =>
        http(endpoints.kudos(), payload).then(() => {
            this.fetchKudos(1);
            this.fetchUsers();
            this.fetchProfile(false);
        });
}

export default ProviderContextComponent;
