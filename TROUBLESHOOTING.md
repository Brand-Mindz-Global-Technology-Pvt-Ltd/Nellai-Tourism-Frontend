# Troubleshooting Guide

This guide helps you resolve common issues with Google OAuth and authentication in the Nellai Tourism application.

## Google OAuth Issues

### 1. "redirect_uri_mismatch" Error

**Symptoms:**
- User sees "Error: redirect_uri_mismatch" after Google OAuth
- OAuth flow fails immediately

**Causes:**
- Redirect URI in your app doesn't match Google Console settings
- Missing or incorrect redirect URIs in Google Cloud Console

**Solutions:**
1. **Check Google Cloud Console:**
   - Go to "APIs & Services" > "Credentials"
   - Click on your OAuth 2.0 Client ID
   - Verify "Authorized redirect URIs" includes:
     ```
     http://localhost:5173/auth/callback
     https://yourdomain.com/auth/callback (production)
     ```

2. **Check Environment Variables:**
   ```env
   VITE_APP_URL=http://localhost:5173
   ```

3. **Verify Frontend Configuration:**
   - Check `client/config/google.ts`
   - Ensure redirect URIs match exactly

### 2. "unauthorized_client" Error

**Symptoms:**
- OAuth flow fails with "unauthorized_client"
- Google Sign-In button doesn't work

**Causes:**
- Client ID mismatch between frontend and backend
- OAuth consent screen not properly configured
- App not published or user not added as test user

**Solutions:**
1. **Verify Client ID:**
   - Check `.env` files in both frontend and backend
   - Ensure `VITE_GOOGLE_CLIENT_ID` matches `GOOGLE_CLIENT_ID`
   - Restart servers after changing environment variables

2. **Check OAuth Consent Screen:**
   - Go to "APIs & Services" > "OAuth consent screen"
   - Ensure app is published or in testing mode
   - Add your email as a test user if in testing mode

3. **Verify Credentials:**
   - Check that OAuth 2.0 Client ID is "Web application" type
   - Ensure Client ID and Secret are correct

### 3. "access_denied" Error

**Symptoms:**
- User sees "access_denied" after OAuth consent
- OAuth flow completes but fails

**Causes:**
- User denied permission
- Missing required scopes
- OAuth consent screen configuration issues

**Solutions:**
1. **Check Required Scopes:**
   - Verify OAuth consent screen includes:
     - `openid`
     - `email`
     - `profile`

2. **Test User Configuration:**
   - If in testing mode, ensure your email is added as test user
   - Check that app is properly configured

3. **User Permission:**
   - Ask user to try again and grant all permissions
   - Check browser console for specific error details

### 4. Google Sign-In Button Not Showing

**Symptoms:**
- No Google Sign-In button appears
- Fallback button shows instead
- Console shows configuration errors

**Causes:**
- Missing or incorrect environment variables
- Google script loading failures
- Configuration issues

**Solutions:**
1. **Check Environment Variables:**
   ```bash
   # Frontend .env file
   VITE_GOOGLE_CLIENT_ID=your_actual_client_id
   VITE_GOOGLE_CLIENT_SECRET=your_actual_client_secret
   VITE_API_URL=http://localhost:5000
   ```

2. **Verify Google Console Settings:**
   - Check "Authorized JavaScript origins"
   - Ensure `http://localhost:5173` is included
   - Verify OAuth consent screen is configured

3. **Check Browser Console:**
   - Look for JavaScript errors
   - Check network tab for script loading issues
   - Verify no ad blockers are interfering

4. **Restart Development Server:**
   ```bash
   npm run dev
   ```

### 5. "invalid_client" Error

**Symptoms:**
- Backend returns "invalid_client" error
- OAuth token exchange fails

**Causes:**
- Client Secret mismatch
- Backend environment variables not set
- Google API configuration issues

