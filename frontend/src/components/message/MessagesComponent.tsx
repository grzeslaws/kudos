import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { Wrapper, WrapperMessage, IconToClose } from "./MessagesStyled";

export interface Props {
    context?: IContext;
}

class Messages extends React.Component<Props> {
    private static MILLIS_PER_SEC = 1000;

    public render() {
        return <Wrapper show={this.props.context!.messages.length > 0}>{this.renderMessage()}</Wrapper>;
    }

    private renderMessage = () => {
        const { messages, removeMessage } = this.props.context!;
        return messages.length > 0 ? (
            messages.map(m => {
                if (m.timeToHide) {
                    setTimeout(() => {
                        removeMessage(m);
                    }, m.timeToHide * Messages.MILLIS_PER_SEC);
                }
                return (
                    <WrapperMessage type={m.type} key={m.id}>
                        {m.message}
                        <IconToClose onClick={() => removeMessage(m)} />
                    </WrapperMessage>
                );
            })
        ) : null
    };
}

export const MessagesComponent = wrapperComponent(Messages);
