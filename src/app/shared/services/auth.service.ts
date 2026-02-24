import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  LoginData,
  RegisterData,
  RegisterResponse,
  LoginResponse,
  LogoutResponse,
  ActivationResponse,
  ForgotPasswordData,
  ResetPasswordData,
  PasswordResetConfirmResponse,
  PasswordResetRequestResponse
} from '../interfaces/auth.interface';

/**
 * Handles user authentication and account management via the backend API.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = environment.baseUrl;

  /**
   * Registers a new user. 
   * Maps the frontend `confirmPassword` to the backend's expected `confirmed_password` field.
   * 
   * @param data The registration details.
   * @returns An observable with the created user and token.
   */
  register(data: RegisterData): Observable<RegisterResponse> {
    const payload = {
      email : data.email,
      password : data.password,
      confirmed_password : data.confirmPassword
    };
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register/`, payload);
  }

  /**
   * Authenticates a user.
   * 
   * @param data Email and password.
   * @returns An observable with the user data and token.
   */
  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, data);
  }

  /**
   * Logs out the current user and invalidates the session on the server.
   */
  logout(): Observable<LogoutResponse> {
    return this.http.post<LogoutResponse>(`${this.apiUrl}/logout/`, {});
  }

  /**
   * Activates a newly registered account using the link sent via email.
   * 
   * @param uid The unique user ID from the email link.
   * @param token The activation token from the email link.
   */
  activateAccount(uid: string, token: string): Observable<ActivationResponse> {
    return this.http.get<ActivationResponse>(`${this.apiUrl}/activate/${uid}/${token}/`);
  }

  /**
   * Requests a password reset email for the given email address.
   * 
   * @param data Contains the user's email address.
   */
  requestPasswordReset(data: ForgotPasswordData): Observable<PasswordResetRequestResponse>{
    return this.http.post<PasswordResetRequestResponse>(`${this.apiUrl}/password_reset/`, data);
  }

  /**
   * Confirms and sets a new password.
   * Maps the frontend keys to the `new_password` and `confirm_password` expected by the backend.
   * 
   * @param uid The unique user ID from the reset link.
   * @param token The reset token from the reset link.
   * @param data The new password data.
   */
  confirmPasswordReset(uid: string, token: string, data: ResetPasswordData): Observable<PasswordResetConfirmResponse>{
    const payload = {
      new_password: data.password,
      confirm_password: data.confirmPassword
    };
    return this.http.post<PasswordResetConfirmResponse>(`${this.apiUrl}/password_confirm/${uid}/${token}/`, payload);
  }
}