import React from 'react';
import ReactDOM from 'react-dom';
import Clients from './components/Clients';
import Welcome from './components/Welcome';
import Register from './components/Register';
import { Router, Route, browserHistory } from 'react-router';
import { requireAuth } from './utils/AuthService';

const Root = () => {
  return (
    <div className="container">
      <Router history={browserHistory}>
        <Route path="/" component={Welcome}/>
        <Route path="/clientsss" component={Clients}/>
        <Route path="/clients" component={Clients} onEnter={requireAuth} />
        <Route path="/register" component={Register} onEnter={requireAuth} />
      </Router>
    </div>
  )
}


ReactDOM.render(<Root />, document.getElementById('root'));
