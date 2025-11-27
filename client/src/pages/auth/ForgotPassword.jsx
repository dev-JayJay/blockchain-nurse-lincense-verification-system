import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would trigger your backend API call
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Forgot Password
        </h1>
        <p className="text-gray-600 text-center">
          Enter your email and we will send you a link to reset your password.
        </p>

        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
            If an account with that email exists, a password reset link has been sent!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your-email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <div className="text-center">
          <a href="/login" className="text-blue-600 hover:underline text-sm">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
