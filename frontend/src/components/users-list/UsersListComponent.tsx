import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { User } from '../../models/User';

export interface Props {
    context?: IContext;
}

class UsersList extends React.Component<Props> {
    public componentWillMount() {
        if (this.props.context) {
            this.props.context.fetchUsers();
        }
    }

    public render() {
        const usersList =
            this.props.context && this.props.context.users
                ? this.props.context.users.map((u: User) => {
                      return <div key={Math.random()}>{u.displayName}</div>;
                  })
                : null;

        return <>Users: {usersList}</>;
    }
}

export const UsersListComponent = wrapperComponent(UsersList);
