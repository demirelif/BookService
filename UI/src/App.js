import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Dashboard2 from "./Dashboard2";
import Dashboard3 from "./Dashboard3";
import LoginAdmin from "./LoginAdmin";
import SearchBook from "./SearchBook"
import SearchBookAdmin from "./SearchBookAdmin";
import SearchUserAdmin from "./SearchUserAdmin";
import DashBoardAdmin1 from "./DashBoardAdmin1";
import DashBoardAdmin2 from "./DashBoardAdmin2";
import Roles from "./Roles";
import AddBook from "./AddBook";
import SeeBookInactive from "./SeeBookInactive";
import ActiveUsers from "./ActiveUsers";

export default function App(){
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login showRegisterLink/>
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/dashboard2">
                        <Dashboard2 />
                    </Route>
                    <Route path="/dashboard3">
                        <Dashboard3 />
                    </Route>
                    <Route path="/loginadmin">
                        <LoginAdmin />
                    </Route>
                    <Route path="/search">
                        <SearchBook />
                    </Route>
                    <Route path="/search-book-admin">
                        <SearchBookAdmin />
                    </Route>
                    <Route path="/search-user-admin">
                        <SearchUserAdmin />
                    </Route>
                    <Route path="/dashboard-admin-1">
                        <DashBoardAdmin1 />
                    </Route>
                    <Route path="/dashboard-admin-2">
                        <DashBoardAdmin2 />
                    </Route>
                    <Route path="/directing">
                        <Roles />
                    </Route>
                    <Route path="/addbook">
                        <AddBook/>
                    </Route>
                    <Route path="/seebookinactive">
                        <SeeBookInactive/>
                    </Route>
                    <Route path="/activeusers">
                        <ActiveUsers/>
                    </Route>
                    <Route path="*">
                        <strong> 404 | Aradiginiz sayfa bulunamadi. </strong>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}