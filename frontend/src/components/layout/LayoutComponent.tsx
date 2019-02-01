import * as React from "react";
import { IContext } from "../ProviderContextComponent";
import wrapperComponent from "../WrapperComponent";
import { Navbar, WrapperFull, Photos, WrapperColumns, Column, WrapperProfile } from "src/components/layout/LayoutStyled";
import { ButtonPure } from "src/theme/objects/Buttons";
import { AddKudosComponent } from "../add-kudos/AddKudosComponent";
import { ProfileComponent } from "../profile/ProfileComponent";
import { DescriptionComponent } from "../description/DescriptionComponent";
import { TopPicksComponent } from "../top-picks/TopPicksComponent";
import { KudosListComponent } from "../kudos-list/KudosListComponent";
import { ProfileImage } from "src/theme/objects/Images";
import { WrapperMain } from "src/theme/objects/Layout";

export interface Props {
    context?: IContext;
}

class Layout extends React.Component<Props, { showAddKudosButton: boolean }> {
    public readonly state = {
        showAddKudosButton: false,
    };

    public componentDidMount() {
        const wrapperFull: HTMLElement | null = document.getElementById("wrapperFull");
        if (wrapperFull) {
            const heightOfWrapperFull = wrapperFull.getBoundingClientRect().height;
            window.addEventListener("scroll", () => {
                const show: boolean = window.scrollY + 48 > heightOfWrapperFull ? true : false;
                this.setState({ showAddKudosButton: show });
            });
        }
    }
    public render() {
        return (
            <WrapperMain>
                <Navbar>
                    <ButtonPure show={this.state.showAddKudosButton} href="#">
                        Give kudos
                    </ButtonPure>
                    <WrapperProfile>
                        <ProfileImage small={true} path={this.props.context!.profile!.image} />
                        <ProfileComponent />
                    </WrapperProfile>
                </Navbar>
                <WrapperFull id="wrapperFull">
                    <AddKudosComponent />
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
