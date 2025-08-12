import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Check, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import GoogleSignIn from "@/components/GoogleSignIn";

export default function Login() {
  const navigate = useNavigate();
  const { login, forgotPassword, verifyResetOtp, resetPassword, resendOtp, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRequestingReset, setIsRequestingReset] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes for reset OTP
  const [canResend, setCanResend] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    resetEmail: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    resetEmail: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
    color: "",
  });

  // Password verification states
  const [passwordVerified, setPasswordVerified] = useState<boolean | null>(null);
  const [newPasswordMatch, setNewPasswordMatch] = useState<boolean | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check password match when confirm password changes
    if (name === "confirmNewPassword") {
      setNewPasswordMatch(value === formData.newPassword);
    }

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update password strength when password changes
    if (name === "password") {
      const strength = validatePasswordStrength(value);
      setPasswordStrength(strength);
    }

    // Update password match when new password changes
    if (name === "newPassword") {
      const strength = validatePasswordStrength(value);
      setPasswordStrength(strength);
      if (formData.confirmNewPassword) {
        setNewPasswordMatch(value === formData.confirmNewPassword);
      }
    }

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors(prev => ({ ...prev, email: "", password: "" }));
    
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: "Please enter your email" }));
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
      return;
    }

    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: "Please enter your password" }));
      return;
    }

    try {
      setIsLoggingIn(true);
      await login(formData.email, formData.password);
      setPasswordVerified(true);
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      navigate("/");
    } catch (error) {
      setPasswordVerified(false);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Login failed",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors(prev => ({ ...prev, resetEmail: "" }));
    
    if (!formData.resetEmail) {
      setErrors(prev => ({ ...prev, resetEmail: "Please enter your email" }));
      return;
    }

    if (!validateEmail(formData.resetEmail)) {
      setErrors(prev => ({ ...prev, resetEmail: "Please enter a valid email address" }));
      return;
    }
    
    try {
      setIsRequestingReset(true);
      await forgotPassword(formData.resetEmail);
      setShowOtpForm(true);
      toast({
        title: "OTP Sent",
        description: "Please check your email for the 4-digit reset OTP",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send reset OTP",
        variant: "destructive",
      });
    } finally {
      setIsRequestingReset(false);
    }
  };

  // Auto-fill email when forgot password is clicked
  const handleForgotPasswordClick = () => {
    setShowForgetPassword(true);
    // Auto-fill the reset email with the current email if available
    if (formData.email && !formData.resetEmail) {
      setFormData(prev => ({ ...prev, resetEmail: formData.email }));
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`reset-otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length === 4) {
      try {
        // Verify the reset OTP first
        await verifyResetOtp(formData.resetEmail, otpString);
        setShowResetPassword(true);
        toast({
          title: "OTP Verified",
          description: "Please enter your new password",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to verify OTP",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please enter the complete 4-digit OTP",
        variant: "destructive",
      });
    }
  };

  const validatePasswordStrength = (password: string) => {
    let score = 0;
    let requirements = [];

    // Length check (minimum 8 characters)
    if (password.length >= 8) {
      score += 1;
    } else {
      requirements.push("At least 8 characters");
    }

    // Uppercase letter check
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      requirements.push("One uppercase letter");
    }

    // Number check
    if (/\d/.test(password)) {
      score += 1;
    } else {
      requirements.push("One number");
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      requirements.push("One special character");
    }

    let label = "";
    let color = "";

    if (score === 0) {
      label = "Very Weak";
      color = "text-red-500";
    } else if (score === 1) {
      label = "Weak";
      color = "text-orange-500";
    } else if (score === 2) {
      label = "Medium";
      color = "text-yellow-500";
    } else if (score === 3) {
      label = "Strong";
      color = "text-blue-500";
    } else {
      label = "Very Strong";
      color = "text-green-500";
    }

    return { score, label, color, requirements };
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {
      newPassword: "",
      confirmNewPassword: "",
    };

    const passwordStrength = validatePasswordStrength(formData.newPassword);
    if (passwordStrength.score < 4) {
      newErrors.newPassword = `Password must meet all requirements: ${passwordStrength.requirements.join(", ")}`;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    if (newErrors.newPassword || newErrors.confirmNewPassword) {
      setErrors(prev => ({ ...prev, ...newErrors }));
      return;
    }

    try {
      setIsResettingPassword(true);
      await resetPassword({
        email: formData.resetEmail,
        password: formData.newPassword,
        confirmPassword: formData.confirmNewPassword,
      });
      
      toast({
        title: "Success",
        description: "Password reset successfully! Please login with your new password.",
      });
      
      // Reset the form and go back to login
      setShowResetPassword(false);
      setShowOtpForm(false);
      setShowForgetPassword(false);
      setOtp(["", "", "", ""]);
      setFormData(prev => ({
        ...prev,
        resetEmail: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleConfirmPasswordPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    alert("Copy and paste is not allowed for confirm password");
  };

  // Timer effect for reset OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOtpForm && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showOtpForm, timer]);

  // Reset timer when OTP form is shown
  useEffect(() => {
    if (showOtpForm) {
      setTimer(300); // 5 minutes
      setCanResend(false);
    }
  }, [showOtpForm]);

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 relative">
        {/* Logo in top left corner */}
        <div className="absolute top-6 left-6">
          <h1 className="text-xl font-bold text-black">BRAND MINDZ</h1>
        </div>

        <div className="w-full max-w-sm">
          {!showForgetPassword && !showOtpForm && !showResetPassword ? (
            <>
              {/* Login Form */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Login</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Email"
                    required
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    className={`w-full px-3 py-2 pr-10 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100 z-20"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  
                  {/* Password Verification Indicator */}
                  {passwordVerified !== null && (
                    <div className="mt-1 flex items-center gap-1">
                      {passwordVerified ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <X className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-xs ${passwordVerified ? "text-green-600" : "text-red-500"}`}>
                        {passwordVerified ? "Login successful" : "Invalid credentials"}
                      </span>
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Forget Password Link */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleForgotPasswordClick}
                    className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Start your journey Button */}
                <button
                  type="submit"
                  disabled={isLoggingIn || isLoading}
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-2 px-6 rounded-lg font-medium hover:from-teal-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? "Logging in..." : "Start your journey"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Sign In Link */}
              <div className="text-center mt-4">
                <p className="text-xs text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signin" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign In
                  </Link>
                </p>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <GoogleSignIn mode="login" />
                <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors text-xs">
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    f
                  </div>
                  Facebook
                </button>
              </div>
            </>
          ) : showForgetPassword && !showOtpForm && !showResetPassword ? (
            <>
              {/* Forget Password Form */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h2>
                <p className="text-xs text-gray-600">Enter your registered email to receive OTP</p>
              </div>

              <form onSubmit={handleForgetPassword} className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="resetEmail"
                    value={formData.resetEmail}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                      errors.resetEmail ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your registered email"
                    required
                  />
                  {errors.resetEmail && (
                    <p className="text-xs text-red-500 mt-1">{errors.resetEmail}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isRequestingReset || isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRequestingReset ? "Sending OTP..." : "Send OTP"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForgetPassword(false)}
                  className="w-full text-blue-600 text-xs hover:text-blue-700 transition-colors"
                >
                  ← Back to Login
                </button>
              </form>
            </>
          ) : showOtpForm && !showResetPassword ? (
            <>
              {/* OTP Form */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h2>
                <p className="text-xs text-gray-600">
                  OTP sent to your registered email
                </p>
                <p className="text-xs text-blue-600 font-medium mt-1">
                  {formData.resetEmail}
                </p>
                
                {/* Timer */}
                <div className="mt-4">
                  <p className="text-xs text-gray-600">
                    OTP expires in: <span className="font-medium text-red-500">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
                  </p>
                </div>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-4">
                {/* 4-Digit OTP Input */}
                <div className="flex justify-center gap-2 mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`reset-otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                      maxLength={1}
                      required
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify OTP
                </button>

                <button
                  type="button"
                  onClick={() => setShowOtpForm(false)}
                  className="w-full text-blue-600 text-xs hover:text-blue-700 transition-colors"
                >
                  ← Back to Forgot Password
                </button>
                
                {canResend && (
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await resendOtp(formData.resetEmail);
                        setTimer(300);
                        setCanResend(false);
                        setOtp(["", "", "", ""]); // Clear OTP input
                        toast({
                          title: "OTP Resent",
                          description: "A new OTP has been sent to your email",
                        });
                      } catch (error) {
                        toast({
                          title: "Error",
                          description: error instanceof Error ? error.message : "Failed to resend OTP",
                          variant: "destructive",
                        });
                      }
                    }}
                    className="w-full text-blue-600 text-xs hover:text-blue-700 transition-colors"
                  >
                    Resend OTP
                  </button>
                )}
              </form>
            </>
          ) : (
            <>
              {/* Reset Password Form */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
                <p className="text-xs text-gray-600">Enter your new password</p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* New Password */}
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-3 py-2 pr-10 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                      errors.newPassword ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="New Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100 z-20"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  
                  {/* Password Strength Indicator */}
                  {formData.newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`h-1 w-8 rounded-full ${
                                passwordStrength.score >= level
                                  ? passwordStrength.color.replace('text-', 'bg-')
                                  : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className={`text-xs font-medium ${passwordStrength.color}`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      
                      {/* Password Requirements */}
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex items-center gap-1">
                          {formData.newPassword.length >= 8 ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <X className="w-3 h-3 text-red-500" />
                          )}
                          <span className={formData.newPassword.length >= 8 ? "text-green-600" : "text-gray-500"}>
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/[A-Z]/.test(formData.newPassword) ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <X className="w-3 h-3 text-red-500" />
                          )}
                          <span className={/[A-Z]/.test(formData.newPassword) ? "text-green-600" : "text-gray-500"}>
                            One uppercase letter
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/\d/.test(formData.newPassword) ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <X className="w-3 h-3 text-red-500" />
                          )}
                          <span className={/\d/.test(formData.newPassword) ? "text-green-600" : "text-gray-500"}>
                            One number
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/[^A-Za-z0-9]/.test(formData.newPassword) ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <X className="w-3 h-3 text-red-500" />
                          )}
                          <span className={/[^A-Za-z0-9]/.test(formData.newPassword) ? "text-green-600" : "text-gray-500"}>
                            One special character
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {errors.newPassword && (
                    <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div className="relative">
                  <input
                    type={showConfirmNewPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleInputChange}
                    onPaste={handleConfirmPasswordPaste}
                    className={`w-full px-3 py-2 pr-10 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                      errors.confirmNewPassword ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Confirm New Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100 z-20"
                  >
                    {showConfirmNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  
                  {/* Password Match Indicator */}
                  {formData.confirmNewPassword && (
                    <div className="mt-1 flex items-center gap-1">
                      {newPasswordMatch ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <X className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-xs ${newPasswordMatch ? "text-green-600" : "text-red-500"}`}>
                        {newPasswordMatch ? "Passwords match" : "Passwords do not match"}
                      </span>
                    </div>
                  )}
                  
                  {errors.confirmNewPassword && (
                    <p className="text-xs text-red-500 mt-1">{errors.confirmNewPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isResettingPassword || isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResettingPassword ? "Saving..." : "Save Password"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowResetPassword(false);
                    setShowOtpForm(false);
                    setShowForgetPassword(false);
                  }}
                  className="w-full text-blue-600 text-xs hover:text-blue-700 transition-colors"
                >
                  ← Back to Login
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Right Column - Promotional Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-teal-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-32 left-32 w-24 h-24 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-40 right-40 w-16 h-16 border-2 border-white rounded-full"></div>
        </div>

        {/* Orange Glow Effect */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-orange-400 rounded-full opacity-30 blur-xl"></div>

        {/* Content Container with Proper Gap and Border Radius */}
        <div className="relative z-10 flex items-center justify-center w-full h-full p-16">
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 max-w-lg text-center relative">
            <h3 className="text-2xl font-bold text-white mb-8 leading-relaxed">
              Start your journey by one click, explore beautiful world!
            </h3>
            
            {/* Camera Girl Image */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Camera Girl SVG */}
                <svg width="140" height="140" viewBox="0 0 140 140" className="text-white">
                  {/* Hat */}
                  <ellipse cx="70" cy="35" rx="30" ry="10" fill="currentColor" opacity="0.8"/>
                  {/* Face */}
                  <circle cx="70" cy="60" r="25" fill="currentColor" opacity="0.9"/>
                  {/* Camera */}
                  <rect x="55" y="50" width="30" height="25" rx="4" fill="currentColor" opacity="0.7"/>
                  <circle cx="70" cy="62" r="10" fill="currentColor" opacity="0.9"/>
                  {/* Backpack */}
                  <rect x="40" y="70" width="25" height="30" rx="4" fill="currentColor" opacity="0.6"/>
                  {/* Mask */}
                  <ellipse cx="70" cy="65" rx="15" ry="8" fill="currentColor" opacity="0.8"/>
                  {/* Denim Shirt */}
                  <rect x="45" y="75" width="50" height="35" rx="8" fill="currentColor" opacity="0.7"/>
                </svg>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-3">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 