import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { isLoggedIn } from '../utils/AuthService';


class Welcome extends Component {

  render() {

    return (
      <div>
        <Nav />
        <h3 className="text-center">Welcome to Auth0 Developer Center</h3>
        <hr/>

        <div className="col-sm-12">
          <div className="jumbotron text-center">
           { isLoggedIn() ?
            <div>
              <div>
                <Link className="btn btn-lg btn-success" to='/clients'> View Clients </Link>
              </div>
              <hr />
              <div>
                <Link className="btn btn-lg btn-success" to='/clients'> Create New Client </Link>
              </div>
            </div>
           : <div><h2>Log In to Gain Access</h2></div>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