**Solutions:**
1. **Check Backend Environment:**
   ```env
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

2. **Verify Google Console:**
   - Check that Client ID and Secret match exactly
   - Ensure credentials are for "Web application" type

3. **Restart Backend Server:**
   - Environment variables are loaded at startup
   - Restart after making changes

## Authentication Flow Issues

### 1. User Not Created After Google Sign-In

**Symptoms:**
- OAuth completes successfully
- User not logged in
- No user record in database

**Causes:**
- Backend user creation fails
- Database connection issues
- Missing required user fields

**Solutions:**
1. **Check Backend Logs:**
   - Look for database errors
   - Verify user creation queries

2. **Check Database Schema:**
   - Ensure `users` table exists
   - Verify required fields are present

3. **Test Backend Endpoint:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/google-login \
     -H "Content-Type: application/json" \
     -d '{"authCode": "test_code"}'
   ```

### 2. JWT Token Issues

**Symptoms:**
- User authenticated but not staying logged in
- Token validation errors
- Authentication state lost

**Causes:**
- JWT_SECRET not set
- Token expiration issues
- Frontend token storage problems

**Solutions:**
1. **Check JWT Configuration:**
   ```env
   JWT_SECRET=your_secure_jwt_secret
   ```

2. **Verify Token Storage:**
   - Check localStorage for `authToken`
   - Verify token format and expiration

3. **Check Token Validation:**
   - Verify backend JWT verification
   - Check token expiration settings

### 3. Mixed Authentication Issues

**Symptoms:**
- Email users can't switch to Google
- Account verification issues
- Duplicate user accounts

**Causes:**
- User email matching logic issues
- Account verification state problems
- Database constraint violations

**Solutions:**
1. **Check User Matching Logic:**
   - Verify email-based user lookup
   - Ensure proper account verification handling

2. **Database Constraints:**
   - Check unique constraints on email
   - Verify user table structure

3. **Test Account Linking:**
   - Create user with email
   - Try Google Sign-In with same email
   - Verify account linking works

## Frontend Issues

### 1. React Router Issues

**Symptoms:**
- Navigation not working after authentication
- Redirect loops
- Route protection issues

**Causes:**
- Route configuration problems
- Authentication state not properly managed
- Navigation timing issues

**Solutions:**
1. **Check Route Configuration:**
   - Verify protected routes
   - Check navigation logic

2. **Authentication State:**
   - Ensure auth state is properly managed
   - Check for race conditions

3. **Navigation Timing:**
   - Add loading states
   - Ensure auth state is ready before navigation

### 2. Component Rendering Issues

**Symptoms:**
- Components not rendering properly
- Styling issues
- Missing UI elements

**Causes:**
- CSS loading problems
- Component import issues
- State management problems

**Solutions:**
1. **Check Component Imports:**
   - Verify import paths
   - Check for circular dependencies

2. **CSS Issues:**
   - Verify Tailwind CSS is loaded
   - Check for CSS conflicts

3. **State Management:**
   - Verify component state
   - Check for undefined values

## Backend Issues

### 1. Database Connection Issues

**Symptoms:**
- Authentication requests fail
- User creation errors
- Database timeout errors

**Causes:**
- Database server not running
- Connection string issues
- Network connectivity problems

**Solutions:**
1. **Check Database Status:**
   ```bash
   # PostgreSQL
   sudo systemctl status postgresql
   
   # MySQL
   sudo systemctl status mysql
   ```

2. **Verify Connection String:**
   ```env
   PGHOST=localhost
   PGUSER=your_user
   PGPASSWORD=your_password
   PGDATABASE=your_database
   PGPORT=5432
   ```

3. **Test Database Connection:**
   ```bash
   psql -h localhost -U your_user -d your_database
   ```

### 2. Email Service Issues

**Symptoms:**
- OTP emails not sent
- Email delivery failures
- SMTP errors

**Causes:**
- Email service configuration issues
- SMTP credentials problems
- Network/firewall issues

**Solutions:**
1. **Check Email Configuration:**
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

2. **Verify SMTP Settings:**
   - Check Gmail app password setup
   - Verify SMTP server settings
   - Test email sending manually

3. **Check Network:**
   - Verify firewall settings
   - Check for network restrictions

## Development Environment Issues

### 1. Environment Variable Problems

**Symptoms:**
- Configuration not loading
- Default values showing
- Environment-specific issues

**Causes:**
- `.env` file not created
- Wrong file location
- Variable naming issues

