import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { Route } from "react-router-dom";
import { routes } from "src/routes";
import { Wrapper, ProfileName, ProfileEmail, KudosNumber, Label, SingOutButton } from "./ProfileStyled";
import { ProfileImage } from "src/theme/objects/Images";

export interface Props {
    context?: IContext;
    show: boolean;
}

class Profile extends React.Component<Props> {
    public render() {
        const { image, displayName, email, kudosReceived, kudosGiven } = this.props.context!.profile!;
        return (
            <Wrapper>
                <ProfileImage path={image} />
                <ProfileName>{displayName}</ProfileName>
                <ProfileEmail>{email}</ProfileEmail>
                <Label>Kudos received</Label>
                <KudosNumber>{kudosReceived}</KudosNumber>
                <Label>Kudos given</Label>
                <KudosNumber>{kudosGiven}</KudosNumber>
                <Route
                    render={({ history }) => (
                        <SingOutButton revers={true} onClick={() => this.logout(history)}>
                            Sing out
                        </SingOutButton>
                    )}
                />
            </Wrapper>
        );
    }

    private logout = history => {
        sessionStorage.removeItem("kudosAuthToken");
        this.props.context!.fetchProfile();
        history.push(routes.login);
    };
}

export const ProfileComponent = wrapperComponent(Profile);
