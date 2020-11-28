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
        <Route exact path="/" component={HomePage} />
        <Route exact path="/post/:post_id" component={Post} />
        <ProtectedRoute exact path="/new-story" component={Editor} />
        <ProtectedRoute exact path="/new-story/:post_id" component={Editor} />
        <ProtectedRoute exact path="/login" component={Login} />
        <ProtectedRoute exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/drafts/:user_id" component={DraftList} />
      </Switch>
    </Router>
  );
}

export default App;
