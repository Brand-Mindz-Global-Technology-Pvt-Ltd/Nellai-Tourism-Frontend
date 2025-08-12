# Complete Login Flow Guide

This guide explains the comprehensive authentication flow for the Nellai Tourism application, covering both email/password and Google Sign-In methods.

## Authentication Methods

### 1. Email/Password Authentication

#### Sign Up Flow
1. **User Registration**
   - User fills out sign-up form with email, password, phone, name
   - Password strength validation (8+ chars, uppercase, number, special char)
   - Phone number validation with country code
   - Email validation

2. **OTP Verification**
   - 6-digit OTP sent to user's email
   - 60-second expiration timer
   - Auto-focus and auto-submit functionality
   - Resend OTP option after timer expires

3. **Account Activation**
   - User enters OTP correctly
   - Account is marked as `is_verified=true`
   - User is redirected to login page
   - Success message displayed

#### Login Flow
1. **Email/Password Login**
   - User enters email and password
   - Backend validates credentials
   - JWT token generated and stored
   - User redirected to home page

2. **Forgot Password**
   - User clicks "Forgot Password"
   - 4-digit OTP sent to email
   - 5-minute expiration timer
   - User enters new password after OTP verification
   - Password updated in database

### 2. Google Sign-In Authentication

#### Enhanced Google Sign-In Flow
1. **New User (Sign Up)**
   - User clicks "Sign in with Google" on Sign In page
   - Google OAuth flow completes
   - Backend creates new user with `is_verified=true`
   - User automatically logged in and redirected to home

2. **Existing User (Login)**
   - User clicks "Sign in with Google" on Login page
   - Google OAuth flow completes
   - Backend finds existing user and logs them in
   - User redirected to home

3. **Email User Switching to Google**
   - If user previously signed up with email but now uses Google
   - Backend automatically verifies their account
   - User info updated if changed
   - Seamless login experience

## Technical Implementation

### Frontend Components

#### GoogleSignIn Component
- **Improved Reliability**: Retry mechanisms for script loading
- **Better Error Handling**: Graceful fallbacks and user feedback
- **State Management**: Tracks script loading, button rendering, initialization
- **Retry Logic**: Up to 3 retries with exponential backoff
- **Fallback Button**: Shows when Google Sign-In is unavailable

#### Login/SignIn Pages
- **Dual Authentication**: Both email/password and Google Sign-In
- **Form Validation**: Real-time validation with visual feedback
- **Password Strength**: Visual indicator and requirements checklist
- **OTP Management**: Auto-focus, auto-submit, resend functionality

### Backend Controllers

#### authController.js
- **Google Login Enhancement**: 
  - Creates new users with `is_verified=true`
  - Handles existing user login
  - Updates user info if changed
  - Auto-verifies email users switching to Google

#### User Management
- **Unified User Table**: Single table for both email and Google users
- **Verification Status**: `is_verified` field for account status
- **Flexible Authentication**: Users can switch between methods

## Environment Configuration

### Frontend (.env)
```env
VITE_GOOGLE_CLIENT_ID=your_actual_google_client_id_here
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```env
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
JWT_SECRET=your_jwt_secret_here
# ... other database and email configs
```

## User Experience Flow

### First-Time Users
1. **Option 1 - Email Sign Up**
   - Fill registration form
   - Verify email with OTP
   - Login with email/password

2. **Option 2 - Google Sign Up**
   - Click "Sign in with Google"
   - Complete Google OAuth
   - Automatically logged in

### Returning Users
1. **Email Login**
   - Enter email/password
   - Direct login

2. **Google Login**
   - Click "Sign in with Google"
   - One-click login

3. **Mixed Authentication**
   - Users can switch between methods
   - Seamless experience regardless of original signup method

## Security Features

### Password Security
- **Strong Password Requirements**: 8+ chars, uppercase, number, special char
- **Password Hashing**: bcrypt with salt rounds
- **No Password Storage**: Only hashed passwords stored

### Token Security
- **JWT Tokens**: 7-day expiration
- **Secure Storage**: Tokens stored in localStorage
- **Automatic Cleanup**: Tokens cleared on logout

### Google OAuth Security
- **Token Verification**: Backend verifies Google ID tokens
- **Audience Validation**: Ensures tokens are for your app
- **User Data Protection**: Only necessary data stored

## Error Handling

### Frontend Error Handling
- **Network Errors**: Graceful fallbacks and retry mechanisms
- **Validation Errors**: Real-time feedback with specific messages
- **Google Sign-In Errors**: Fallback buttons and helpful error messages
- **OTP Errors**: Clear error messages and resend options

### Backend Error Handling
- **Database Errors**: Proper error responses
- **Validation Errors**: Detailed error messages
- **Google Token Errors**: Proper authentication failure handling
- **Email Errors**: Graceful email sending failure handling

## Troubleshooting Common Issues

### Google Sign-In Issues
1. **Button Not Showing**
   - Check `.env` file configuration
   - Verify Google Cloud Console settings
   - Check browser console for errors
   - Restart development server

2. **Authentication Failures**
   - Verify Google Client ID matches frontend and backend
   - Check authorized domains in Google Cloud Console
   - Ensure HTTPS in production

### Email Authentication Issues
1. **OTP Not Received**
   - Check email configuration
   - Verify email address
   - Check spam folder
   - Use resend functionality

2. **Password Reset Issues**
   - Verify email exists in database
   - Check OTP expiration
   - Ensure password meets requirements

## Best Practices

### Development
- **Environment Variables**: Never commit `.env` files
- **Error Logging**: Monitor console for errors
- **Testing**: Test both authentication methods
- **Security**: Use strong passwords and JWT secrets

### Production
- **HTTPS**: Always use HTTPS in production
- **Domain Configuration**: Add production domains to Google Console
- **Environment Variables**: Set in hosting platform
- **Monitoring**: Monitor authentication logs

## Support and Maintenance

### Regular Tasks
- **Token Rotation**: Regularly rotate JWT secrets
- **Google Credentials**: Monitor Google Cloud Console
- **Email Configuration**: Verify email service settings
- **Security Updates**: Keep dependencies updated

### User Support
- **Clear Error Messages**: Help users understand issues
- **Recovery Options**: Multiple ways to authenticate
- **Documentation**: Keep setup guides updated
- **Testing**: Regular testing of all flows

