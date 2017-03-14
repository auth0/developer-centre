import React from 'react';
import ReactDOM from 'react-dom';
import Clients from './components/Clients';
import Welcome from './components/Welcome';
import RegisterApp from './components/RegisterApp';
import Documentation from './components/Documentation';
import MobileDoc from './components/MobileDoc';
import RegularDoc from './components/RegularDoc';
import { Router, Route, browserHistory } from 'react-router';
import { requireAuth } from './utils/AuthService';

const Root = () => {
  return (
    <div className="container">
      <Router history={browserHistory}>
        <Route path="/" component={Welcome}/>
        <Route path="/register" component={RegisterApp} onEnter={requireAuth} />
        <Route path="/mobile-doc" component={MobileDoc} onEnter={requireAuth} />
        <Route path="/regular-doc" component={RegularDoc} onEnter={requireAuth} />
        <Route path="/documentation" component={Documentation} onEnter={requireAuth} />
      </Router>
    </div>
  )
}


ReactDOM.render(<Root />, document.getElementById('root'));
