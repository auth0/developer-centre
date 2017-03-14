import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { getProfile } from '../utils/AuthService';
import settings from '../../settings';
import { getAllClients, getClientsCreatedByLoggedInUser } from '../utils/developercentre-api';

class RegularDoc extends Component {

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

    const authorizationURL = `${settings.tenant}/authorize?audience=${apiAudience}&scope=YOUR_SCOPE&response_type=code&client_id=${clientID}&redirect_uri=http://localhost:3000/login&state=YOUR_OPAQUE_VALUE`;

    const authorize = `${settings.tenant}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=code&client_id=${clientID}&redirect_uri=http://localhost:3000/login`;

    const code = `curl --request POST \
  --url 'https://unicoder.auth0.com/oauth/token' \
  --header 'content-type: application/json' \
  --data '{'grant_type': 'authorization_code', 'client_id': ${clientID}, 'client_secret': '-jgkWpTmh8d9DkLXbA2nyjCBy6zbnSk1nVt_pj03a8dMuI9O5d3IRKkYfoDHrjaB','code': 'YOUR_AUTHORIZATION_CODE','redirect_uri': 'http://localhost:3000/login' }'`;

    return (
      <div>
        <Nav />
        <h3 className="text-center"> API Documentation </h3>
        <hr/>

        <div className="col-sm-12">
          <span> <em> If you are building for <strong>mobile</strong> and <strong>spas</strong> apps, check 👉 </em></span>
          <Link  className="btn btn-large btn-success" to={`/mobile-doc/${clientID}`}> Mobile </Link>  &nbsp;
          <Link  className="btn btn-large btn-success" to={`/documentation/${clientID}`}> SPA </Link>

          <h3> I am building a regular web app👇</h3>
          <hr/>

          <h3>Execute an Authorization Code Grant Flow</h3>
        </div>

        

        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <p>The <strong>Authorization Code</strong> is an OAuth 2.0 grant that <a href="https://auth0.com/docs/quickstart/webapp">regular web apps</a> use in order to access an API. In this document we will work through the steps needed in order to implement this: get the users authorization, get a token and access the API using the token.</p>
          </div>

          <h2 id="1-get-the-user-s-authorization" class="anchor-heading"><span id="2" class="anchor" href="#' + anchor + '"><i class="icon icon-budicon-345"></i></span>1. Get the Users Authorization</h2>
          <p>To begin an Authorization Code flow, your web application should first send the user to the <a href="https://auth0.com/docs/api/authentication#authorization-code-grant">authorization URL</a>:</p>

          <pre>
              <code> { authorizationURL } </code>
          </pre>

          <p>Where: </p>

          <ul>
            <li>
            <p><code>audience</code>: The unique identifier of the API the web app wants to access. Use the value of the <strong>Identifier</strong> field at your <a href="https://manage.auth0.com/#/apis">API Settings</a>. If you can't see this page, enable the <strong>Enable APIs Section</strong> toggle at <a href="https://manage.auth0.com/#/account/advanced">Account Settings &gt; Advanced</a>.</p>
            </li>
            <li>
            <p><code>scope</code>: The <a href="https://auth0.com/docs/scopes">scopes</a> which you want to request authorization for. These must be separated by a space. You can request any of the <a href="https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims">standard OIDC scopes</a> about users, such as <code>profile</code> and <code>email</code>, custom claims that must conform to a namespaced format, or any scopes supported by the target API (for example, <code>read:contacts</code>). Include <code>offline_access</code> to get a refresh token (make sure that the <strong>Allow Offline Access</strong> field is enabled in the <a href="https://manage.auth0.com/#/apis">API Settings</a>).</p>
            <p><strong>NOTE</strong>: In order to improve compatibility for client applications, Auth0 will now return profile information in a <a href="https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims">structured claim format as defined by the OIDC specification</a>. This means that in order to add custom claims to ID tokens or access tokens, they must conform to a namespaced format to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace <code>https://foo.com/</code> and you want to add a custom claim named <code>myclaim</code>, you would name the claim <code>https://foo.com/myclaim</code>, instead of <code>myclaim</code>.</p>
            </li>
            <li>
            <p><code>response_type</code>: Denotes the kind of credential that Auth0 will return (code vs token). For this flow, the value must be <code>code</code>.</p>
            </li>
            <li>
            <p><code>client_id</code>: Your application's Client ID. You can find this value at your <a href="https://manage.auth0.com/#/clients/WQT9iLJRSLL5u2tAxYiCTELmRwmkGHpR/settings">Client's Settings</a>.</p>
            </li>
            <li>
            <p><code>state</code>: An opaque value the client adds to the initial request that Auth0 includes when redirecting back to the client. This value must be used by the client to prevent CSRF attacks, <a href="https://auth0.com/docs/protocols/oauth-state">click here to learn more</a>.</p>
            </li>
            <li>
            <p><code>redirect_uri</code>: The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the <code>code</code> URL parameter. This URL must be specified as a valid callback URL under your <a href="https://manage.auth0.com/#/clients/WQT9iLJRSLL5u2tAxYiCTELmRwmkGHpR/settings">Client's Settings</a>.</p>
            </li>
          </ul>

    
          <p>For example:</p>

          <pre>
            <code className="language-html hljs xml">
            <span className="tag">&lt;<span class="name">a</span> <span className="attr">href</span>=<span className="string">{ authorize }</span>&gt;</span>
            Sign In
          <span className="tag">&lt;/<span className="name">a</span>&gt;</span>
          </code></pre>

          <p>The purpose of this call is to obtain consent from the user to invoke the API (specified in <code>audience</code>) to do certain things (specified in <code>scope</code>) on behalf of the user. Auth0 will authenticate the user and obtain consent, unless consent has been previously given.</p>

          <p>Note that if you alter the value in <code>scope</code>, Auth0 will require consent to be given again.</p>

          <h2 id="2-exchange-the-authorization-code-for-an-access-token" class="anchor-heading"><span id="3" class="anchor" href="#' + anchor + '"><i class="icon icon-budicon-345"></i></span>2. Exchange the Authorization Code for an Access Token</h2>

          <p>Now that you have an Authorization Code, you must exchange it for an Access Token that can be used to call your API. Using the Authorization Code (<code>code</code>) from the previous step, you will need to <code>POST</code> to the <a href="https://auth0.com/docs/api/authentication?http#authorization-code">Token URL</a>:</p>

           <pre>
              <code> { code } </code>
          </pre>

          <p>Where:</p>

          <ul>
            <li><code>grant_type</code>: This must be <code>authorization_code</code>.</li>
            <li><code>client_id</code>: Your application's Client ID.</li>
            <li><code>client_secret</code>: Your application's Client Secret.</li>
            <li><code>code</code>: The Authorization Code received from the initial <code>authorize</code> call.</li>
            <li><code>redirect_uri</code>: The URL must match exactly the <code>redirect_uri</code> passed to <code>/authorize</code>.</li>
          </ul>

          <p>The response contains the <code>access_token</code>, <code>refresh_token</code>, <code>id_token</code>, and <code>token_type</code> values, for example:</p>

          <div>
            <img src=" https://cdn.auth0.com/blog/pkce-response/sample.png" width="600" />
          </div>

          <p></p>
         
          <p>Note that <code>refresh_token</code> will only be present in the response if you included the <code>offline_access</code> scope AND enabled <strong>Allow Offline Access</strong> for your API in the Dashboard. For more information about Refresh Tokens and how to use them, see <a href="https://auth0.com/docs/tokens/preview/refresh-token">our documentation</a>.</p>

          <div className="panel panel-danger"><div className="panel-heading"><h3 className="panel-title">Security Warning</h3></div><div className="panel-body"><p>It is important to understand that the Authorization Code flow should only be used in cases such as a Regular Web Application where the Client Secret can be safely stored. In cases such as a Single Page Application, the Client Secret is available to the client (in the web browser), so the integrity of the Client Secret cannot be maintained. That is why the <a href="https://auth0.com/docs/api-auth/grant/implicit">Implicit Grant flow</a> is more appropriate in that case.</p>
          </div></div>

          <h2 id="3-call-the-api" class="anchor-heading"><span id="4" class="anchor" href="#' + anchor + '"><i class="icon icon-budicon-345"></i></span>3. Call the API</h2>

          <p>Once the <code>access_token</code> has been obtained it can be used to make calls to the API by passing it as a Bearer Token in the <code>Authorization</code> header of the HTTP request:</p>

          <div>
            <img src="https://cdn.auth0.com/blog/pkce-callapi/nodejs.png" width="600" />
          </div>
          <h2 id="4-verify-the-token" class="anchor-heading"><span id="5" class="anchor" href="#' + anchor + '"><i class="icon icon-budicon-345"></i></span>4. Verify the Token</h2>

          <p>Once your API receives a request with a Bearer <code>access_token</code>, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request <em>must</em> be rejected.</p>

          <p>For details on the validations that should be performed refer to <a href="https://auth0.com/docs/api-auth/tutorials/verify-access-token">Verify Access Tokens</a>.</p>
        </div>
      </div>
    );
  }
}

export default RegularDoc;