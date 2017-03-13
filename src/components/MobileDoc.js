import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { getProfile } from '../utils/AuthService';
import settings from '../../settings';
import { getAllClients, getClientsCreatedByLoggedInUser } from '../utils/developercentre-api';

class MobileDoc extends Component {

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

    const authorizationURL = `${settings.tenant}/authorize?audience=API_AUDIENCE&scope=SCOPE&response_type=code&client_id=WQT9iLJRSLL5u2tAxYiCTELmRwmkGHpR&code_challenge=CODE_CHALLENGE&code_challenge_method=S256&redirect_uri=http://localhost:3000/login`;

    const authorize = `${settings.tenant}/authorize?scope=appointments%20contacts&audience=appointments:api&response_type=code&client_id=WQT9iLJRSLL5u2tAxYiCTELmRwmkGHpR&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256&redirect_uri=com.myclientapp://myclientapp.com/callback`;
  
    const code = "curl --request POST \
  --url 'https://unicoder.auth0.com/oauth/token' \
  --header 'content-type: application/json' \
  --data '{'grant_type':'authorization_code','client_id': 'WQT9iLJRSLL5u2tAxYiCTELmRwmkGHpR','code_verifier': 'YOUR_GENERATED_CODE_VERIFIER','code': 'YOUR_AUTHORIZATION_CODE','redirect_uri': 'com.myclientapp://myclientapp.com/callback', }'"


