import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";

import { LabelNick } from "src/theme/objects/Labels";
import { User } from "src/models/User";
import { KudosItem, HeadlineSticky, DateElement, IconPrint, PrintOption, PrintOptionItem } from "./KudosListStyled";

import * as moment from "moment";
// import { extendMoment } from "moment-range";
import { Button } from "src/theme/objects/Buttons";
import { host } from "src/endpoints";
// import { endpoints } from "src/endpoints";

// const { range } = extendMoment(moment);

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
        if (this.props.context && this.props.context.urlToPdf !== "") {
            window.open(host + this.props.context.urlToPdf);
        }
        return (
            <>
                <HeadlineSticky>
                    Activity stream
                    <IconPrint>
                        <PrintOption>
                            <PrintOptionItem onClick={() => this.print(2)}>Print last week</PrintOptionItem>
                            <PrintOptionItem onClick={() => this.print(3)}>Print last month</PrintOptionItem>
                        </PrintOption>
                    </IconPrint>
                </HeadlineSticky>

                {this.renderKudos()}
                {this.props.context && this.props.context.kudos && this.props.context.kudos.kudosList.length > 0 && (
                    <Button revers={true} centered={true} onClick={this.showMore}>
                        Show more
                    </Button>
                )}
            </>
        );
    }

    private print = (timestamp: number) => {
        if (this.props.context) {
            this.props.context.createPdf(timestamp);
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
                  //   const todayRange = range(moment().startOf("day"), moment(k.timestamp));
                  //   const yesterdayRange = range(
                  //       moment()
                  //           .startOf("day")
                  //           .subtract(1, "days"),
                  //       moment(k.timestamp),
                  //   );
                  //   const isToday = todayRange.contains(moment(k.timestamp));
                  //   const isYesterday = yesterdayRange.contains(moment(k.timestamp));

                  return (
                      <KudosItem key={Math.random()}>
                          {/* {isToday && <div>Today</div>}
                          {isYesterday && <div>Yesterday</div>} */}
                          <DateElement>{moment(k.timestamp).fromNow()}</DateElement>
                          {this.renderUsers(k.users)}
                          <br />
                          {k.description}
                          <br />
                          <br />
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
