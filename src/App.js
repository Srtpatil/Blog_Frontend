import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./components/Homepage/HomePage";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post"
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/post" component={Post} /> */}
        <Route exact path="/signup" component={Signup}></Route>
      </Switch>
    </Router>
  );
}

export default App;
