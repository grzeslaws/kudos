import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { Wrapper, TextDescription, Logo, Graphic } from "./descriptionStyled";

export interface Props {
    context?: IContext;
}

class Description extends React.Component<Props> {
    public render() {
        return (
            <Wrapper>
                <Logo />
                <TextDescription>
                    Tell your co-workers how much you value them any day of the year. Give positive feedback about latest success or just say thank you.<br /><br />
                    Remember,
                </TextDescription>
                <Graphic />
            </Wrapper>
        );
    }
}

export const DescriptionComponent = wrapperComponent(Description);
