import { useEffect, useCallback, useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { GOOGLE_CONFIG, getGoogleOAuthConfig } from '@/config/google';

interface GoogleSignInProps {
  mode: 'login' | 'signup';
  className?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleSignIn({ mode, className = '' }: GoogleSignInProps) {
  const { googleLogin, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [buttonRendered, setButtonRendered] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isInitializing, setIsInitializing] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const handleGoogleSignIn = useCallback(async (response: any) => {
    try {
      // Get the authorization code from the response
      const authCode = response.code;
      
      if (!authCode) {
        throw new Error('No authorization code received from Google');
      }

      // Send the authorization code to your backend
      await googleLogin(authCode);
      
      toast({
        title: "Success",
        description: `Successfully signed in with Google!`,
      });
      
      navigate("/");
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign in with Google",
        variant: "destructive",
      });
    }
  }, [googleLogin, toast, navigate]);

  const handleFallbackClick = async () => {
    if (!GOOGLE_CONFIG.CLIENT_ID || GOOGLE_CONFIG.CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID') {
      toast({
        title: "Google Sign-In Not Configured",
        description: "Please set up your Google Client ID in the .env file. Check GOOGLE_SIGNIN_SETUP.md for instructions.",
        variant: "destructive",
      });
    } else {
      // Retry loading Google Sign-In
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
        setScriptLoaded(false);
        setButtonRendered(false);
        loadGoogleScript();
      } else {
        toast({
          title: "Google Sign-In Unavailable",
          description: "Google Sign-In is temporarily unavailable. Please use email/password authentication.",
          variant: "destructive",
        });
      }
    }
  };

  const loadGoogleScript = useCallback(() => {
    // Check if client ID is properly configured
    if (!GOOGLE_CONFIG.CLIENT_ID || GOOGLE_CONFIG.CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID') {
      console.error('Google Client ID not configured. Please set VITE_GOOGLE_CLIENT_ID in your .env file');
      return;
    }

    // Remove existing script if any
    if (scriptRef.current && document.head.contains(scriptRef.current)) {
      document.head.removeChild(scriptRef.current);
    }

    setIsInitializing(true);

    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    scriptRef.current = script;

    script.onload = () => {
      if (window.google) {
        try {
          setScriptLoaded(true);
          initializeGoogleSignIn();
        } catch (error) {
          console.error('Error initializing Google Sign-In:', error);
          setScriptLoaded(false);
          setIsInitializing(false);
        }
      } else {
        console.error('Google object not found after script load');
        setScriptLoaded(false);
        setIsInitializing(false);
      }
    };

    script.onerror = () => {
      console.error('Failed to load Google Identity Services script');
      setScriptLoaded(false);
      setIsInitializing(false);
    };

    document.head.appendChild(script);
  }, []);

  const initializeGoogleSignIn = useCallback(() => {
    if (!window.google || !buttonRef.current) {
      console.error('Google not available or button ref not ready');
      setIsInitializing(false);
      return;
    }

    try {
      const oauthConfig = getGoogleOAuthConfig();
      
      window.google.accounts.oauth2.initTokenClient({
        client_id: oauthConfig.clientId,
        scope: oauthConfig.scope,
        callback: handleGoogleSignIn,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Wait a bit for the button container to be ready
      setTimeout(() => {
        if (buttonRef.current) {
          try {
            window.google.accounts.id.renderButton(buttonRef.current, {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              text: mode === 'login' ? 'signin_with' : 'signup_with',
              shape: 'rectangular',
              logo_alignment: 'left',
              width: '100%',
              click_listener: () => {
                // Trigger OAuth flow when button is clicked
                window.google.accounts.oauth2.requestAccessToken({
                  client_id: oauthConfig.clientId,
                  scope: oauthConfig.scope,
                  callback: handleGoogleSignIn,
                });
              }
            });
            setButtonRendered(true);
          } catch (error) {
            console.error('Error rendering Google button:', error);
            setButtonRendered(false);
          }
        }
        setIsInitializing(false);
      }, 100);
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
      setScriptLoaded(false);
      setIsInitializing(false);
    }
  }, [handleGoogleSignIn, mode]);

  useEffect(() => {
    loadGoogleScript();

    return () => {
      // Cleanup
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, [loadGoogleScript]);

  // Retry when retry count changes
  useEffect(() => {
    if (retryCount > 0 && retryCount <= 3) {
      const timer = setTimeout(() => {
        loadGoogleScript();
      }, 1000 * retryCount); // Exponential backoff
      return () => clearTimeout(timer);
    }
  }, [retryCount, loadGoogleScript]);

  return (
    <div className={`w-full ${className}`}>
      {scriptLoaded && buttonRendered ? (
        <div 
          ref={buttonRef}
          className="w-full"
        />
      ) : (
        <button
          onClick={handleFallbackClick}
          disabled={isLoading || isInitializing}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            G
          </div>
          {isLoading ? "Loading..." : isInitializing ? "Initializing..." : "Sign in with Google"}
        </button>
      )}
    </div>
  );
} 