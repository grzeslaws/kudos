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
            this.props.context.fetchTopPicks();
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
        
        return this.props.context!.users
            .sort((a, b) => b.kudosReceived - a.kudosReceived)
            .filter(u => u.kudosReceived > 0)
            .slice(0, 3)
            .map(u => {
                return (
                    <WrapperUser key={u.id}>
                        <UserImage src={u.image} />
                        <WrapperUserName>
                            <UserName>{u.displayName}</UserName>
                            <KudosNumber>
                                <KudosNumber>{u.kudosReceived}</KudosNumber> kudos
                            </KudosNumber>
                        </WrapperUserName>
                    </WrapperUser>
                );
            });
    };
}

export const TopPicksComponent = wrapperComponent(TopPicks);
