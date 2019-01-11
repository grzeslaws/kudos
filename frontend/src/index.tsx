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
import { Wrapper, Column } from "./indexStyled";
import { TopPicksComponent } from "./components/top-picks/TopPicksComponent";

// tslint:disable-next-line:no-unused-expression
injectGlobal`
    ${fonts}
    ${boxSizing}
    ${normalize}
    ${reset}

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
    <>
        <ProvideContextComponent>
            <ThemeProvider theme={themeProps}>
                <Wrapper>
                    <Column>
                        <DescriptionComponent />
                    </Column>
                    <Column>
                        <AddKudosComponent />
                    </Column>
                    <Column isKudosList={true}>
                        <TopPicksComponent />
                        <KudosListComponent />
                    </Column>
                </Wrapper>
            </ThemeProvider>
        </ProvideContextComponent>
    </>,
    document.getElementById("root") as HTMLElement,
);
