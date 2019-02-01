import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import {
    KudosItem,
    HeadlineSticky,
    DateElement,
    IconPrint,
    PrintOption,
    PrintOptionItem,
    ShowMore,
    WraperVote,
    VoteNumber,
    Vote,
    TextKudos,
    RemoveKudos,
} from "./KudosListStyled";

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
        const { kudos } = this.props.context!;

        return kudos
            ? kudos.kudosList.map(k => {
                  const hasBeenVoted = !!k.voters.find(v => v.uuid === this.props.context!.profile!.uuid);
                  return (
                      <KudosItem key={Math.random()}>
                          <DateElement>{moment(k.timestamp).fromNow()}</DateElement>
                          <TextKudos dangerouslySetInnerHTML={{ __html: k.description }} />
                          <WraperVote>
                              <VoteNumber>{k.voters.length}</VoteNumber>
                              <Vote fiilled={hasBeenVoted} onClick={() => this.vote(k.kuid)} />
                              <RemoveKudos
                                  show={this.props.context!.profile!.admin!}
                                  onClick={() => this.props.context!.removeKudos(k.kuid, this.state.pageCounter)}
                              />
                          </WraperVote>
                      </KudosItem>
                  );
              })
            : null;
    };

    private vote = (kuid: string) => this.props.context!.voteForKudos(kuid, this.props.context!.profile!.uuid, this.state.pageCounter);
}

export const KudosListComponent = wrapperComponent(KudosList);
