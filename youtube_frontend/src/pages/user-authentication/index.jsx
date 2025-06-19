import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { calculatePasswordStrength, generateCaptcha, getPasswordStrengthColor, getPasswordStrengthText } from 'utils/authUtils';
import { mockCredentials } from 'data/mockData';
import { validateForm } from 'utils/validation';
import FooterLinks from './components/FooterLinks';
import { useAuthContext } from 'context/AuthContext';

const UserAuthentication = () => {
  const [mode, setMode] = useState('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false,
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [twoFactorStep, setTwoFactorStep] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorMethod, setTwoFactorMethod] = useState('sms');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated,
    loading, login, register, logout } = useAuthContext();

  // Mock credentials for testing
  // mockCredentials

  // generate Captcha
  useEffect(() => {
    const result = generateCaptcha();
    setGeneratedCaptcha(result);
  }, []);

  // calculating pass Strength
  useEffect(() => {
    if (formData.password) {
      // calculatePasswordStrength from auth utils
      const strength = calculatePasswordStrength(formData.password);
      setPasswordStrength(strength);
    }
  }, [formData.password]);

  //Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };


  //handle form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors, isValid } = validateForm({
      formData,
      mode,
      showCaptcha,
      captchaValue,
      generatedCaptcha
    });
    if (!isValid) {
      setErrors(errors);
      return; // exit if invalid
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (mode === 'signin') {
        // Check mock credentials
        // const isValidCredential = Object.values(mockCredentials).some(
        //   cred => cred.email === formData.email && cred.password === formData.password
        // );

        // if (!isValidCredential) {
        //   setErrors({ submit: `Invalid email or password. Try: sumit2410kushwaha@gmail.com / hjkl;'` });
        //   setShowCaptcha(true);
        //   return;
        // }

        // Simulate 2FA for admin account
        // if (formData.email === mockCredentials.admin.email) {
        //   setTwoFactorStep(true);
        //   return;
        // }

        // Successful login
        await login(formData.email, formData.password);
        const from = location.state?.from?.pathname || '/home-dashboard';
        navigate(from);

      } else if (mode === 'signup') {
        register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email:formData.email,
          password: formData.password,
        })
        setVerificationSent(true);
      } else if (mode === 'forgot') {
        setResetEmailSent(true);
      }

    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };


  //Handle two factor
  const handleTwoFactorSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (twoFactorCode === '123456') {
        const from = location.state?.from?.pathname || '/home-dashboard';
        navigate(from);
      } else {
        setErrors({ twoFactor: 'Invalid verification code. Use: 123456' });
      }
    } catch (error) {
      setErrors({ twoFactor: 'Verification failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  //handle social auth
  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/home-dashboard');
    }, 1500);
  };

  //switch mode -> login / signup/ forgot pass
  const switchMode = (newMode) => {
    setMode(newMode);
    setErrors({});
    setTwoFactorStep(false);
    setResetEmailSent(false);
    setVerificationSent(false);
    setShowCaptcha(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      rememberMe: false,
      acceptTerms: false
    });
  };


  if (twoFactorStep) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-surface rounded-lg shadow-elevation-2 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} color="white" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">Two-Factor Authentication</h1>
              <p className="text-text-secondary">
                Enter the verification code sent to your {twoFactorMethod === 'sms' ? 'phone' : 'authenticator app'}
              </p>
            </div>

            <form onSubmit={handleTwoFactorSubmit} className="space-y-6">
              <div>
                <label htmlFor="twoFactorCode" className="block text-sm font-medium text-text-primary mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="twoFactorCode"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className={`input-field w-full text-center text-lg tracking-widest ${errors.twoFactor ? 'border-error' : ''}`}
                  placeholder="123456"
                  maxLength="6"
                />
                {errors.twoFactor && (
                  <p className="mt-2 text-sm text-error">{errors.twoFactor}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setTwoFactorMethod(twoFactorMethod === 'sms' ? 'app' : 'sms')}
                  className="flex-1 text-sm text-secondary hover:text-secondary-400 transition-colors duration-150"
                >
                  Use {twoFactorMethod === 'sms' ? 'Authenticator App' : 'SMS'} instead
                </button>
                <button
                  type="button"
                  className="flex-1 text-sm text-secondary hover:text-secondary-400 transition-colors duration-150"
                >
                  Resend Code
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading || twoFactorCode.length !== 6}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Verify & Sign In</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setTwoFactorStep(false)}
                className="w-full text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
              >
                Back to Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (resetEmailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-surface rounded-lg shadow-elevation-2 p-8 text-center">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Mail" size={32} color="white" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Check Your Email</h1>
            <p className="text-text-secondary mb-6">
              We've sent a password reset link to {formData.email}
            </p>
            <div className="space-y-4">
              <button
                onClick={() => switchMode('signin')}
                className="btn-primary w-full"
              >
                Back to Sign In
              </button>
              <button
                onClick={() => setResetEmailSent(false)}
                className="w-full text-sm text-secondary hover:text-secondary-400 transition-colors duration-150"
              >
                Didn't receive email? Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (verificationSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-surface rounded-lg shadow-elevation-2 p-8 text-center">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} color="white" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Verify Your Email</h1>
            <p className="text-text-secondary mb-6">
              We've sent a verification link to {formData.email}. Please check your email and click the link to activate your account.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/home-dashboard')}
                className="btn-primary w-full"
              >
                Continue to StreamTube
              </button>
              <button
                onClick={() => setVerificationSent(false)}
                className="w-full text-sm text-secondary hover:text-secondary-400 transition-colors duration-150"
              >
                Resend verification email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/home-dashboard" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
              <Icon name="Play" size={24} color="white" />
            </div>
            <span className="text-2xl font-bold text-text-primary">StreamTube</span>
          </Link>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {mode === 'signin' && 'Sign in to your account'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'forgot' && 'Reset your password'}
          </h1>
          <p className="text-text-secondary">
            {mode === 'signin' && 'Welcome back! Please enter your details.'}
            {mode === 'signup' && 'Join millions of creators and viewers worldwide.'}
            {mode === 'forgot' && 'Enter your email to receive a reset link.'}
          </p>
        </div>

        {/* Authentication Form */}
        <div className="bg-surface rounded-lg shadow-elevation-2 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`input-field w-full ${errors.firstName ? 'border-error' : ''}`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-error">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`input-field w-full ${errors.lastName ? 'border-error' : ''}`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-error">{errors.lastName}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`input-field w-full ${errors.email ? 'border-error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email}</p>
              )}
            </div>

            {mode !== 'forgot' && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`input-field w-full pr-10 ${errors.password ? 'border-error' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-150"
                  >
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error">{errors.password}</p>
                )}

                {mode === 'signup' && formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-surface-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                          style={{ width: `${passwordStrength}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-secondary">{getPasswordStrengthText(passwordStrength)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`input-field w-full pr-10 ${errors.confirmPassword ? 'border-error' : ''}`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-150"
                  >
                    <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {showCaptcha && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  CAPTCHA Verification
                </label>
                <div className="flex items-center space-x-4">
                  <div className="bg-surface-700 px-4 py-2 rounded border-2 border-dashed border-white/20 font-mono text-lg tracking-wider">
                    {generatedCaptcha}
                  </div>
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-2 hover:bg-surface-700 rounded transition-colors duration-150"
                    aria-label="Refresh CAPTCHA"
                  >
                    <Icon name="RotateCcw" size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  value={captchaValue}
                  onChange={(e) => setCaptchaValue(e.target.value)}
                  className={`input-field w-full mt-2 ${errors.captcha ? 'border-error' : ''}`}
                  placeholder="Enter CAPTCHA"
                />
                {errors.captcha && (
                  <p className="mt-1 text-sm text-error">{errors.captcha}</p>
                )}
              </div>
            )}

            {mode === 'signin' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary bg-surface border-white/20 rounded focus:ring-primary-500 focus:ring-2"
                  />
                  <span className="text-sm text-text-secondary">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-sm text-secondary hover:text-secondary-400 transition-colors duration-150"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary bg-surface border-white/20 rounded focus:ring-primary-500 focus:ring-2 mt-0.5"
                  />
                  <span className="text-sm text-text-secondary">
                    I agree to the{' '}
                    <Link to="#" className="text-secondary hover:text-secondary-400 transition-colors duration-150">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="#" className="text-secondary hover:text-secondary-400 transition-colors duration-150">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="mt-1 text-sm text-error">{errors.acceptTerms}</p>
                )}
              </div>
            )}

            {errors.submit && (
              <div className="p-3 bg-error-900/20 border border-error-500 rounded-md">
                <p className="text-sm text-error">{errors.submit}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  <span>
                    {mode === 'signin' && 'Signing in...'}
                    {mode === 'signup' && 'Creating account...'}
                    {mode === 'forgot' && 'Sending reset link...'}
                  </span>
                </>
              ) : (
                <span>
                  {mode === 'signin' && 'Sign In'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'forgot' && 'Send Reset Link'}
                </span>
              )}
            </button>

            {mode !== 'forgot' && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-surface text-text-secondary">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialAuth('google')}
                    disabled={isLoading}
                    className="flex items-center justify-center space-x-2 px-4 py-2 border border-white/20 rounded-md hover:bg-surface-700 transition-colors duration-150 disabled:opacity-50"
                  >
                    <Icon name="Chrome" size={16} />
                    <span className="text-sm">Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialAuth('facebook')}
                    disabled={isLoading}
                    className="flex items-center justify-center space-x-2 px-4 py-2 border border-white/20 rounded-md hover:bg-surface-700 transition-colors duration-150 disabled:opacity-50"
                  >
                    <Icon name="Facebook" size={16} />
                    <span className="text-sm">Facebook</span>
                  </button>
                </div>
              </>
            )}

            <div className="text-center">
              {mode === 'signin' ? (
                <p className="text-sm text-text-secondary">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signup')}
                    className="text-secondary hover:text-secondary-400 transition-colors duration-150"
                  >
                    Sign up
                  </button>
                </p>
              ) : mode === 'signup' ? (
                <p className="text-sm text-text-secondary">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signin')}
                    className="text-secondary hover:text-secondary-400 transition-colors duration-150"
                  >
                    Sign in
                  </button>
                </p>
              ) : (
                <p className="text-sm text-text-secondary">
                  Remember your password?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signin')}
                    className="text-secondary hover:text-secondary-400 transition-colors duration-150"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Guest Access */}
        <div className="mt-6 text-center">
          <p className="text-sm text-text-secondary mb-2">
            Want to explore without an account?
          </p>
          <Link
            to="/home-dashboard"
            className="inline-flex items-center space-x-2 text-secondary hover:text-secondary-400 transition-colors duration-150"
          >
            <Icon name="Eye" size={16} />
            <span>Continue as Guest</span>
          </Link>
        </div>

        {/* Footer Links */}
        <FooterLinks />
      </div>
    </div>
  );
};

export default UserAuthentication;