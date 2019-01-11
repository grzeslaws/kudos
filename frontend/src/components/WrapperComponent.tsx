import * as React from "react";
import { Consumer } from './ProviderContextComponent';

export default function<P>(WrappedComponent: React.ComponentType<P>) {
    return class extends React.Component<P> {
        public render() {
            return (
                <Consumer>
                    {context => {
                        return <WrappedComponent {...this.props} context={context} />;
                    }}
                </Consumer>
            );
        }
    };
}
