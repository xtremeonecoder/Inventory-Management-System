import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config
import routes from "./../routes";
import auth from "./../services/auth-service";
import ProtectedRoute from "./../services/protected-route";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  // get current loggedin user
  const user = auth.getCurrentUser();

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <ProtectedRoute
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    access={route.access}
                    render={(props) => (
                      <CFade>
                        <route.component
                          {...props}
                          user={user}
                          access={route.access}
                        />
                      </CFade>
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
