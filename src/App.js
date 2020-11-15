import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./components/Homepage/HomePage";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post";
import Signup from "./components/Signup/Signup";
import Editor from "./components/Editor/Editor";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/new-story" component={Editor} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
