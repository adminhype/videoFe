/**
 * Environment configuration for local development.
 * Angular automatically uses this file when running the app locally via `ng serve`.
 */
export const environment = {
    /** Indicates that the application is running in development mode. */
    production: false,
    baseUrl: 'http://127.0.0.1:8000/api',
    mediaUrl: 'http://127.0.0.1:8000/media'
};
