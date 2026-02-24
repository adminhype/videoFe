/** Payload for creating a new user account. */
export interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
}

/** Payload for user authentication. */
export interface LoginData {
    email: string;
    password: string;
}

/** Payload for setting a new password after a reset request. */
export interface ResetPasswordData {
    password: string;
    confirmPassword: string;
}

/** Payload for requesting a password reset email. */
export interface ForgotPasswordData {
    email: string;
}

/** Represents a standard user in the system. */
export interface User {
    id: number;
    email: string;
}

/** Response received after a successful registration. */
export interface RegisterResponse {
    user: User;
    token: string;
}

/** Response received after a successful login. Token might be missing if stored via cookies. */
export interface LoginResponse {
    user?: User;
    token?: string;
}

/** Response received after logging out. */
export interface LogoutResponse {
    detail: string;
}

/** Response received after verifying an email account. */
export interface ActivationResponse {
    message: string;
}

/** Response received when a password reset email was sent. */
export interface PasswordResetRequestResponse {
    detail: string;
}

/** Response received when the password was successfully changed. */
export interface PasswordResetConfirmResponse {
    detail: string;
}