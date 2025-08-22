import { useEffect, useCallback, useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { GOOGLE_CONFIG, getGoogleOAuthConfig } from "@/config/google";

interface GoogleSignInProps {
  mode: "login" | "signup";
  className?: string;
}

declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleSignIn({ mode, className = "" }: GoogleSignInProps) {
  const { googleLogin, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const buttonRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const codeClientRef = useRef<any>(null);

  const oauthConfig = getGoogleOAuthConfig
    ? getGoogleOAuthConfig()
    : { clientId: GOOGLE_CONFIG?.CLIENT_ID, scope: "openid email profile" };

  const handleGoogleSignIn = useCallback(
    async (response: any) => {
      try {
        const authCode = response?.code;
        if (!authCode) throw new Error("No authorization code received from Google");
        await googleLogin(authCode); // send to backend /google-login
        toast({ title: "Success", description: "Signed in with Google!" });
        navigate("/");
      } catch (err) {
        console.error("Google Sign-In Error:", err);
        toast({
          title: "Error",
          description:
            err instanceof Error ? err.message : "Failed to sign in with Google",
          variant: "destructive",
        });
      }
    },
    [googleLogin, toast, navigate]
  );

  const initCodeClient = useCallback(() => {
    if (!window.google) return;
    // Use the Authorization Code flow (server-side exchange)
    codeClientRef.current = window.google.accounts.oauth2.initCodeClient({
      client_id: oauthConfig.clientId,
      scope: oauthConfig.scope,
      ux_mode: "popup",
      // IMPORTANT: This returns response.code
      callback: handleGoogleSignIn,
    });
  }, [oauthConfig.clientId, oauthConfig.scope, handleGoogleSignIn]);

  const renderGoogleButton = useCallback(() => {
    if (!window.google || !buttonRef.current) return;

    // Render the styled Google button
    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      type: "standard",
      text: mode === "login" ? "signin_with" : "signup_with",
      shape: "rectangular",
      logo_alignment: "left",
      width: "100%",
    });

    // Attach the click to request an authorization code
    buttonRef.current.onclick = () => {
      if (!codeClientRef.current) {
        console.warn("Code client not ready; reinitializing...");
        initCodeClient();
      }
      codeClientRef.current?.requestCode();
    };
  }, [mode, initCodeClient]);

  const loadGoogleScript = useCallback(() => {
    // Basic guard: must have a real client ID
    if (!oauthConfig.clientId || oauthConfig.clientId === "YOUR_GOOGLE_CLIENT_ID") {
      console.error(
        "Google Client ID not configured. Set VITE_GOOGLE_CLIENT_ID in your frontend .env"
      );
      setScriptLoaded(false);
      return;
    }

    // Remove existing script if reloading
    if (scriptRef.current && document.head.contains(scriptRef.current)) {
      document.head.removeChild(scriptRef.current);
    }

    setIsInitializing(true);

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    scriptRef.current = script;

    script.onload = () => {
      if (!window.google) {
        console.error("Google object not found after script load");
        setIsInitializing(false);
        setScriptLoaded(false);
        return;
      }
      try {
        setScriptLoaded(true);
        initCodeClient();       // prepare code flow
        // Small timeout to ensure container is mounted before render
        setTimeout(() => {
          renderGoogleButton();
          setIsInitializing(false);
        }, 50);
      } catch (e) {
        console.error("Error during Google init:", e);
        setIsInitializing(false);
        setScriptLoaded(false);
      }
    };

    script.onerror = () => {
      console.error("Failed to load Google Identity Services script");
      setIsInitializing(false);
      setScriptLoaded(false);
    };

    document.head.appendChild(script);
  }, [oauthConfig.clientId, initCodeClient, renderGoogleButton]);

  const handleFallbackClick = () => {
    // If config is missing, inform developer; otherwise retry with simple backoff
    if (!oauthConfig.clientId || oauthConfig.clientId === "YOUR_GOOGLE_CLIENT_ID") {
      toast({
        title: "Google Sign-In Not Configured",
        description:
          "Set VITE_GOOGLE_CLIENT_ID in your frontend .env and restart the dev server.",
        variant: "destructive",
      });
      return;
    }
    if (retryCount < 3) {
      setRetryCount((c) => c + 1);
    } else {
      toast({
        title: "Google Sign-In Unavailable",
        description:
          "Google Sign-In is temporarily unavailable. Please use email/password for now.",
        variant: "destructive",
      });
    }
  };

  // Load script initially
  useEffect(() => {
    loadGoogleScript();
    return () => {
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Retry loader with exponential-ish backoff
  useEffect(() => {
    if (retryCount === 0) return;
    const t = setTimeout(() => loadGoogleScript(), 800 * retryCount);
    return () => clearTimeout(t);
  }, [retryCount, loadGoogleScript]);

  return (
    <div className={`w-full ${className}`}>
      {/* Keep the container ALWAYS mounted so Google can render into it */}
      <div ref={buttonRef} className="w-full" />

      {/* Only show fallback button if the script truly didn't load */}
      {!scriptLoaded && (
        <button
          onClick={handleFallbackClick}
          disabled={isLoading || isInitializing}
          className="mt-2 w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors text-xs disabled:opacity-50 disabled:cursor-not-allowed"
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
