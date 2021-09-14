import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
 } from 'react-router-dom';

import Home from './pages/Home';
import Toronto from './pages/Toronto';
import Vancouver from './pages/Vancouver';
import Montreal from './pages/Montreal';
import ConcertDetail from './pages/ConcertDetail';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/toronto">
            <Toronto/>
          </Route>
          <Route exact path="/vancouver">
            <Vancouver/>
          </Route>
          <Route exact path="/montreal">
            <Montreal/>
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
