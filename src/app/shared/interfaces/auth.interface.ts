export interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ResetPasswordData {
    password: string;
    confirmPassword: string;
}

export interface ForgotPasswordData {
    email: string;
}

export interface User {
    id: number;
    email: string;
}

export interface RegisterResponse {
    user: User;
    token: string;
}

export interface LoginResponse {
    user?: User;
    token?: string;
}

export interface LogoutResponse {
    detail: string;
}