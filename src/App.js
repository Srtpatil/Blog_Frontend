import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./components/Homepage/HomePage";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/post" component={Post} />
      </Switch>
    </Router>
  );
}

export default App;
