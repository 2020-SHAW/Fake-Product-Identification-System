import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScannerPage from './pages/ScannerPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/scanner" component={ScannerPage} />
        <Route path="/result" component={ResultPage} />
      </Switch>
    </Router>
  );
}

export default App;

