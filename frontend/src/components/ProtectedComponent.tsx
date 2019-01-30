import * as React from "react";
import { RouteProps } from "react-router";
import { IContext } from "./ProviderContextComponent";
import wrapperComponent from "./WrapperComponent";
import { Redirect, Route } from "react-router-dom";
import { routes } from 'src/routes';

interface Props extends RouteProps {
    context?: IContext;
}

class Protected extends React.Component<Props> {
    public componentWillMount() {

        if (!this.props.context) {
            return;
        }
        this.props.context.fetchProfile();
    }

    public render() {
        const isAuthenticated = !!this.props.context!.profile;

        if (this.props.context!.authInProgress) {
            return null;
        } else {
            return <Route render={() => this.renderComponent(this.props.component, isAuthenticated)} />;
        } 
    }

    public renderComponent = (Component, isAuthenticated: boolean) => {
        return isAuthenticated ? <Component {...this.props} /> : <Redirect to={routes.login} />;
    };
}

export const ProtectedComponent = wrapperComponent(Protected);
