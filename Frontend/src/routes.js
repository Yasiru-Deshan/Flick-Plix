import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/home/index";
import Movie from "./pages/movie/movie";
import Watch from "./pages/movie/watch.js";
import "./components/Footer/FooterElements";
import Favorites from "./pages/favorites/favorites";
import Browse from "./pages/Browse/Browse";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/SignUp/signup";

const getRoutes = (role, token) => {
  let routes;
  if (token && role === "admin") {
    routes = (
      <Switch>

          <Route path="/" component={Home} exact />
          <Route path="/movie/:id" component={Movie} exact />
          <Route path="/watch/:id" component={Watch} exact />
          <Route exact path="/favorites" component={Favorites} />
          <Route path="/browse" component={Browse} exact />
      
        <Redirect to="/"></Redirect>
      </Switch>
    );
  } else if (token && role === "user") {
    routes = (
      <Switch>
        
        <Route path="/movie/:id" component={Movie} exact />
        <Route path="/watch/:id" component={Watch} exact />
        <Route exact path="/favorites" component={Favorites} />
        <Route path="/browse" component={Browse} exact />
        <Redirect to="/browse"></Redirect>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Signup} />
        <Route path="/movie/:id" component={Movie} exact />
        <Route path="/watch/:id" component={Watch} exact />
        <Route exact path="/favorites" component={Favorites} />
        <Route path="/browse" component={Browse} exact />
        <Redirect to="/"></Redirect>
      </Switch>
    );
  }
  return routes;
};

export default getRoutes;