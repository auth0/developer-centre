## Developer Portal

![Developer Portal Welcome Screen](https://cdn.auth0.com/blog/portal/welcome.png)
_Welcome Screen_

![Developer Portal All Clients](https://cdn.auth0.com/blog/portal/all-clients.png)
_Display of All Clients created by a third party developer

![Developer Portal - Create Client](https://cdn.auth0.com/blog/portal/create-client.png)
_Create Client Screen_

![Developer Portal - Delete A Client](https://cdn.auth0.com/blog/portal/delete-client.png)
_Delete Client created by developer_

![Developer Portal - Documentation](https://cdn.auth0.com/blog/portal/documentation.png)
_How to get an access token - API Documentation_


Developer Portal is a sample application that Auth0's clients can use to make their API accessible to third party developers.

## Installation

1. Clone this repository: `git clone git@github.com:auth0/developer-centre.git portal/`
2. `cd` into  the `backend-api`.
3. Rename `.env.example` to `.env` and fill in your correct credentials
    1. Run `npm install`
    2. Run `npm server`
3. Access the backend-api on `localhost:3333`
3. `cd` into the `portal` folder and run the following commands:
    1. Run `npm install`
    2. Run `npm start`
4. Open up `settings.json` and fill in the right credentials
3. Open your chrome browser and see the application on `localhost:3000`