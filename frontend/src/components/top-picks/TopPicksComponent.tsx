import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { WrapperUser, UserName, KudosNumber, Description, Headline, Wrapper } from "./topPicksStyled";


export interface Props {
    context?: IContext;
}

class TopPicks extends React.Component<Props> {
    public componentWillMount() {
        if (this.props.context) {
            this.props.context.fetchUsers();
        }
    }

    public render() {
        return (
            <Wrapper>
                <Headline>Top pics</Headline>
                <Description>Most kudos last month gathered:</Description>
                {this.renderTopPicks()}
            </Wrapper>
        );
    }

    private renderTopPicks = () => {
        if (!this.props.context) {
            return;
        }
        return this.props.context.users.sort((a, b) => b.kudosNumber - a.kudosNumber).slice(0, 3).map(u => {
            return (
                <WrapperUser key={u.id}>
                    <UserName>
                        {u.firstName} {u.lastName}
                    </UserName>
                    <KudosNumber><KudosNumber>{u.kudosNumber}</KudosNumber> kudos</KudosNumber>
                </WrapperUser>
            );
        });
    };
}

export const TopPicksComponent = wrapperComponent(TopPicks);
