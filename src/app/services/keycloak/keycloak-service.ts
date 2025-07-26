import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;

  constructor() {}

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: environment.keycloakUrl,
        realm: environment.keycloakRealm,
        clientId: environment.keycloakClientId,
      });
    }
    return this._keycloak;
  }

  async init() {
    await this.keycloak?.init({
      onLoad: 'login-required',
    });
  }

  async login() {
    await this.keycloak?.login();
  }

  get userId() {
    return this.keycloak?.idTokenParsed?.sub;
  }

  get isTokenValid() {
    return !this.keycloak?.isTokenExpired();
  }

  get fullName(): string {
    return this.keycloak?.idTokenParsed?.['name'] as string;
  }

  logout() {
    return this.keycloak?.logout({
      redirectUri: environment.keycloakRedirectUri,
    });
  }

  accountManagement() {
    return this.keycloak?.accountManagement();
  }
}
