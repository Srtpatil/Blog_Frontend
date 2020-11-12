import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./components/Homepage/HomePage";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
