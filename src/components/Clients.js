import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { getProfile } from '../utils/AuthService';
import settings from '../../settings';
import Mailto from 'react-mailto';
import ActivityIndicator from 'react-activity-indicator';
import { getAllClients, getClientsCreatedByLoggedInUser, deleteClient } from '../utils/developercentre-api';


class Clients extends Component {

  constructor() {
    super()
    this.state = { clients: [], allClients: [], loading: true, deleted: true, showLoader: false, loaded: false };
  }

  getAllClients() {
    getAllClients().then( clients => {
      this.setState({ allClients: clients.client });
    });
  }

  getClientsBelongingToUser() {
    var userId = getProfile().identities[0].user_id;
    getClientsCreatedByLoggedInUser(userId).then( clients => {
      if (clients.message === 'No Clients created yet.') {
        this.setState({ clients: null });
        this.setState({ loaded: true });
      } else {
        this.setState({ clients: clients.client });
        this.setState({ loaded: true });
      }
    });
  }

  componentDidMount() {
    this.getClientsBelongingToUser();
    this.setState({ loading: false });
  
  }

  handleApplicationDeletion(clientID) {

    this.setState({ showLoader: true });
  
    var _this = this;
    deleteClient(clientID).then(response => {
      if( response.status === 200) {
        _this.setState({ deleted: false });
        window.location.reload();
      }
      _this.setState({ showLoader: false });
    });
  }

  deleteApplication = (clientID) => {
    var decision = confirm("Are you sure you want to delete this client?");
    if (decision) {
      this.handleApplicationDeletion(clientID);
      return;
    }
  }

  render() {

    const { clients, allClients, loading, deleted, showLoader, loaded }  = this.state;
    var userID = getProfile().identities[0].user_id;

    return (
        <div>
          <Nav />
          <h3 className="text-center">Developer Applications</h3>
          <Link className="btn btn-lg btn-success" to='/register'>Register a New Application</Link> &nbsp;
          <Link className="btn btn-lg btn-success" to='/documentation'> API Documentation</Link>
          <hr/>

          <div className="col-sm-12">
            <h3> TENANT URL: <span className="badge alert-danger"> { settings.tenant } </span></h3>
            { showLoader ? <div className="alert alert-default"><ActivityIndicator number={5} duration={200} activeColor="#d9534f" borderWidth={2} borderRadius="50%" diameter={25} /></div> : '' }
            { deleted ? '' : <div className="alert alert-success"> The Client has been deleted successfully. View registered applications. </div> }
            { !loaded ? <div className="alert alert-default"><ActivityIndicator number={5} duration={200} activeColor="#0070bf" borderWidth={2} borderRadius="50%" diameter={25} /></div> : '' }
          </div>

          { 
            (clients !== null) ?  
            clients.map((client, index) => (
              <div className="col-sm-12" key={index}>
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title"> Client Application Name: <span className="btn">{ client.client_name }</span></h3>
                  </div>
                  <div className="panel-body">
                    <p><span className="badge alert-info"> Client ID: </span><strong> { client.client_id } </strong></p>
                    <p><span className="badge alert-danger"> Client Secret: </span><strong> { client.client_secret } </strong></p>
                    <p><span className="badge alert-success"> Redirect URIs: </span><strong> { client.redirect_uris.join(',') } </strong></p>
                    <button onClick={() => this.deleteApplication(client.client_id)}> Delete Client </button>
                  </div>
                </div>
              </div>
            )) : <div className="alert alert-danger" role="alert"><strong>Oh snap!</strong> No Clients Available </div>
          }

        </div>
    );
  }
}

export default Clients;
