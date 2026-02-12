import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  LoginData,
  RegisterData,
  RegisterResponse,
  LoginResponse,
  LogoutResponse
} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = environment.baseUrl;
  constructor() { }

  register(data: RegisterData): Observable<RegisterResponse> {
    const payload = {
      email : data.email,
      password : data.password,
      confirmed_password : data.confirmPassword
    };
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register/`, payload);
  }

  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, data);
  }

  logout(): Observable<LogoutResponse> {
    return this.http.post<LogoutResponse>(`${this.apiUrl}/logout/`, {});
  }
}