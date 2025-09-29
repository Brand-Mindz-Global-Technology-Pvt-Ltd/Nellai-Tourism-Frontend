// Cache bust: 2024-12-30 15:30:00
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import CountrySelector, { Country } from "@/components/CountrySelector";
import GoogleSignIn from "@/components/GoogleSignIn"; 

export default function SignIn() {
  const navigate = useNavigate();
  const { register, requestOtp, verifyOtp, resendOtp, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: "Singapore",
    code: "SG",
    dialCode: "+65",
    flag: "🇸🇬",
    phoneLength: 8,
    placeholder: "01234567"
  });

  // Handle country change and clear phone number if it doesn't match new country's length
  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    // Clear phone number if it doesn't match the new country's length
    if (formData.phoneNumber.length > country.phoneLength) {
      setFormData(prev => ({
        ...prev,
        phoneNumber: ""
      }));
    }
  };

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
    color: "",
  });

  // Password match verification state
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special handling for phone number to only allow digits
    if (name === "phoneNumber") {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      // Limit to country-specific length
      const limitedDigits = digitsOnly.slice(0, selectedCountry.phoneLength);
      
      setFormData(prev => ({
        ...prev,
        [name]: limitedDigits
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Check password match when confirm password changes
    if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password);
    }

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Validate only the local number (without country code)
    const localNumber = phone.replace(/\D/g, '');
    return localNumber.length === selectedCountry.phoneLength && /^\d+$/.test(localNumber);
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

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
      
      // Auto-submit when all 6 digits are entered
      if (value && index === 5) {
        const updatedOtp = [...newOtp];
        updatedOtp[index] = value;
        const otpString = updatedOtp.join("");
        if (otpString.length === 6) {
          // Small delay to let user see the last digit
          setTimeout(() => {
            handleOtpSubmit(new Event('submit') as any);
          }, 300);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      otp: "",
    };

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = `Please enter a valid ${selectedCountry.name} phone number (${selectedCountry.phoneLength} digits)`;
    }

    const passwordStrength = validatePasswordStrength(formData.password);
    if (passwordStrength.score < 4) {
      newErrors.password = `Password must meet all requirements: ${passwordStrength.requirements.join(", ")}`;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (newErrors.email || newErrors.phoneNumber || newErrors.password || newErrors.confirmPassword || newErrors.otp) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsRequestingOtp(true);
      
      // Register user (this creates user with is_verified=false and sends OTP)
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: `${selectedCountry.dialCode}${formData.phoneNumber}`,
        email: formData.email,
        password: formData.password,
      });
      
      setShowOtpForm(true);
      toast({
        title: "Registration Successful",
        description: "OTP sent to your email. Please verify to activate your account.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to register account",
        variant: "destructive",
      });
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    
    // Clear previous OTP errors
    setErrors(prev => ({ ...prev, otp: "" }));
    
    if (otpString.length !== 6) {
      setErrors(prev => ({ ...prev, otp: "Please enter the complete 6-digit OTP" }));
      return;
    }
    
    try {
      setIsVerifyingOtp(true);
      
      // Verify the OTP (this sets is_verified=true and activates the account)
      await verifyOtp(formData.email, otpString);
      
      toast({
        title: "Account Activated",
        description: "Your account has been verified and activated successfully! You can now login.",
      });
      
      // Redirect to login page after successful verification
      navigate("/login");
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        otp: error instanceof Error ? error.message : "Failed to verify OTP" 
      }));
    } finally {
      setIsVerifyingOtp(false);
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
      
      // Update password match when password changes
      if (formData.confirmPassword) {
        setPasswordMatch(value === formData.confirmPassword);
      }
    }

    // Show password briefly then hide
    if (name === "password" && value.length === 1) {
      setTimeout(() => {
        setShowPassword(false);
      }, 1000);
    }
  };

  const handleConfirmPasswordPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    alert("Copy and paste is not allowed for confirm password");
  };

  // Timer effect
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
      setTimer(60);
      setCanResend(false);
    }
  }, [showOtpForm]);

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Sign In Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 relative">
        {/* Logo in top left corner */}
        <div className="absolute top-6 left-6">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo/nellai-tours-logo.png"
              alt="Nellai Tourism Logo"
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-sm font-medium text-[#2C2A6B] leading-tight tracking-wider font-lemo">
                NELLAI TOURS
              </h1>
              <p className="text-[8px] font-normal text-black leading-tight tracking-widest font-lemo">
                WORLD CLASS TRAVEL
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm">
          {!showOtpForm ? (
            <>
              {/* Sign In Form */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name and Last Name Row */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <div className="flex gap-2">
                    <CountrySelector
                      selectedCountry={selectedCountry}
                      onCountryChange={handleCountryChange}
                    />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`flex-1 px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                        errors.phoneNumber ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={selectedCountry.placeholder}
                      inputMode="numeric"
                      required
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>
                  )}
                  {!errors.phoneNumber && formData.phoneNumber && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.phoneNumber.length}/{selectedCountry.phoneLength} digits
                    </p>
                  )}
                </div>

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
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
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
                          {formData.password.length >= 8 ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <X className="w-3 h-3 text-red-500" />
                          )}
                          <span className={formData.password.length >= 8 ? "text-green-600" : "text-gray-500"}>
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/[A-Z]/.test(formData.password) ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <X className="w-3 h-3 text-red-500" />
                          )}
                          <span className={/[A-Z]/.test(formData.password) ? "text-green-600" : "text-gray-500"}>
                            One uppercase letter
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/\d/.test(formData.password) ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <X className="w-3 h-3 text-red-500" />
                          )}
                          <span className={/\d/.test(formData.password) ? "text-green-600" : "text-gray-500"}>
                            One number
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/[^A-Za-z0-9]/.test(formData.password) ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <X className="w-3 h-3 text-red-500" />
                          )}
                          <span className={/[^A-Za-z0-9]/.test(formData.password) ? "text-green-600" : "text-gray-500"}>
                            One special character
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onPaste={handleConfirmPasswordPaste}
                    className={`w-full px-3 py-2 pr-10 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Confirm Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100 z-20"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  
                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <div className="mt-1 flex items-center gap-1">
                      {passwordMatch ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <X className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-xs ${passwordMatch ? "text-green-600" : "text-red-500"}`}>
                        {passwordMatch ? "Passwords match" : "Passwords do not match"}
                      </span>
                    </div>
                  )}
                  
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms and Conditions Link */}
                <div className="text-center">
                  <p className="text-xs text-gray-600">
                    By creating an account, you agree to our{" "}
                    <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Terms and Conditions
                    </Link>
                  </p>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isRequestingOtp || isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRequestingOtp ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-xs text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Login
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
                <GoogleSignIn mode="signup" />
                <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors text-xs">
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    f
                  </div>
                  Facebook
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Enter the OTP</h3>
                <p className="text-xs text-gray-600">
                  OTP sent to the registered email
                </p>
                <p className="text-xs text-blue-600 font-medium mt-1">
                  {formData.email}
                </p>
                
                {/* Timer */}
                <div className="mt-4">
                  <p className="text-xs text-gray-600">
                    OTP expires in: <span className="font-medium text-red-500">{timer}s</span>
                  </p>
                </div>
              </div>

              {/* 6-Digit OTP Input */}
              <div className="flex justify-center gap-2 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => {
                      // Handle backspace
                      if (e.key === 'Backspace' && !digit && index > 0) {
                        const prevInput = document.getElementById(`otp-${index - 1}`);
                        if (prevInput) {
                          prevInput.focus();
                        }
                      }
                    }}
                    className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    maxLength={1}
                    required
                  />
                ))}
              </div>

              {/* OTP Error Display */}
              {errors.otp && (
                <p className="text-xs text-red-500 mt-1 text-center">{errors.otp}</p>
              )}

              <button
                type="submit"
                disabled={isVerifyingOtp || isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={() => setShowOtpForm(false)}
                className="w-full text-blue-600 text-xs hover:text-blue-700 transition-colors"
              >
                ← Back to Sign In
              </button>
              
              {canResend && (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await resendOtp(formData.email);
                      setTimer(60);
                      setCanResend(false);
                      setOtp(["", "", "", "", "", ""]); // Clear OTP input
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
          )}
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/signup/signuppic.jpg')"
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Content overlay */}
      
      </div>
    </div>
  );
} 