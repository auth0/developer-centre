import React from 'react';
import ReactDOM from 'react-dom';
import Clients from './components/Clients';
import Welcome from './components/Welcome';
import RegisterApp from './components/RegisterApp';
import { Router, Route, browserHistory } from 'react-router';
import { requireAuth } from './utils/AuthService';

const Root = () => {
  return (
    <div className="container">
      <Router history={browserHistory}>
        <Route path="/" component={Welcome}/>
        <Route path="/clients" component={Clients} onEnter={requireAuth} />
        <Route path="/register" component={RegisterApp} onEnter={requireAuth} />
      </Router>
    </div>
  )
}


ReactDOM.render(<Root />, document.getElementById('root'));