**Solutions:**
1. **Check File Location:**
   ```
   Nellai-Tourism-Frontend/.env (frontend)
   Nellai-Tourism-Backend/.env (backend)
   ```

2. **Verify Variable Names:**
   - Frontend: `VITE_` prefix required
   - Backend: No prefix needed

3. **Restart Servers:**
   - Environment variables loaded at startup
   - Restart after making changes

### 2. Port Conflicts

**Symptoms:**
- Development server won't start
- Port already in use errors
- Connection refused errors

**Causes:**
- Another service using the port
- Previous server instance running
- Port configuration conflicts

**Solutions:**
1. **Check Port Usage:**
   ```bash
   # Check what's using the port
   lsof -i :5173
   lsof -i :5000
   ```

2. **Kill Conflicting Processes:**
   ```bash
   kill -9 <PID>
   ```

3. **Change Ports:**
   ```env
   # Frontend
   VITE_PORT=3000
   
   # Backend
   PORT=5001
   ```

## Production Issues

### 1. HTTPS Requirements

**Symptoms:**
- OAuth fails in production
- Mixed content errors
- Security warnings

**Causes:**
- HTTP instead of HTTPS
- Mixed content (HTTP/HTTPS)
- SSL certificate issues

**Solutions:**
1. **Enable HTTPS:**
   - Use SSL certificates (Let's Encrypt)
   - Configure reverse proxy (Nginx/Apache)
   - Redirect HTTP to HTTPS

2. **Update Google Console:**
   - Add HTTPS domain to authorized origins
   - Update redirect URIs to HTTPS

3. **Check Mixed Content:**
   - Ensure all resources use HTTPS
   - Update API URLs to HTTPS

### 2. Domain Configuration

**Symptoms:**
- OAuth works locally but not in production
- Domain verification issues
- Redirect URI mismatches

**Causes:**
- Production domain not added to Google Console
- Incorrect redirect URIs
- Domain verification not completed

**Solutions:**
1. **Update Google Console:**
   - Add production domain to authorized origins
   - Add production redirect URIs
   - Verify domain ownership

2. **Check Environment Variables:**
   ```env
   VITE_APP_URL=https://yourdomain.com
   VITE_API_URL=https://yourdomain.com/api
   ```

3. **Test Production OAuth:**
   - Verify OAuth flow works
   - Check for any errors
   - Monitor authentication logs

## Debugging Tools

### 1. Browser Developer Tools

**Console Tab:**
- Check for JavaScript errors
- Look for OAuth-related logs
- Verify network requests

**Network Tab:**
- Monitor OAuth requests
- Check API responses
- Verify redirect URIs

**Application Tab:**
- Check localStorage for tokens
- Verify cookies
- Check session storage

### 2. Backend Logging

**Enable Debug Logging:**
```env
NODE_ENV=development
LOG_LEVEL=debug
```

**Check Server Logs:**
```bash
# View real-time logs
tail -f logs/app.log

# Check error logs
grep ERROR logs/app.log
```

### 3. Google Cloud Console

**OAuth Consent Screen:**
- Check app status
- Verify scopes
- Check test users

**Credentials:**
- Verify Client ID and Secret
- Check authorized origins
- Verify redirect URIs

**APIs & Services:**
- Check API quotas
- Verify API status
- Monitor usage

## Getting Help

### 1. Check Documentation
- Review setup guides
- Check troubleshooting sections
- Verify configuration steps

### 2. Common Solutions
- Restart development servers
- Clear browser cache
- Check environment variables
- Verify Google Console settings

### 3. External Resources
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Identity Services](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 Security Best Practices](https://tools.ietf.org/html/rfc6819)

### 4. Support Channels
- Create GitHub issues
- Check existing issues
- Review pull requests
- Community discussions

## Prevention Tips

### 1. Development Best Practices
- Use environment variables for configuration
- Test OAuth flow regularly
- Monitor console for errors
- Keep dependencies updated

### 2. Production Best Practices
- Use HTTPS everywhere
- Monitor authentication logs
- Set up error alerts
- Regular security audits

### 3. Configuration Management
- Document all environment variables
- Use different credentials for dev/prod
- Regular credential rotation
- Backup configuration files
