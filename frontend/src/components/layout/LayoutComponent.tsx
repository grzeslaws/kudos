import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { Navbar, WrapperFull, Photos, WrapperColumns, Column } from 'src/components/layout/LayoutStyled';
import { ButtonPure } from 'src/theme/objects/Buttons';
import { AddKudosComponent } from '../add-kudos/AddKudosComponent';
import { ProfileComponent } from '../profile/ProfileComponent';
import { DescriptionComponent } from '../description/DescriptionComponent';
import { TopPicksComponent } from '../top-picks/TopPicksComponent';
import { KudosListComponent } from '../kudos-list/KudosListComponent';
import { ProfileImage } from 'src/theme/objects/Images';
import { WrapperMain } from 'src/theme/objects/Layout';

export interface Props {
    context?: IContext;
}

class Layout extends React.Component<Props> {
    public render() {
        return (
            <WrapperMain>
                <Navbar>
                    <ButtonPure href="#">Give kudos</ButtonPure>
                    <ProfileImage small={true} path={this.props.context!.profile!.image} />
                </Navbar>
                <WrapperFull>
                    <AddKudosComponent />
                    <ProfileComponent />
                </WrapperFull>
                <Photos />
                <WrapperColumns>
                    <Column width="1" sticky={true}>
                        <DescriptionComponent />
                    </Column>
                    <Column width="1" sticky={true}>
                        <TopPicksComponent />
                    </Column>
                    <Column width="3">
                        <KudosListComponent />
                    </Column>
                </WrapperColumns>
            </WrapperMain>
        );
    }
}

export const LayoutComponent = wrapperComponent(Layout);
