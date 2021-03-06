import React, { Component } from 'react';
import { Link } from 'react-router';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import settings from '../../settings';
import Mailto from 'react-mailto';
import { markdown } from 'markdown';
import { Markdown } from 'react-showdown';
import { getProfile } from '../utils/AuthService';
import { getAllClients, getClientsCreatedByLoggedInUser, deleteClient } from '../utils/developercentre-api';
import '../App.css';

class Nav extends Component {

  render() {

    const profileImage = isLoggedIn() ? getProfile().picture : null;
    const username = isLoggedIn() ? getProfile().nickname : null;
    const email = isLoggedIn() ? getProfile().name : null;

    return ( 
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <div className="navbar navbar-nav navbar-left">
            <img src={settings.logoUrl} className="pull-left logo-img"/>
            <Link className="navbar-brand" to="/"> {settings.name} Developer Portal </Link>
          </div>
          <Mailto className="navbar-brand" email={settings.supportEmail}> Contact Support </Mailto>
        </div>
        <ul className="nav navbar-nav navbar-right">
        
           { 
             (isLoggedIn()) ? 
             ( <div>
             
                <li className="dropdown" key={2}>
                  <a href="#" className="dropdown-toggle navprofile" data-toggle="dropdown">
                    <strong>{ username }</strong>&nbsp;
                    <span className="glyphicon glyphicon-chevron-down"></span>&nbsp;
                    <img src={profileImage} className="profile-image" />
                  </a>
                  <ul className="dropdown-menu">
                        <li key={3}>
                            <div className="navbar-login">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <p className="text-center">
                                            <img src={profileImage} className="profile-image-lg" />
                                        </p>
                                    </div>
                                    <div className="col-lg-8">
                                        <p className="text-left"><strong>Hi, { username }</strong></p>
                                        <p className="text-left small">{ email }</p>
                                        <p className="text-left">
                                            <Link to="/" className="btn btn-primary btn-block btn-sm">View Clients</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="divider" key={4}></li>
                        <li key={5}>
                            <div className="navbar-login navbar-login-session">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <p>
                                          <button style={{ 'cursor': 'pointer' }} className="btn btn-danger btn-block" onClick={() => logout()}>Log out </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                  </li>
             </div> ) :  ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
           }
        </ul>
      </nav>
    );
  }
}

export default Nav;
