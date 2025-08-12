# Nellai Tourism Frontend

A modern, responsive tourism application built with React, TypeScript, and Tailwind CSS.

## Features

- 🏖️ **Tourism Packages**: Browse and book travel packages
- 🔐 **Dual Authentication**: Email/Password + Google OAuth
- 📱 **Responsive Design**: Mobile-first approach
- 🎨 **Modern UI**: Beautiful, intuitive interface
- 🔒 **Secure**: JWT-based authentication with OAuth support

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Radix UI
- **Authentication**: Custom JWT + Google OAuth 2.0
- **State Management**: React Context + Custom Hooks
- **Routing**: React Router DOM
- **Build Tool**: Vite

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Cloud Console account (for OAuth)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nellai-tourism-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your configuration
   nano .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Google OAuth Setup

### 1. Google Cloud Console Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable required APIs:
   - Google Identity Services
   - Google+ API
   - Google OAuth2 API

### 2. OAuth Consent Screen

1. Navigate to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in app details and add required scopes:
   - `openid`
   - `email` 
   - `profile`

### 3. Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Create "OAuth 2.0 Client ID"
3. Choose "Web application" type
4. Add authorized origins:
   ```
   http://localhost:5173 (development)
   https://yourdomain.com (production)
   ```
5. Add redirect URIs:
   ```
   http://localhost:5173/auth/callback (development)
   https://yourdomain.com/auth/callback (production)
   ```

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_client_secret_here

# API Configuration
VITE_API_URL=http://localhost:5000

# App Configuration
VITE_APP_NAME=Nellai Tourism
VITE_APP_URL=http://localhost:5173
```

### 5. Test OAuth

1. Restart your development server
2. Navigate to Login or Sign In page
3. Click "Sign in with Google"
4. Complete the OAuth flow

## Project Structure

```
client/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Radix UI)
│   └── GoogleSignIn.tsx # Google OAuth component
├── hooks/              # Custom React hooks
│   └── useAuth.tsx     # Authentication context
├── lib/                # Utility libraries
│   └── api.ts          # API client functions
├── pages/              # Page components
│   ├── Login.tsx       # Login page
│   └── SignIn.tsx      # Sign up page
└── config/             # Configuration files
    └── google.ts       # Google OAuth config
```

## Authentication Flow

### Email/Password Flow
1. User fills registration form
2. OTP sent to email for verification
3. Account activated after OTP verification
4. User can login with credentials

### Google OAuth Flow
1. User clicks "Sign in with Google"
2. Google OAuth consent screen
3. Authorization code exchanged for tokens
4. User automatically logged in
5. Account created if new user

### Mixed Authentication
- Users can switch between email and Google
- Seamless experience regardless of signup method
- Automatic account verification for email users switching to Google

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:client` - Build client only
- `npm run build:server` - Build server only
- `npm run start` - Start production server
- `npm run typecheck` - TypeScript type checking

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes |
| `VITE_GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Yes |
| `VITE_API_URL` | Backend API URL | Yes |
| `VITE_APP_NAME` | Application name | No |
| `VITE_APP_URL` | Application URL | No |

## Troubleshooting

### Common Issues

1. **Google Sign-In button not showing**
   - Check `.env` file configuration
   - Verify Google Cloud Console settings
   - Restart development server

2. **OAuth flow fails**
   - Verify redirect URIs in Google Console
   - Check authorized origins
   - Ensure required APIs are enabled

3. **Authentication errors**
   - Check browser console for errors
   - Verify backend is running
   - Check environment variables

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## Production Deployment

### Build
```bash
npm run build
```

### Environment Variables
Set production environment variables in your hosting platform:
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_GOOGLE_CLIENT_SECRET`
- `VITE_API_URL`
- `VITE_APP_URL`

### Google Console Updates
1. Add production domain to authorized origins
2. Add production redirect URIs
3. Publish OAuth consent screen (if ready)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

- **Documentation**: Check the docs folder
- **Issues**: Create GitHub issues for bugs
- **Questions**: Use GitHub discussions

## License

This project is licensed under the MIT License.

## Acknowledgments

- Google OAuth 2.0 for authentication
- Radix UI for accessible components
- Tailwind CSS for styling
- Vite for fast development experience
