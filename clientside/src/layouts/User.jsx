import React from "react";
import {Route, Switch, Redirect } from "react-router-dom";
// core components
import UserNavBar from "components/Navbars/UserNavbar"
import routes from "routes.js";

const User = () => {
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
          if (prop.layout === "/user") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
    };
    return(
        <>
        <UserNavBar />
        {/* Page content */}
        <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/user/index" />
        </Switch>
        </>
    )
}
export default User;