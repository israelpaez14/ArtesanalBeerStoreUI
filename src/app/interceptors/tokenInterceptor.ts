import {
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { KeycloakService } from '../services/keycloak/keycloak-service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const keycloakService: KeycloakService = inject(KeycloakService);
  if (!keycloakService.isTokenValid) {
    return next(req);
  }
  const requestClone = req.clone({
    headers: new HttpHeaders({
      Authorization: `Bearer ${keycloakService.keycloak.token}`,
    }),
  });

  return next(requestClone);
};
