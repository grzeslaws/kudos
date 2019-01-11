import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { Headline } from "src/indexStyled";
import { LabelNick } from "src/theme/objects/Labels";
import { User } from "src/models/User";
import { KudosItem } from "./KudosListStyled";

import * as moment from "moment";
import { extendMoment } from "moment-range";

const { range } = extendMoment(moment);

export interface Props {
    context?: IContext;
}

class KudosList extends React.Component<Props> {
    public componentWillMount() {
        if (this.props.context) {
            this.props.context.fetchKudos();
        }
    }

    public render() {

        return (
            <>
                <Headline>Activity stream</Headline>
                {this.renderKudos()}
            </>
        );
    }

    private renderKudos = (): JSX.Element[] | null => {
        return this.props.context && this.props.context.kudos
            ? this.props.context.kudos.kudosList.map(k => {
                  const todayRange = range(moment().startOf("day"), moment(k.timestamp));
                  const yesterdayRange = range(
                      moment()
                          .startOf("day")
                          .subtract(1, "days"),
                      moment(k.timestamp),
                  );
                  const isToday = todayRange.contains(moment(k.timestamp));
                  const isYesterday = yesterdayRange.contains(moment(k.timestamp));

                //   let perod = "today";

                  return (
                      <KudosItem key={Math.random()}>
                          {isToday && <div>Today</div>}
                          {isYesterday && <div>Yesterday</div>}
                          {}
                          {this.renderUsers(k.users)}
                          {moment(k.timestamp).fromNow()}
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
