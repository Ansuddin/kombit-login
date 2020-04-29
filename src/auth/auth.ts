import auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth0-variables";
import { AuthResult } from "../models/authresult";

let instance: any;

export class Auth {
  accessToken: string;
  idToken: string;
  expiresAt: number;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: "token id_token",
    scope: AUTH_CONFIG.scope,
    audience: AUTH_CONFIG.audience,
  });

  constructor() {
    if (!instance) {
      instance = this;
      console.log("Create instance");
    } else if (instance) {
      console.log("instance already exists - returning existing");
      return instance;
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getSession = this.getSession.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          (document.querySelector("ion-router") as HTMLIonRouterElement).push(
            "/"
          );
          console.log(err);
          alert(
            `Error: ${JSON.stringify(
              err
            )}. Check the console for further details.`
          );
          reject();
        }
      });
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  getSession(): AuthResult {
    return {
      idToken: this.idToken,
      expiresAt: this.expiresAt,
      accessToken: this.accessToken,
      isAuthenticated: new Date().getTime() < this.expiresAt
    };
  }

  setSession(authResult: any) {
    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.errorDescription}).`
        );
      }
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    this.auth0.logout({
      returnTo: window.location.origin
    });

    // navigate to the home route
    location.href = "/";
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}

export const AuthService = new Auth();
