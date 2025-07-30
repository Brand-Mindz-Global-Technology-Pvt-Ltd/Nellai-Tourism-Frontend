import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-z]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    return phone.length === 10 && /^\d+$/.test(phone);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    };

    if (!validateEmail(formData.email)) {
      newErrors.email = "Email must end with @gmail.com and be lowercase";
    }

    if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptedTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    if (newErrors.email || newErrors.phoneNumber || newErrors.password || newErrors.confirmPassword) {
      setErrors(newErrors);
      return;
    }

    // Show OTP form after validation
    setShowOtpForm(true);
    console.log("Sign in:", formData);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length === 4) {
      console.log("OTP submitted:", otpString);
      // Handle OTP verification here
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

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

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Sign In Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 relative">
        {/* Logo in top left corner */}
        <div className="absolute top-6 left-6">
          <h1 className="text-xl font-bold text-black">BRAND MINDZ</h1>
        </div>

        <div className="w-full max-w-sm">
          {!showOtpForm ? (
            <>
              {/* Sign In Form */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
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
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Phone Number"
                    maxLength={10}
                    required
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>
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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600">
                    I accept the terms and conditions
                  </label>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 text-sm"
                >
                  Sign In
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
                <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors text-xs">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    G
                  </div>
                  Google
                </button>
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
              </div>

              {/* 4-Digit OTP Input */}
              <div className="flex justify-center gap-2 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
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
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 text-sm"
              >
                Verify OTP
              </button>

              <button
                type="button"
                onClick={() => setShowOtpForm(false)}
                className="w-full text-blue-600 text-xs hover:text-blue-700 transition-colors"
              >
                ← Back to Sign In
              </button>
            </form>
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