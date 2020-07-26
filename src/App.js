import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import * as ROUTES from './constants/routes';

import Blog from './Blog';
import Page from './Page';

function App() {
  return (
    <div className="App">
      <header className="App-header">
	  <Router>
	      <Route exact path={ROUTES.viewer}
                  component={Blog} />
              <Route exact path={ROUTES.post}
                  component={Page} />
	  </Router>
      </header>
    </div>
  );
}

export default App;
