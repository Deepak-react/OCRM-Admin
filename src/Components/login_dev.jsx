import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../api/constraints'; // Ensure this path is correct for your project

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Toggles password visibility in the input field
  const togglePassword = () => setShowPassword(prev => !prev);

  // Handles the login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoginError(''); // Clear any previous login errors
    setLoading(true); // Set loading state to true

    // Regular expressions for email and phone number validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    // --- Client-Side Input Validation ---
    if (!email.trim()) {
      setLoginError('Please enter your email or phone number.');
      setLoading(false);
      return;
    }

    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      setLoginError('Please enter a valid email address or 10-digit phone number.');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setLoginError('Please enter your password.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setLoginError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }
    // --- End Client-Side Input Validation ---

    try {
      // Make the API call to your login endpoint
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json(); // Parse the JSON response from the server

      // Check if the response was successful and contains a JWT token
      if (response.ok && data.jwtToken) {
        // --- Store Token and User Data in localStorage ---
        localStorage.setItem('token', data.jwtToken);

        // Store user data if provided by the backend
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          // Store profile image URL, default to empty string if not provided
          localStorage.setItem('profileImage', data.user.cProfile_pic || '');
        } else {
          console.warn("Login response did not contain user data in the 'user' field.");
          // Clear any stale user data if the new response doesn't provide it
          localStorage.removeItem('user');
          localStorage.removeItem('profileImage');
        }

        // --- Store Token in client-accessible Cookie ---
        // 'path=/': Makes the cookie available across the entire domain.
        // 'max-age': Sets the cookie to expire in 7 days (in seconds).
        // 'secure': Ensures the cookie is only sent over HTTPS.
        // 'samesite=Lax': Prevents the browser from sending the cookie with cross-site requests,
        //                 except for top-level navigations (good for security vs. Strict).
        document.cookie = `token=${data.jwtToken}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=Lax`;

        console.log("Login successful! Token stored in localStorage and cookies.");

        // --- Important: Global State/Context Update ---
        // If you are using React Context API, Redux, Zustand, etc. for global state:
        // This is where you would dispatch an action or update your context/store
        // to set the authenticated user's data and token across your entire application.
        // This ensures other components can access user info without re-reading localStorage.
        // Example: authContext.login({ user: data.user, token: data.jwtToken });

        // Navigate to the dashboard or leads page upon successful login
        navigate('/leads');

      } else {
        // If login failed (e.g., wrong credentials, server error message)
        setLoginError(data.message || 'Login failed. Please check your credentials and try again.');
      }

    } catch (error) {
      // Handle network errors or issues with the fetch request itself
      console.error("Login API call error:", error);
      setLoginError('An unexpected error occurred. Please check your internet connection and try again.');
    } finally {
      // Ensure loading state is always reset after the attempt
      setLoading(false);
    }
  };

  // Component to display login failure alerts
  const LoginFailedAlert = ({ message }) => (
    <div className="flex items-center gap-3 bg-red-50 border border-red-300 text-red-600 px-4 py-2 rounded-xl mt-4 shadow-sm animate-shake">
      <FaTimesCircle className="text-lg" />
      <span className="text-sm">{message}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8] px-4 relative">
      <div className="w-full max-w-[1100px] bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">

        {/* Left section: Illustration */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 flex justify-center items-center p-6">
          <img
            src="/images/login/login.png" // Ensure this image path is correct
            alt="Illustration of a person logging in"
            className="w-[250px] md:w-[300px] z-10"
          />
        </div>

        {/* Right section: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
          <div className="text-center mb-6">
            <h2 className="text-xl font-medium text-center text-gray-900">
              <span className="animate-waving-hand inline-block">👋</span> Hey There!
            </h2>
            <div className="text-lg text-gray-500 font-medium">Sign into your account</div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-gray-600 text-sm font-medium block mb-1" htmlFor="email">Email or Phone</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="example@domain.com or 9876543210"
                autoComplete="username" // Suggests browser to autofill username/email
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium block mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="••••••••"
                  autoComplete="current-password" // Suggests browser to autofill password
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute top-2/4 right-3 -translate-y-1/2 text-gray-500 p-1 rounded-full hover:bg-gray-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={loading} // Disable button when loading
                className={`w-36 bg-blue-600 text-white py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:bg-blue-700 ${
                  loading ? 'opacity-60 cursor-not-allowed' : '' // Styling for disabled state
                }`}
              >
                {loading ? (
                  // Loading spinner SVG
                  <svg className="animate-spin h-5 w-5 mx-auto text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Login'
                )}
              </button>
              {loginError && <LoginFailedAlert message={loginError} />} {/* Display error if exists */}
            </div>
          </form>
        </div>
      </div>

      {/* Tailwind CSS @apply and keyframes for animations */}
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }

        @keyframes wave {
          0% { transform: rotate(0.0deg); }
          10% { transform: rotate(14.0deg); }
          20% { transform: rotate(-8.0deg); }
          30% { transform: rotate(14.0deg); }
          40% { transform: rotate(-4.0deg); }
          50% { transform: rotate(10.0deg); }
          60% { transform: rotate(0.0deg); }
          100% { transform: rotate(0.0deg); }
        }

        .animate-waving-hand {
          display: inline-block;
          transform-origin: 70% 70%;
          animation: wave 2s infinite;
        }
      `}</style>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center w-full text-gray-400 text-sm">
        © {new Date().getFullYear()} <a href="https://www.inklidox.com" className="hover:underline" target="_blank" rel="noopener noreferrer">Inklidox Technologies</a> · V1.5
      </footer>
    </div>
  );
};

export default LoginPage;