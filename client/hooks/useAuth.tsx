import React, { useState, useEffect, createContext, useContext } from 'react';
import { authApi, ApiResponse } from '@/lib/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  verifyResetOtp: (email: string, otp: string) => Promise<void>;
  resetPassword: (data: any) => Promise<void>;
  requestOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  resendOtp: (email: string) => Promise<void>;
  googleLogin: (authCode: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    
    setIsLoading(false);
  }, []);

  const saveAuthData = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const clearAuthData = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authApi.login({ email, password });
      
      if (response.token && response.user) {
        saveAuthData(response.token, response.user);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setIsLoading(true);
      const response = await authApi.register(userData);
      
      // Registration only creates user and sends OTP, doesn't return token
      // User needs to verify OTP before they can login
      if (!response.message) {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      await authApi.forgotPassword(email);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: any) => {
    try {
      setIsLoading(true);
      await authApi.resetPassword(data);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const requestOtp = async (email: string) => {
    try {
      setIsLoading(true);
      await authApi.requestOtp(email);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    try {
      setIsLoading(true);
      const response = await authApi.verifyOtp(email, otp);
      
      // OTP verification activates the account but doesn't return token
      // User needs to login separately after verification
      if (!response.message) {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async (email: string) => {
    try {
      setIsLoading(true);
      await authApi.resendOtp(email);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyResetOtp = async (email: string, otp: string) => {
    try {
      setIsLoading(true);
      const response = await authApi.verifyResetOtp(email, otp);
      
      if (!response.message) {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (authCode: string) => {
    try {
      setIsLoading(true);
      const response = await authApi.googleLogin(authCode);
      
      if (response.token && response.user) {
        saveAuthData(response.token, response.user);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    requestOtp,
    verifyOtp,
    resendOtp,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 