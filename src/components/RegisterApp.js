import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { getProfile } from '../utils/AuthService';
import { getAllClients, registerNewClient } from '../utils/developercentre-api';


class RegisterApp extends Component {

  constructor() {
    super()
    this.state = { clients: [], loading: true, adding: true, showLoader: false };
  }

  getAllClients() {
    getAllClients().then((clients) => {
      this.setState({ clients: clients.client });
    });
  }

  componentDidMount() {
    this.getAllClients();
    this.setState({ loading: false });
  }

  handleFormReset = () => {
    this.clientName.value = "";
    this.redirectURIs.value = "";
  }

  handleFormDataApiSync = () => {

    this.setState({ showLoader: true });

    var formData = {
      client_name: this.clientName.value,
      redirect_uris: this.redirectURIs.value,
      createdBy: getProfile().identities[0].user_id
    };

    var _this = this;

    registerNewClient(formData).then(response => {
      _this.setState({ adding: false });
      console.log("Data", response.data);
      console.log("Status", response.status);
      console.log("Status Text", response.statusText);
      console.log("Headers", response.headers);
      console.log("Config", response.config);
      _this.setState({ showLoader: false });
    });
  }


  handleFormSubmit = (event) => {
    event.preventDefault();
    this.handleFormDataApiSync();
    this.handleFormReset();
  }

  render() {

    const { clients, loading, adding, showLoader }  = this.state;

    return (
      <div>
        <Nav />
        <h3 className="text-center">Register New Application</h3>
        <Link className="btn btn-lg btn-success" to='/clients'>View Registered Applications</Link>
        <hr/>
       
        <div className="col-sm-12" >
          { showLoader ? <div className="alert alert-danger">Loading...Creating an application at the moment, please be patient.</div> : '' }
          { adding ? '' : <div className="alert alert-success"> The Client has been created successfully. View registered applications. </div> }

          <form ref="create_form" onSubmit={ this.handleFormSubmit }>
            <div className="form-group">
              <label> Application Name: </label>
              <input type="text" className="form-control" ref={(input) => { this.clientName = input; }} placeholder="Enter your name" /> 
            </div>
            <div className="form-group"> 
              <label> Redirect URIs:  </label> 
              <textarea className="form-control" ref={(input) => { this.redirectURIs = input; }} placeholder="Enter your Redirect URIs. If the URL is more than one, separate it with a comma."></textarea>
            </div>
            <div>
              <input className="btn btn-small btn-info" type="submit" value="Create New Client" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterApp;
