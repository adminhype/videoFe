import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Global HTTP Interceptor for authentication.
 * Attaches the `withCredentials: true` flag to every outgoing request.
 * This ensures that cookies (like session IDs or tokens) are sent to the backend.
 * 
 * @param req The outgoing HTTP request.
 * @param next The next interceptor in the chain.
 * @returns An observable of the HTTP event.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    withCredentials: true
  });

  return next(modifiedReq);
};