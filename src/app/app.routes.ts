import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LandingComponent } from './features/auth/landing/landing.component';
import { VideoPlayerComponent } from './features/video-player/video-player.component';
import { ImprintComponent } from './features/legal/imprint/imprint.component';
import { PrivacyComponent } from './features/legal/privacy/privacy.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { ActivateAccountComponent } from './features/auth/activate-account/activate-account.component';

/**
 * Central routing configuration for the application.
 * Defines access paths, URL parameters, and fallback redirects.
 */
export const routes: Routes = [
    // Default entry point
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    
    // Public Authentication & Landing
    { path: 'landing', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    
    // Auth flows requiring dynamic URL parameters (usually accessed via email links)
    { path: 'activate/:uid/:token', component: ActivateAccountComponent },
    { path: 'reset-password/:uid/:token', component: ResetPasswordComponent },
    
    // Main Application / Video Content
    { path: 'browse', component: DashboardComponent },
    { path: 'watch/:id', component: VideoPlayerComponent },
    
    // Static Legal Pages
    { path: 'imprint', component: ImprintComponent },
    { path: 'privacy', component: PrivacyComponent },
    
    // Fallback: Redirect any unknown URLs to the login page to prevent 404 errors
    { path: '**', redirectTo: 'login' }
];