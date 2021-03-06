import './App.css';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import ConcertDetail from './components/Concert/ConcertDetail';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ConcertLists from './components/Concert/ConcertLists';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import PlanLists from './components/Concert/PlanLists';
import { useContext } from 'react';
import { AuthContext } from './store/auth-context';


function App() {

  const authCtx = useContext(AuthContext);

  return (
    <>
      <Router>
        <Header />
        <NavBar />

        <Switch>
          <Route exact path="/">
            <Redirect to="/concerts?page=0" />
          </Route>
          <Route exact path="/concerts">
            <ConcertLists />
          </Route>
          <Route path="/concert/:id">
            <ConcertDetail />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/plans">
            {!authCtx.isLoggedIn && <Redirect to='/login' />}
            {authCtx.isLoggedIn && <PlanLists />}
          </Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;
