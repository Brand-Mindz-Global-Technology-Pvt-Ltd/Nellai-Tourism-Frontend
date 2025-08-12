# Google OAuth Setup Guide

This guide provides comprehensive instructions for setting up Google OAuth 2.0 authentication for your Nellai Tourism application.

## Prerequisites

1. A Google account with access to Google Cloud Console
2. Your application domain (for production)
3. Basic understanding of OAuth 2.0 flow

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "Nellai Tourism App")
5. Click "Create"
6. Wait for the project to be created and select it

## Step 2: Enable Required APIs

1. In your project, go to "APIs & Services" > "Library"
2. Search for and enable these APIs:
   - **Google Identity Services** (formerly Google+ API)
   - **Google+ API** (if still available)
   - **Google OAuth2 API**

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - **App name**: "Nellai Tourism App"
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
4. Add scopes:
   - `openid`
   - `email`
   - `profile`
5. Add test users (your email address) if you're in testing mode
6. Save and continue through all steps

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application" as the application type
4. Fill in the details:
   - **Name**: "Nellai Tourism Web Client"
   - **Authorized JavaScript origins**:
     ```
     http://localhost:5173
     http://localhost:3000
     https://yourdomain.com (for production)
     ```
   - **Authorized redirect URIs**:
     ```
     http://localhost:5173/auth/callback
     http://localhost:3000/auth/callback
     https://yourdomain.com/auth/callback (for production)
     ```
5. Click "Create"
6. **Important**: Copy both the **Client ID** and **Client Secret** - you'll need both!

## Step 5: Environment Configuration

### Frontend (.env file in Nellai-Tourism-Frontend/)
```env
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_actual_client_id_here
VITE_GOOGLE_CLIENT_SECRET=your_actual_client_secret_here

# API Configuration
VITE_API_URL=http://localhost:5000

# Application Configuration
VITE_APP_NAME=Nellai Tourism
VITE_APP_URL=http://localhost:5173
```

### Backend (.env file in Nellai-Tourism-Backend/)
```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_actual_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_client_secret_here

# Other configurations...
JWT_SECRET=your_jwt_secret_here
```

## Step 6: Verify Configuration

### Check Google Cloud Console Settings

1. **OAuth Consent Screen**:
   - Ensure your app is published or in testing
   - Verify test users are added if in testing mode
   - Check that required scopes are added

2. **Credentials**:
   - Verify Client ID and Client Secret are correct
   - Check that Authorized JavaScript origins include your development URL
   - Ensure Authorized redirect URIs are properly set

3. **APIs**:
   - Confirm Google Identity Services is enabled
   - Verify Google+ API is enabled

### Common Issues and Solutions

#### Issue: "redirect_uri_mismatch"
- **Cause**: Redirect URI in your app doesn't match what's in Google Console
- **Solution**: Add exact redirect URIs to Google Console:
  - Development: `http://localhost:5173/auth/callback`
  - Production: `https://yourdomain.com/auth/callback`

#### Issue: "unauthorized_client"
- **Cause**: Client ID doesn't match or app isn't properly configured
- **Solution**: 
  - Verify Client ID in both frontend and backend .env files
  - Check that OAuth consent screen is properly configured
  - Ensure your account is added as a test user if in testing mode

#### Issue: "access_denied"
- **Cause**: User denied permission or scope issues
- **Solution**:
  - Check that required scopes are added to OAuth consent screen
  - Verify the app is published or you're added as a test user

## Step 7: Test the Setup

### Development Testing
1. Start your development server: `npm run dev`
2. Go to Sign In or Login page
3. Click "Sign in with Google"
4. Complete the OAuth flow
5. Check browser console for any errors
6. Verify user is created/logged in successfully

### Production Testing
1. Deploy your application
2. Test Google Sign-In on production domain
3. Verify redirect URIs work correctly
4. Check that users can authenticate successfully

## Step 8: Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use different Client IDs for development and production
- Regularly rotate Client Secrets

### OAuth Security
- Use HTTPS in production
- Implement proper CSRF protection
- Validate redirect URIs
- Monitor OAuth consent screen for changes

### User Data
- Only request necessary scopes
- Implement proper data retention policies
- Follow GDPR/privacy regulations

## Troubleshooting

### Frontend Issues
1. **Button not showing**: Check Client ID configuration
2. **OAuth flow fails**: Verify redirect URIs and scopes
3. **Script loading errors**: Check network connectivity and ad blockers

### Backend Issues
1. **Token exchange fails**: Verify Client ID and Secret
2. **User creation fails**: Check database connection and schema
3. **JWT generation fails**: Verify JWT_SECRET configuration

### Google Console Issues
1. **API not enabled**: Enable required APIs in Google Console
2. **Consent screen errors**: Complete all required fields
3. **Credential issues**: Verify Client ID and Secret are correct

## Production Deployment

### Domain Configuration
1. Add your production domain to Authorized JavaScript origins
2. Add production redirect URIs
3. Update environment variables with production values
4. Ensure HTTPS is enabled

### Monitoring
1. Monitor Google Cloud Console for quota usage
2. Check application logs for authentication errors
3. Monitor user sign-up/login success rates
4. Set up alerts for authentication failures

## Support Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Identity Services](https://developers.google.com/identity/gsi/web)
- [Google Cloud Console Help](https://cloud.google.com/docs)
- [OAuth 2.0 Security Best Practices](https://tools.ietf.org/html/rfc6819)

## Next Steps

After completing this setup:
1. Test both development and production environments
2. Monitor authentication logs
3. Implement additional security measures if needed
4. Consider adding other OAuth providers (Facebook, GitHub, etc.)
5. Set up user profile management
6. Implement account linking for users with multiple auth methods 