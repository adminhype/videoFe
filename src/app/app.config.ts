import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/auth.interceptor';

/**
 * Global application configuration.
 * Defines the core providers for routing, HTTP requests, and global interceptors.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Configures the router and ensures the page scrolls back to the top on navigation
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled' 
      })
    ),
    
    // Enables the modern Fetch API for HTTP requests and registers the global auth interceptor
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    )
  ],
};