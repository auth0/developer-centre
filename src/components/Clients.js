import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { getProfile } from '../utils/AuthService';
import { getAllClients, getClientsCreatedByLoggedInUser } from '../utils/developercentre-api';


class Clients extends Component {

  constructor() {
    super()
    this.state = { clients: [], allClients: [], loading: true };
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
      } else {
        this.setState({ clients: clients.client });
      }
    });
  }

  componentDidMount() {
    this.getClientsBelongingToUser();
    this.setState({ loading: false });
  }

  render() {

    const { clients, allClients, loading }  = this.state;

    console.log(clients);

    if (loading) {
      return (
        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <h2><i className="fa fa-spinner"></i> Fetching Clients....</h2>
          </div>
        </div>
      )
    }

    return (
      <div>
        <Nav />
        <h3 className="text-center">Developer Applications</h3>
        <Link className="btn btn-lg btn-success" to='/register'>Register a New Application</Link>
        <hr/>
       
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
