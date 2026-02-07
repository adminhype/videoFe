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