import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";

import { LabelNick } from "src/theme/objects/Labels";
import { User } from "src/models/User";
import { KudosItem, HeadlineSticky, DateElement, IconPrint, PrintOption, PrintOptionItem, ShowMore } from "./KudosListStyled";

import * as moment from "moment";
import { host } from "src/endpoints";

export interface Props {
    context?: IContext;
}

interface State {
    pageCounter: number;
}

class KudosList extends React.Component<Props, State> {
    public readonly state = {
        pageCounter: 1,
    };

    public componentWillMount() {
        if (this.props.context) {
            this.props.context.fetchKudos();
        }
    }

    public render() {
        return (
            <>
                <HeadlineSticky>
                    Activity stream
                    <IconPrint>
                        <PrintOption>
                            <PrintOptionItem onClick={() => this.print("week")}>Print last week</PrintOptionItem>
                            <PrintOptionItem onClick={() => this.print("month")}>Print last month</PrintOptionItem>
                        </PrintOption>
                    </IconPrint>
                </HeadlineSticky>
                {this.renderKudos()}
                <ShowMore
                    revers={true}
                    centered={true}
                    hide={!(!!this.props.context && !!this.props.context.kudos && this.props.context.kudos.kudosList.length > 0)}
                    onClick={this.showMore}>
                    Show more
                </ShowMore>
            </>
        );
    }

    private print = (range: string) => {
        if (this.props.context) {
            if (this.props.context) {
                this.props.context.setSpinner(true);
            }
            this.props.context.createPdf(range).then(json => {
                if (this.props.context) {
                    this.props.context.setSpinner(false);
                }
                window.open(host + json.pdf_url);
            });
        }
    };

    private showMore = () => {
        this.setState({ pageCounter: this.state.pageCounter = this.state.pageCounter + 1 });
        if (this.props.context) {
            this.props.context.fetchKudos(this.state.pageCounter);
        }
    };

    private renderKudos = (): JSX.Element[] | null => {
        return this.props.context && this.props.context.kudos
            ? this.props.context.kudos.kudosList.map(k => {
                  return (
                      <KudosItem key={Math.random()}>
                          <DateElement>{moment(k.timestamp).fromNow()}</DateElement>
                          {this.renderUsers(k.users)}
                          {k.description}
                      </KudosItem>
                  );
              })
            : null;
    };

    private renderUsers = (users: User[]) => {
        return users.map(u => {
            return <LabelNick key={Math.random()}>{u.nick}</LabelNick>;
        });
    };
}

export const KudosListComponent = wrapperComponent(KudosList);
