import React from 'react';
import babel from 'babel/polyfill';
import { Router, Route, Link } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import Layout from './views/Layout.jsx';
import IssueList from './views/IssueList.jsx';
import Issue from './views/Issue.jsx';

// Finally we render a `Router` component with some `Route`s, it'll do all
// the fancy routing stuff for us.
React.render((
  <Router history={history}>
    <Route  component={Layout}>
      <Route path="/" component={IssueList}/>
      <Route path="issue/:repo/:number" component={Issue}/>
    </Route>
  </Router>
), document.getElementById('layout'));

