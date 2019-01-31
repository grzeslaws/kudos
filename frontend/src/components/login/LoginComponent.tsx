import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import GoogleLogin from "react-google-login";
import { http } from "src/services/http";
import { endpoints } from "src/endpoints";
import { Redirect } from "react-router-dom";
import { routes } from "src/routes";
import { Logos } from "src/theme/objects/Logos";
import { Description, Wrapper } from "./LoginStyled";
import { WrapperMain } from "src/theme/objects/Layout";
import { MessageType } from "src/models/Message";

export interface Props {
    context?: IContext;
}

class Login extends React.Component<Props> {
    public render() {
        const isAuthenticated = !!this.props.context!.profile;

        return (
            <>
                {isAuthenticated ? (
                    <Redirect to={routes.auth} />
                ) : (
                    <WrapperMain>
                        <Wrapper>
                            <Logos />
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
                                buttonText="Sign in with Google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                className="boogle-btn"
                            />
                            <Description>
                                Tell your co-workers how much you value them any day of the year. Give positive feedback about latest success or just say thank
                                you.
                            </Description>
                        </Wrapper>
                    </WrapperMain>
                )}
            </>
        );
    }

    private responseGoogle = resp => {
        http(endpoints.login, { tokenId: resp.tokenId }).then(r => {
            sessionStorage.setItem("kudosAuthToken", r.kudos_auth_token);
            this.props.context!.fetchProfile();
            if (r.message) {
                this.props.context!.addMessage({ message: r.message, type: MessageType.error, timeToHide: 3 });
            }
        });
    };
}

export const LoginComponent = wrapperComponent(Login);
