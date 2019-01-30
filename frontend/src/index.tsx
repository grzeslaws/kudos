import * as React from "react";
import * as ReactDOM from "react-dom";
import ProvideContextComponent from "./components/ProviderContextComponent";
import { injectGlobal, ThemeProvider, themeProps } from "./theme";
import boxSizing from "./theme/generic/box-sizing";
import normalize from "./theme/generic/normalize";
import reset from "./theme/generic/reset";
import fonts from "./theme/settings/fonts";
import mention from "./theme/objects/Mention";
import emoji from "./theme/objects/Emoji";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { SpinnerComponent } from "./components/spinner/SpinnerComponent";
import { routes } from "./routes";
import { ProtectedComponent } from "./components/ProtectedComponent";
import { LayoutComponent } from "./components/layout/LayoutComponent";
import { LoginComponent } from "./components/login/LoginComponent";
import { boogleBtn } from "./theme/objects/Buttons";

// tslint:disable-next-line:no-unused-expression
injectGlobal`
    ${fonts}
    ${boxSizing}
    ${normalize}
    ${reset}
    ${mention}
    ${emoji}
    ${boogleBtn}

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
    <Router>
        <ProvideContextComponent>
            <ThemeProvider theme={themeProps}>
                <>
                    <SpinnerComponent />
                    <Route exact={true} path={routes.main} render={() => <Redirect to={routes.auth} />} />
                    <ProtectedComponent path={routes.auth} component={LayoutComponent} />
                    <Route exact={true} path={routes.login} component={LoginComponent} />
                </>
            </ThemeProvider>
        </ProvideContextComponent>
    </Router>,
    document.getElementById("root") as HTMLElement,
);
