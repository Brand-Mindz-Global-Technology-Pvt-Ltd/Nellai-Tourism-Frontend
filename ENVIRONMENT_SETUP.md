# Environment Setup Guide

This guide explains how to set up environment variables for the Nellai Tourism Frontend application.

## Required Environment Variables

### 1. Google OAuth Client ID
- **Variable Name**: `VITE_GOOGLE_CLIENT_ID`
- **Description**: Your Google OAuth 2.0 Client ID for Google Sign-In functionality
- **How to get it**: Follow the instructions in `GOOGLE_OAUTH_SETUP.md`

### 2. API URL
- **Variable Name**: `VITE_API_URL`
- **Description**: The base URL for your backend API
- **Default**: `http://localhost:5000`

## Setup Instructions

### For Development
1. Create a `.env` file in the root directory of your project
2. Add the following variables:
   ```
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   VITE_API_URL=http://localhost:5000
   ```

### For Production
1. Set the environment variables in your hosting platform (Netlify, Vercel, etc.)
2. Make sure to use the `VITE_` prefix for all variables
3. Never commit your actual Google Client ID to version control

## Important Notes
- All environment variables must be prefixed with `VITE_` to be accessible in the client-side code
- The application will fall back to default values if environment variables are not set
- For Google Sign-In to work, you must have a valid Google OAuth Client ID 