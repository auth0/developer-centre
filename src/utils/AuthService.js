import decode from 'jwt-decode';
import { browserHistory } from 'react-router';
import {EventEmitter} from 'events';
import Auth0Lock from 'auth0-lock';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';


const lock = new Auth0Lock('wxFHjMw2R2HD7IrQx8Yhii7FdnZmutqE', 'unicoder.auth0.com', {
    auth: {
      redirectUrl: `${window.location.origin}`,
      responseType: 'token'
    }
  }
);

lock.on('authenticated', authResult => {
  setIdToken(authResult.idToken);
  setAccessToken(authResult.accessToken);
  lock.getUserInfo(authResult.accessToken, (error, profile) => {
    if (error) { return setProfile({error}); }
    setProfile(profile);
    browserHistory.push('/clients');
  });
});

export function login(options) {
  lock.show(options);

  return {
    hide() {
      lock.hide();
    }
  }
}

export function logout() {
  clearIdToken();
  browserHistory.replace('/');
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

function setIdToken(idToken) {
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function setProfile(profile) {
  localStorage.setItem('profile', JSON.stringify(profile));
}

export function getProfile() {
  return JSON.parse(localStorage.getItem('profile'));
}

function clearProfile() {
  localStorage.removeItem('profile');
}

function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}