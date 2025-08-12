// API Base URL
const API_BASE_URL = 'http://localhost:5000/api/auth';

// Types for API requests and responses
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyResetOtpRequest {
  email: string;
  otp: string;
}

export interface ResendOtpRequest {
  email: string;
}

export interface ApiResponse<T = any> {
  message?: string;
  error?: string;
  data?: T;
  token?: string;
  user?: any;
}

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Network error');
  }
}

// Authentication API functions
export const authApi = {
  // Request OTP for registration
  requestOtp: async (email: string): Promise<ApiResponse> => {
    return apiCall('/request-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Verify OTP
  verifyOtp: async (email: string, otp: string): Promise<ApiResponse> => {
    return apiCall('/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  },

  // Register user (creates user and sends OTP)
  register: async (userData: RegisterRequest): Promise<ApiResponse> => {
    return apiCall('/register', {
      method: 'POST',
      body: JSON.stringify({
        email: userData.email,
        phone: userData.phoneNumber,
        first_name: userData.firstName,
        last_name: userData.lastName,
        password: userData.password,
        confirm_password: userData.password, // Backend expects confirm_password
      }),
    });
  },

  // Login
  login: async (credentials: LoginRequest): Promise<ApiResponse> => {
    return apiCall('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Forgot password (sends 4-digit OTP)
  forgotPassword: async (email: string): Promise<ApiResponse> => {
    return apiCall('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Resend OTP
  resendOtp: async (email: string): Promise<ApiResponse> => {
    return apiCall('/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  // Verify reset OTP
  verifyResetOtp: async (email: string, otp: string): Promise<ApiResponse> => {
    return apiCall('/verify-reset-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  },

  // Reset password (after OTP verification)
  resetPassword: async (data: ResetPasswordRequest): Promise<ApiResponse> => {
    return apiCall('/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword,
      }),
    });
  },

  // Google login
  googleLogin: async (authCode: string): Promise<ApiResponse> => {
    return apiCall('/google-login', {
      method: 'POST',
      body: JSON.stringify({ authCode }),
    });
  },
}; 