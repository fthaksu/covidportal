import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DataIndonesia from './components/Home.js'
import About from './components/About.js';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={DataIndonesia} />
          <Route path="/about" component={About}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
