import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { Wrapper, TextDescription, Logo, Graphic } from "./descriptionStyled";
// import GoogleLogin from "react-google-login";
// import { http } from 'src/services/http';
// import { endpoints } from 'src/endpoints';

export interface Props {
    context?: IContext;
}

class Description extends React.Component<Props> {
    public render() {
        return (
            <Wrapper>
                <Logo />
                {/* <GoogleLogin
                    clientId="32240165267-vhti4tv1d3k1qev8glkf9sa2oblpfghs.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                /> */}
                <TextDescription>
                    Tell your co-workers how much you value them any day of the year. Give positive feedback about latest success or just say thank you.
                    <br />
                    <br />
                    Remember,
                </TextDescription>
                <Graphic />
            </Wrapper>
        );
    }

    // private responseGoogle = resp => {
    //     console.log("success: ", resp);
    //     http(endpoints.login, {tokenId: resp.tokenId})
    // }

    
}

export const DescriptionComponent = wrapperComponent(Description);
