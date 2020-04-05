import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './pages/About.js';
import Home from './pages/Home.js';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
