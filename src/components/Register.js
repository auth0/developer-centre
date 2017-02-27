import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { getAllClients } from '../utils/developercentre-api';


class Register extends Component {

  constructor() {
    super()
    this.state = { clients: [], loading: true };
  }

  getAllClients() {
    getAllClients().then((clients) => {
      this.setState({ clients: clients.client });
    });
  }

  componentWillMount() {
    this.getAllClients();
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {

    const { clients }  = this.state;

    return (
      <div>
        <Nav />
        <h3 className="text-center">Developer Application Clients</h3>
        <Link className="btn btn-lg btn-success" to='/register'>Register a New Application</Link>
        <hr/>
       
       { this.state.loading ? 
           <div className="col-sm-12">
              <div className="jumbotron text-center">
                <h2><i className="fa fa-spinner"></i> Fetching Clients....</h2>
              </div>
            </div> : ''
        }
       
        { clients.map((client, index) => (
          <div className="col-sm-12" key={index}>
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title"> Client Application Name: <span className="btn">{ client.client_name }</span></h3>
              </div>
              <div className="panel-body">
                <p> Client ID: { client.client_id } </p>
                <p> Client Secret: { client.client_secret } </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Clients;
