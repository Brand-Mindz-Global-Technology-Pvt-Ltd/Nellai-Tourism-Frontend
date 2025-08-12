# Google Sign-In Setup Guide

This guide will help you set up Google Sign-In functionality for your application with improved reliability and error handling.

## Prerequisites

1. A Google account
2. Access to Google Cloud Console
3. Your application domain (for production)

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "Nellai Tourism App")
5. Click "Create"

## Step 2: Enable Google Identity Services API

1. In your project, go to "APIs & Services" > "Library"
2. Search for "Google Identity Services"
3. Click on it and click "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: "Nellai Tourism App"
   - User support email: Your email
   - Developer contact information: Your email
   - Save and continue through the steps

4. For the OAuth client ID:
   - Application type: "Web application"
   - Name: "Nellai Tourism Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - `http://localhost:3000` (if using different port)
     - Your production domain (e.g., `https://yourdomain.com`)
   - Authorized redirect URIs:
     - `http://localhost:5173`
     - `http://localhost:3000`
     - Your production domain
   - Click "Create"

5. Copy the **Client ID** (you'll need this for the next step)

## Step 4: Configure Environment Variables

1. Create a `.env` file in the `Nellai-Tourism-Frontend` directory (not in client folder)
2. Add your Google Client ID:

```env
VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here
VITE_API_URL=http://localhost:5000
```

**Important**: Replace `your_actual_client_id_here` with the Client ID you copied from Google Cloud Console.

## Step 5: Backend Configuration

Make sure your backend `.env` file also has the Google Client ID:

```env
GOOGLE_CLIENT_ID=your_actual_client_id_here
```

## Step 6: Test the Setup

1. Start your development server
2. Go to the Sign In or Login page
3. You should see a "Sign in with Google" button
4. Click it to test the integration

## Enhanced Login Flow

### For New Users (Sign Up)
- User clicks "Sign in with Google" on Sign In page
- Google OAuth flow completes
- New user account is created with `is_verified=true`
- User is automatically logged in and redirected to home

### For Existing Users (Login)
- User clicks "Sign in with Google" on Login page
- Google OAuth flow completes
- Existing user account is found and logged in
- User is redirected to home

### For Email Users Switching to Google
- If a user previously signed up with email but now uses Google
- Their account is automatically verified and they can log in
- User info is updated if it has changed

## Troubleshooting

### Issue: "Google Sign-In is not available"
- Check that your `.env` file has the correct `VITE_GOOGLE_CLIENT_ID`
- Make sure the Client ID is not wrapped in quotes
- Restart your development server after adding the environment variable
- Check browser console for any JavaScript errors

### Issue: "Invalid Client ID"
- Verify the Client ID in Google Cloud Console
- Check that your domain is added to "Authorized JavaScript origins"
- For development, make sure `http://localhost:5173` is included

### Issue: "Redirect URI mismatch"
- Add your exact development URL to "Authorized redirect URIs" in Google Cloud Console
- Include both `http://localhost:5173` and `http://localhost:3000` if needed

### Issue: Button not showing up
- The improved component now has retry mechanisms
- Check browser console for any errors
- Try refreshing the page
- The component will show a fallback button if Google Sign-In fails

### Issue: Script loading failures
- The component now handles script loading errors gracefully
- It will retry up to 3 times with exponential backoff
- Check your internet connection
- Ensure no ad blockers are interfering

## Production Setup

For production deployment:

1. Add your production domain to "Authorized JavaScript origins"
2. Add your production domain to "Authorized redirect URIs"
3. Set the `VITE_GOOGLE_CLIENT_ID` environment variable in your hosting platform
4. Make sure your domain uses HTTPS

## Security Notes

- Never commit your `.env` file to version control
- Use different Client IDs for development and production
- Regularly rotate your OAuth credentials
- Monitor your Google Cloud Console for any security alerts

## Backend Integration

The frontend is already configured to send the Google ID token to your backend at:
```
POST /api/auth/google-login
```

The backend now handles:
- New user creation with automatic verification
- Existing user login
- User info updates
- Automatic verification for email users switching to Google

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your Google Cloud Console settings
3. Ensure your environment variables are correctly set
4. Restart your development server after making changes
5. The improved component provides better error messages and retry mechanisms 