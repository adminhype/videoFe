import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LandingComponent } from './features/auth/landing/landing.component';
import { VideoPlayerComponent } from './features/video-player/video-player.component';
import { ImprintComponent } from './features/legal/imprint/imprint.component';
import { PrivacyComponent } from './features/legal/privacy/privacy.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'browse', component: DashboardComponent },
    { path: 'watch/:id', component: VideoPlayerComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: '**', redirectTo: '' }
];