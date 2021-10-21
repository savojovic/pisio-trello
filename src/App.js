import { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Board from "./components/Board";
import DashBoard from "./components/DashBoard";
import LogIn from "./components/LogIn";
import Navbar from "./components/NavBar";
import { InviteContext, SessionContext } from './components/SessionContext';
import './index.css'
import SignOut from './components/SignOut'


function App() {
  // const [cards, setCards] = useState([]);
  const [isLogged, setIsLogged] = useState(() => localStorage.getItem('token') ? true : false);
  const [isBoardOpen, setIsBoardOpen] = useState(false);

  return (
    <Router >
      <InviteContext.Provider value={{ isBoardOpen, setIsBoardOpen }}>
        <SessionContext.Provider value={{ isLogged, setIsLogged }}>
          <Navbar />
          <Switch>
            <Route exact path="/login">
              <LogIn />
            </Route>
            <Route exact path="/logout">
              <SignOut />
            </Route>
            <Route exact path="/">
              <DashBoard />
            </Route>
            <Route exact path="/board">
              <Board />
            </Route>
          </Switch>
        </SessionContext.Provider>
      </InviteContext.Provider>
    </Router>
  );
}
const styles = {
  container: {

  }
};
export default App;
