import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { SpinnerElement } from "src/theme/objects/SpinnerElement";

export interface Props {
    context?: IContext;
}

class Spinner extends React.Component<Props, {}> {
    public render() {
        if (!this.props.context) {
            return;
        }
        return <SpinnerElement show={this.props.context.showSpinner} />;
    }
}

export const SpinnerComponent = wrapperComponent(Spinner);
