import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import settings from '../../settings';
import { isLoggedIn } from '../utils/AuthService';
import { getDocs } from '../utils/developercentre-api';
import Client from './Clients';
import { markdown } from 'markdown';
import { Markdown } from 'react-showdown';

class Welcome extends Component {

  render() {

    if( isLoggedIn() ) {
      return (<Client /> );
    } else {
      return (
        <div> 
          <Nav />
          <h3 className="text-center">Welcome to { settings.name } Developer Portal </h3>

          <hr/>
          <div className="col-sm-12">
            <div className="jumbotron text-center">
              <h3> Log In to Gain Access </h3>
            </div>
          </div> 
        </div>
      );
    }
  }
}

export default Welcome;
