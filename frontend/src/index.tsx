import * as React from "react";
import * as ReactDOM from "react-dom";
import { KudosListComponent } from "./components/kudos-list/KudosListComponent";
import { AddKudosComponent } from "./components/add-kudos/AddKudosComponent";
import { DescriptionComponent } from "./components/description/DescriptionComponent";
import ProvideContextComponent from "./components/ProviderContextComponent";
import { injectGlobal, ThemeProvider, themeProps } from "./theme";
import boxSizing from "./theme/generic/box-sizing";
import normalize from "./theme/generic/normalize";
import reset from "./theme/generic/reset";
import fonts from "./theme/settings/fonts";
import mention from "./theme/objects/Mention";
import emoji from "./theme/objects/Emoji";
import { WrapperColumns, Column, WrapperFull, Photos, WrapperMain, Navbar } from "./indexStyled";
import { TopPicksComponent } from "./components/top-picks/TopPicksComponent";
import { SpinnerComponent } from "./components/spinner/SpinnerComponent";
import { ButtonPure } from "./theme/objects/Buttons";

// tslint:disable-next-line:no-unused-expression
injectGlobal`
    ${fonts}
    ${boxSizing}
    ${normalize}
    ${reset}
    ${mention}
    ${emoji}

    html,
    body {
        height: 100%;
        margin: 0;
    }

    #root {
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }
`;

ReactDOM.render(
    <ProvideContextComponent>
        <ThemeProvider theme={themeProps}>
            <WrapperMain>
                <SpinnerComponent />
                <Navbar>
                    <ButtonPure href="#">Give kudos</ButtonPure>
                </Navbar>
                <WrapperFull>
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
        </ThemeProvider>
    </ProvideContextComponent>,
    document.getElementById("root") as HTMLElement,
);
