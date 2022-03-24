import { Switch, Route } from "react-router-dom";

// Allows wrapped components to only be rendered if a user is signed in
// import {
//   AuthenticatedTemplate,
//   UnauthenticatedTemplate,
// } from "@azure/msal-react";

import Home from "pages/Home";
import Landing from "pages/Landing";
import ProblemSet from "pages/ProblemSet";
import ViewSets from "pages/ViewSets";
import Error from "pages/Error";

import Layout from "components/Layout";
import { AuthRequired } from "auth/components/AuthRequired";

import DemoLayout from "components/DemoLayout";

export const App = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/MECH50010">
          <Layout>
            <AuthRequired>
              <Home />
            </AuthRequired>
          </Layout>
        </Route>

        <Route exact path="/set">
          <Layout>
            <AuthRequired>
              <ViewSets />
            </AuthRequired>
          </Layout>
        </Route>

        <Route
          exact
          path="/set/:setId"
          render={({ match }) => {
            if (
              match.params.setId === "Reference" ||
              match.params.setId === "Demo"
            ) {
              return (
                <DemoLayout>
                  <ProblemSet />
                </DemoLayout>
              );
            } else {
              return (
                <Layout>
                  <AuthRequired>
                    <ProblemSet />
                  </AuthRequired>
                </Layout>
              );
            }
          }}
        />

        <Route exact path="/">
          <Landing />
        </Route>

        <Route component={Error} />
      </Switch>
    </main>
  );
};
