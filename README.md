![Videoflix](public/assets/icons/logo_icon.svg)

This repository contains the clientside application for Videoflix, a responsive video streaming platform built with **Angular 19**. It features a modern UI, adaptive video streaming (HLS), and a robust authentication system interacting with a Django backend.

## Table of Contents

1.  Live Demo & Access
2.  Backend Repository
3.  Technical Overview
4.  Features
5.  Documentation (Compodoc)
6.  Installation and Setup
7.  Building for Production

## 1. Live Demo & Access

You can access the live application here: **[videoflix](https://videoflix.ademoencue.de/)**

### Guest Credentials
To explore the platform immediately without registering, feel free to use the prepared guest account:

*   **Email:** `guest@videoflix.com`
*   **Password:** `videoflix`

## 2. Backend Repository

This frontend requires the Videoflix Backend API to function.
*   **Backend Repository:** [videoFlix](https://github.com/adminhype/videoFlix)

## 3. Technical Overview

The project follows strict **Clean Code** principles and uses the latest Angular features.

*   **Framework:** Angular 19 (Standalone Components)
*   **Language:** TypeScript
*   **Styling:** SCSS (Modular, CSS Variables for theming)
*   **Streaming:** Hls.js integration for adaptive bitrate streaming
*   **State/Async:** RxJS (Observables, Signals)
*   **Documentation:** Compodoc
*   **Testing:** Karma & Jasmine

## 4. Features

### User Interface
*   **Responsive Design:** Fully adaptive layout for Desktop, Tablet, and Mobile.
*   **Hero Section:** Dynamic featured video with autoplay and mute controls.
*   **Carousels:** Horizontal scrolling for video categories.

### Video Player
*   **Custom Player:** Built from scratch (no iframe) with custom controls.
*   **HLS Integration:** Supports `.m3u8` streams via `hls.js`.
*   **Dynamic Quality Switching:** Users can manually switch resolutions (e.g., to 720p or 1080p) **if available** for the specific video source.

### Authentication & Security
*   **Interceptor:** `AuthInterceptor` automatically attaches credentials to requests.
*   **Guards:** Route protection (`AuthGuard`) prevents unauthorized access.
*   **Flows:** Login, Registration (Double-Opt-In), Password Reset.

## 5. Documentation (Compodoc)

This project uses **Compodoc** to generate detailed documentation of the code structure, modules, and components.

To generate and serve the documentation locally:

1.  **Install Compodoc** (if not installed globally):
    ```bash
    npm install -g @compodoc/compodoc
    ```

2.  **Generate and Serve:**
    ```bash
    npx compodoc -p tsconfig.json -s
    ```

3.  Open your browser at `http://localhost:8080` to view the full architectural documentation.

## 6. Installation and Setup

Follow these steps to run the frontend locally:

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd videoflix.frontend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Ensure your local backend is running (usually on port 8000). The `src/environments/environment.ts` is pre-configured for local development:
    ```typescript
    export const environment = {
      production: false,
      baseUrl: 'http://localhost:8000/api',
      mediaUrl: 'http://localhost:8000/media'
    };
    ```

4.  **Start Development Server**
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/`.

## 7. Building for Production

To build the project for the deployment environment (e.g., Nginx on VPS):

```bash
npm run build