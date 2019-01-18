import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { WrapperUser, UserName, KudosNumber, Description, Headline, Wrapper, WrapperUserName, UserImage } from "./topPicksStyled";

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
        return this.props.context.users
            .sort((a, b) => b.kudosNumber - a.kudosNumber)
            .filter(u => u.kudosNumber > 0)
            .slice(0, 3)
            .map(u => {
                return (
                    <WrapperUser key={u.id}>
                        <UserImage src={u.image} />
                        <WrapperUserName>
                            <UserName>{u.displayName}</UserName>
                            <KudosNumber>
                                <KudosNumber>{u.kudosNumber}</KudosNumber> kudos
                            </KudosNumber>
                        </WrapperUserName>
                    </WrapperUser>
                );
            });
    };
}

export const TopPicksComponent = wrapperComponent(TopPicks);
