import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./components/Homepage/HomePage";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post";
import Signup from "./components/Signup/Signup";
import Editor from "./components/Editor/Editor";
import Profile from "./components/Profile/Profile";
import DraftList from "./components/AllContent/DraftList";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/post/:post_id" component={Post} />
        <ProtectedRoute exact path="/new-story" component={Editor} />
        {/* <Route exact path="/new-story" component={Editor} /> */}
        <Route exact path="/new-story/:post_id" component={Editor} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/profile" component={Profile} />

        <Route exact path="/drafts/:user_id" component={DraftList} />
      </Switch>
    </Router>
  );
}

export default App;
