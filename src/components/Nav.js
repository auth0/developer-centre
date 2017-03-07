import React, { Component } from 'react';
import { Link } from 'react-router';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import settings from '../../settings';
import Mailto from 'react-mailto';
import '../App.css';

class Nav extends Component {

  render() {
    return ( 
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/"> {settings.name} Developer Portal </Link>
          <Mailto className="navbar-brand" email={settings.supportEmail}> Contact Support </Mailto>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
           { 
             (isLoggedIn()) ? ( <button className="btn btn-danger log" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
           }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
