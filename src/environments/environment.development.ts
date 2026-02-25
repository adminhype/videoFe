/**
 * Environment configuration for local development.
 * Angular automatically uses this file when running the app locally via `ng serve`.
 */
export const environment = {
    /** Indicates that the application is running in development mode. */
    production: false,
    baseUrl: 'http://localhost:8000/api',
    mediaUrl: 'http://localhost:8000/media'
};