    return (
      <div>
        <Nav />
        <h3 className="text-center"> API Documentation </h3>
        <hr/>

        <div className="col-sm-12">
          <h3> TENANT URL: <span className="badge alert-danger"> { settings.tenant } </span></h3>

        </div>

        <div className="col-sm-12">
          <span> <em> If you are building for <strong>SPAs</strong> and <strong>regular server-side</strong> apps, check 👉 </em></span>
          <Link  className="btn btn-large btn-success" to="/documentation"> SPA </Link> &nbsp;
          <Link  className="btn btn-large btn-success" to="/regular-doc"> Regular Web App </Link>

          <h3> I am building a mobile app 👇</h3>
          <hr/>

          <h3>Execute an Authorization Code Grant Flow with Proof Key for Code Exchange (PKCE)</h3>
        </div>

        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <p>The Authorization Code with PKCE is the OAuth 2.0 grant that native apps use in order to access an API. In this document we will work through the steps needed in order to implement this: create a code verifier and a code challenge, get the users authorization, get a token and access the API using the token.</p>
          </div>

          <h2 id="2-extract-the-access-token" className="anchor-heading"><span id="3" className="anchor" href="#' + anchor + '"><i className="icon icon-budicon-345"></i></span>1. Create a code Verifier</h2>
          <p>First, you need to generate and store a <code>code_verifier</code>.</p>

          <div>
            <img src="https://cdn.auth0.com/blog/pkce/nodejs.png" width="600" />
            <h6><em>Node.js</em></h6>
          </div>


          <h2 id="2-create-a-code-challenge" class="anchor-heading"><span id="3" class="anchor" href="#' + anchor + '"><i class="icon icon-budicon-345"></i></span>2. Create a Code Challenge</h2>
          <p>Using the <code>code_verifier</code>, generate a <code>code_challenge</code> that will be sent in the authorization request.</p>

          <div>
            <img src="https://cdn.auth0.com/blog/pkce-challenge/nodejs.png" width="600" />
            <h6><em>Node.js</em></h6>
          </div>

          <h2 id="3-get-the-user-s-authorization" class="anchor-heading"><span id="4" class="anchor" href="#' + anchor + '"><i class="icon icon-budicon-345"></i></span>3. Get the Users Authorization</h2>
          <p>To begin an Authorization Code Grant flow, your native application should first send the user to the <a href="https://auth0.com/docs/api/authentication#authorization-code-grant-pkce-">authorization URL</a> including the <code>code_challenge</code> and the method used to generate it.</p>

           <pre>
              <code> { authorizationURL } </code>
          </pre>
        </div>
      
          <p>Where: </p>

          <ul>
            <li>
            <p><code>audience</code>: The unique identifier of the API the native app wants to access. Use the value of the <strong>Identifier</strong> field at your <a href="https://manage.auth0.com/#/apis">API Settings</a>. If you cant see this page, enable the <strong>Enable APIs Section</strong> toggle at <a href="https://manage.auth0.com/#/account/advanced">Account Settings &gt; Advanced</a>.</p>
            </li>
            <li>
            <p><code>scope</code>: The <a href="https://auth0.com/docs/scopes">scopes</a> that you want to request authorization for. These must be separated by a space. You can request any of the <a href="https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims">standard OIDC scopes</a> about users, such as <code>profile</code> and <code>email</code>, custom claims that must conform to a namespaced format, or any scopes supported by the target API (for example, <code>read:contacts</code>). Include <code>offline_access</code> to get a refresh token (make sure that the <strong>Allow Offline Access</strong> field is enabled in the <a href="https://manage.auth0.com/#/apis">API Settings</a>).</p>
            <div className="panel panel-info"><div className="panel-heading"><h3 className="panel-title">Arbitrary Claims</h3></div><div className="panel-body"><p>In order to improve compatibility for client applications, Auth0 will now return profile information in a <a href="https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims">structured claim format as defined by the OIDC specification</a>. This means that in order to add arbitrary claims to ID tokens or access tokens, they must conform to a namespaced format to avoid possible collisions with standard OIDC claims. For example, if you choose the namespace <code>https://foo.com/</code> and you want to add an arbitrary claim named <code>myclaim</code>, you would name the claim <code>https://foo.com/myclaim</code>, instead of <code>myclaim</code>.</p>
            </div></div>
            </li>
            <li>
            <p><code>response_type</code>: Denotes the kind of credential that Auth0 will return (code vs token). For this flow, the value must be <code>code</code>.</p>
            </li>
            <li>
            <p><code>client_id</code>: Your application's Client ID. You can find this value at your <a href="https://manage.auth0.com/#/clients/WQT9iLJRSLL5u2tAxYiCTELmRwmkGHpR/settings">Client's Settings</a>.</p>
            </li>
            <li>
            <p><code>redirect_uri</code>: The URL to which Auth0 will redirect the browser after authorization has been granted by the user. The Authorization Code will be available in the <code>code</code> URL parameter. This URL must be specified as a valid callback URL under your <a href="https://manage.auth0.com/#/clients/WQT9iLJRSLL5u2tAxYiCTELmRwmkGHpR/settings">Clients Settings</a>.</p>
            </li>
            <li>
            <p><code>code_challenge</code>: Generated challenge from the <code>code_verifier</code>.</p>
            </li>
            <li>
            <p><code>code_challenge_method</code>: Method used to generate the challenge.</p>
            </li>
          </ul>

        <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">A Note About code_challenge_method</h3>
            </div>
            <div className="panel-body">
              <p>The PKCE spec defines two methods, <code>S256</code> and <code>plain</code>, the former is used in this example and is the <strong>only</strong> one supported by Auth0 since the latter is discouraged.</p>
            </div>
        </div>

        
          <p>For example:</p>

          <pre>
            <code className="language-html hljs xml">
            <span className="tag">&lt;<span class="name">a</span> <span className="attr">href</span>=<span className="string">{ authorize }</span>&gt;</span>
            Sign In
          <span className="tag">&lt;/<span className="name">a</span>&gt;</span>
          </code>
          </pre>

          <h2 id="4-exchange-the-authorization-code-for-an-access-token" class="anchor-heading"><span id="5" class="anchor" href="#' + anchor + '"><i class="icon icon-budicon-345"></i></span>4. Exchange the Authorization Code for an Access Token</h2>

          <p>Now that you have an Authorization Code, you must exchange it for an Access Token that can be used to call your API. Using the Authorization Code (<code>code</code>) from the previous step, you will need to <code>POST</code> to the <a href="https://auth0.com/docs/api/authentication#authorization-code-pkce-">Token URL</a> sending also the <code>code_verifier</code>:</p>

          <pre>

          <code> { code } </code>
          </pre>

          <p>Where:</p>

          <ul>
<li><code>grant_type</code>: This must be <code>authorization_code</code>.</li>
<li><code>client_id</code>: Your applications Client ID.</li>
<li><code>code_verifier</code>: Cryptographically random key that was used to generate the <code>code_challenge</code> passed to <code>/authorize</code>.</li>
<li><code>code</code>: The Authorization Code received from the initial <code>authorize</code> call.</li>
<li><code>redirect_uri</code>: The URL must match exactly the <code>redirect_uri</code> passed to <code>/authorize</code>.</li>
</ul>

<p>The response contains <code>access_token</code>, <code>refresh_token</code>, <code>id_token</code>, and <code>token_type</code> values, for example:</p>

<div>
    <img src="https://cdn.auth0.com/blog/pkce-callapi/nodejs.png" width="600" />
</div>

<p></p>

<p>Note that <code>refresh_token</code> will only be present in the response if you included the <code>offline_access</code> scope AND enabled <strong>Allow Offline Access</strong> for your API in the Dashboard. For more information about Refresh Tokens and how to use them, see <a href="https://auth0.com/docs/tokens/preview/refresh-token">our documentation</a>.</p>

<div className="panel panel-danger"><div className="panel-heading"><h3 className="panel-title">Warning</h3></div><div className="panel-body"><p>It is important to understand that the Authorization Code flow with PKCE can only be used for Clients whose type is <code>Native</code> in the Dashboard.</p>
</div></div>

<h2 id="5-call-the-api" className="anchor-heading"><span id="6" className="anchor" href="#' + anchor + '"><i className="icon icon-budicon-345"></i></span>5. Call the API</h2>

<p>Once you have the <code>access_token</code>, you can use it to make calls to the API, by passing it as a Bearer Token in the <code>Authorization</code> header of the HTTP request:</p>

 <div>
    <img src="https://cdn.auth0.com/blog/pkce-callapi/nodejs.png" width="600" />
    <h6><em>Node.js</em></h6>
  </div>
<h2 id="6-verify-the-token" className="anchor-heading"><span id="7" className="anchor" href="#' + anchor + '"><i className="icon icon-budicon-345"></i></span>6. Verify the Token</h2>

<p>Once your API receives a request with a Bearer <code>access_token</code>, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request <em>must</em> be rejected.</p>

<p>For details on the validations that should be performed refer to <a href="https://auth0.com/docs/api-auth/tutorials/verify-access-token">Verify Access Tokens</a>.</p>

          </div>
         
    );
  }
}

export default MobileDoc;