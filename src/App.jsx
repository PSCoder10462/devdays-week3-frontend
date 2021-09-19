import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Assignment from "./components/Assignment";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Submissions from "./components/Submissions";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/submissions">
            <Submissions />
          </Route>
          <Route exact path="/">
            <div className="app__assignment">
              <Assignment />
            </div>
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
