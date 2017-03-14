import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { getProfile } from '../utils/AuthService';
import settings from '../../settings';
import { getAllClients, getClientsCreatedByLoggedInUser } from '../utils/developercentre-api';

class Documentation extends Component {

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

    const clientID = this.props.params.clientID;

    const apiAudience = settings.apiIdentifier;

    const authorizationURL = `${settings.tenant}/authorize?audience=${apiAudience}&scope={SCOPE}&response_type={RESPONSE_TYPE}&client_id=${clientID}&redirect_uri=https://YOUR_APP/callback&nonce={CRYPTOGRAPHIC_NONCE}state={OPAQUE_VALUE}`;

    const authorize = `${settings.tenant}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=id_token%20token&client_id=${clientID}&redirect_uri=https://YOUR_APP/callback`;

    return (
      <div>
        <Nav />
        <h3 className="text-center"> API Documentation </h3>
        <hr/>

        <div className="col-sm-12">
          <span> <em> If you are building for <strong>mobile</strong> and <strong>regular server-side</strong> apps, check 👉 </em></span>
          <Link  className="btn btn-large btn-success" to={`/mobile-doc/${clientID}`}> Mobile </Link>  &nbsp;
          <Link  className="btn btn-large btn-success" to={`/regular-doc/${clientID}`}> Regular Web App </Link>

          <h3> I am building an SPA 👇</h3>
          <hr/>

          <h3>Execute an Implicit Grant Flow</h3>
         
        </div>

        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <p>In order to execute an Implicit Grant flow you will need to configure your Client application to send the user to the authorization URL:</p>
          </div>

          <pre>
              <code> { authorizationURL } </code>
          </pre>

          <p>Where: </p>

          <ul>
            <li>
              <p><code>audience</code>: The target API for which the Client Application is requesting access on behalf of the user.</p>
            </li>
            <li>
            <p><code>scope</code>: The scopes which you want to request authorization for. These must be separated by a space. You can request any of the <a href="https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims">standard OIDC scopes</a> about users, such as <code>profile</code> and <code>email</code>, custom claims that must conform to a namespaced format (see panel below for more info), or any scopes supported by the target API (for example, <code>read:contacts</code>).</p>
            <div className="panel panel-info"><div className="panel-heading"><h3 className="panel-title">Custom claims namespaced format</h3></div><div className="panel-body"><p>In order to improve compatibility for client applications, Auth0 will now return profile information in a <a href="https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims">structured claim format as defined by the OIDC specification</a>. This means that in order to add custom claims to ID tokens or access tokens, they must conform to a namespaced format to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace <code>https://foo.com/</code> and you want to add a custom claim named <code>myclaim</code>, you would name the claim <code>https://foo.com/myclaim</code>, instead of <code>myclaim</code>.</p>
            </div></div>
            </li>
            <li>
            <p><code>response_type</code>: Indicates the type of credentials returned in the response. For this flow you can either use <code>token</code>, to get only an <code>access_token</code>, or <code>id_token token</code>, to get both an <code>id_token</code> and an <code>access_token</code>.</p>
            </li>
            <li>
            <p><code>client_id</code>: Your application's Client ID.</p>
            </li>
            <li>
            <p><code>redirect_uri</code>: The URL to which the Auth0 will redirect the user's browser after authorization has been granted by the user. The <code>access_token</code> (and optionally an <code>id_token</code>) will be available in the hash fragment of this URL. This URL must be specified as a valid callback URL under the Client Settings of your application.</p>
            </li>
            <li>
            <p><code>state</code>: An opaque value the clients adds to the initial request that Auth0 includes when redirecting the back to the client. This value must be used by the client to prevent CSRF attacks.</p>
            </li>
            <li>
            <p><code>nonce</code>: A string value which will be included in the ID token response from Auth0, <a href="https://auth0.com/docs/api-auth/tutorials/nonce">used to prevent token replay attacks</a>. It is required for <code>response_type=id_token token</code>.</p>
            </li>
          </ul>

          <p>For example:</p>

          <pre>
            <code className="language-html hljs xml">
            <span className="tag">&lt;<span className="name">a</span> <span className="attr">href</span>=<span className="string">{ authorize }</span>&gt;</span>
            Sign In
          <span className="tag">&lt;/<span className="name">a</span>&gt;</span>
          </code></pre>

          <h2 id="2-extract-the-access-token" className="anchor-heading"><span id="3" className="anchor" href="#' + anchor + '"><i className="icon icon-budicon-345"></i></span>2. Extract the Access Token</h2>
          <p>After Auth0 has redirected back to the Client, you can extract the <code>access_token</code> from the hash fragment of the URL:</p>

          <div>
            <img src="https://cdn.auth0.com/blog/centre/code.jpg" width="600" />
          </div>

          <h2 id="3-use-the-access-token" className="anchor-heading"><span id="4" className="anchor" href="#' + anchor + '"><i className="icon icon-budicon-345"></i></span>3. Use the Access Token</h2>
          <p>Once you have the <code>access_token</code> you can use it to make calls to the API, by passing it as a Bearer Token in the <code>Authorization</code> header of the HTTP request:</p>

          <div>
            <img src="https://cdn.auth0.com/blog/centre/apicall.jpg" width="600" />
          </div>

          <h2 id="4-verify-the-token" className="anchor-heading"><span id="5" className="anchor" href="#' + anchor + '"><i className="icon icon-budicon-345"></i></span>4. Verify the Token</h2>
          <p>Once your API receives a request with a Bearer <code>access_token</code>, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request <em>must</em> be rejected.</p>
          <p>For details on the validations that should be performed by the API, refer to <a href="https://auth0.com/docs/api-auth/tutorials/verify-access-token" target="_blank">Verify Access Tokens</a>.</p>
        </div>
      </div>
    );
  }
}

export default Documentation;