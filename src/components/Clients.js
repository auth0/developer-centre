import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { isLoggedIn } from '../utils/AuthService';
import { getFoodData } from '../utils/chucknorris-api';


class Clients extends Component {

  constructor() {
    super()
    this.state = { clients: [] };
  }

  getAllClients() {
    getFoodData(userId).then((jokes) => {
      this.setState({ jokes });
    });
  }

  componentWillMount() {
    this.getAllClients();
  }

  render() {

    const { jokes }  = this.state;

    return (
      <div>
        <Nav />
        <h3 className="text-center">Welcome to Auth0 Developer Center</h3>
        <hr/>

        { jokes.map((joke, index) => (
              <div className="col-sm-6" key={index}>
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title"> <span className="btn">#{ joke.id }</span></h3>
                  </div>
                  <div className="panel-body">
                    <p> { joke.joke } </p>
                  </div>
                </div>
              </div>
          ))}

        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <h2>Log In to Gain Access</h2>
          </div>
        </div>

        <div className="col-sm-12">
          { isLoggedIn() ?
          <div className="jumbotron text-center">
            <h2>View Celebrity Jokes</h2>
            <Link className="btn btn-lg btn-success" to='/special'> Celebrity Jokes </Link>
          </div> : ''
          }
        </div>
      </div>
    );
  }
}

export default FoodJokes;
