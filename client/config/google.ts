// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
  CLIENT_SECRET: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Nellai Tourism',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
};

// Google OAuth Scopes
export const GOOGLE_SCOPES = [
  'openid',
  'email',
  'profile'
];

// Google OAuth Configuration for development and production
export const getGoogleOAuthConfig = () => {
  const isProduction = import.meta.env.PROD;
  
  return {
    clientId: GOOGLE_CONFIG.CLIENT_ID,
    redirectUri: isProduction 
      ? `${GOOGLE_CONFIG.APP_URL}/auth/callback`
      : `${GOOGLE_CONFIG.APP_URL}/auth/callback`,
    scope: GOOGLE_SCOPES.join(' '),
    responseType: 'code',
    accessType: 'offline',
    prompt: 'consent'
  };
};

// Instructions for setting up Google OAuth:
// 1. Go to Google Cloud Console (https://console.cloud.google.com/)
// 2. Create a new project or select an existing one
// 3. Enable the Google+ API and Google Identity Services
// 4. Go to Credentials and create an OAuth 2.0 Client ID
// 5. Add your domain to authorized origins:
//    - Development: http://localhost:5173
//    - Production: https://yourdomain.com
// 6. Add authorized redirect URIs:
//    - Development: http://localhost:5173/auth/callback
//    - Production: https://yourdomain.com/auth/callback
// 7. Copy the Client ID and Client Secret
// 8. Set environment variables in your .env file 