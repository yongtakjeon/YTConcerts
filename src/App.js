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
import ConcertList from './components/Concert/ConcertList';
import Pagination from './components/UI/Pagination';


function App() {
  return (
    <>
      <Router>
        <Header/>
        <NavBar/>
        
        <Switch>
          <Route exact path="/">
            <Redirect to="/concerts?page=0"/>
          </Route>
          <Route exact path="/concerts">
            <ConcertList/>
          </Route>
          <Route path="/concert/:id">
            <ConcertDetail/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
