import { Link } from "react-router-dom";
import { ShieldCheck, FileCheck, Users, ArrowRight, UserCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* NAVBAR */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-5">
          <h1 className="text-2xl font-bold text-blue-700">Nurse License Verification System</h1>

          <div className="flex items-center gap-6 text-gray-700 font-medium">
            {/* <Link to="/" className="hover:text-blue-600">Home</Link> */}
            {/* <Link to="/verify" className="hover:text-blue-600">Verify License</Link> */}
            <Link to="/login" className="hover:text-blue-600">Login</Link>
            <Link to="/verifier/register" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">Get Started</Link>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-5 py-20 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Trusted & Secure <span className="text-blue-600">Nurse License Verification</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A blockchain-powered platform ensuring authenticity, transparency, and real-time verification of nursing credentials.
          </p>

          <div className="flex gap-4 mt-8">
            <Link to="/verify" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center gap-2 font-medium">
              Login to Verify License <ArrowRight size={18} />
            </Link>
            <Link to="/verifier/register" className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-6 rounded-lg font-medium">
              Register
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
            alt="Nurse illustration"
            className="w-96 mx-auto drop-shadow-lg"
          />
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h3 className="text-3xl font-bold text-gray-900">Why Choose Nurse License Verification System?</h3>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Our system leverages blockchain technology to ensure the highest level of security and trust in healthcare credential verification.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
              <ShieldCheck size={45} className="text-blue-600" />
              <h4 className="mt-4 font-semibold text-xl">Tamper-Proof Records</h4>
              <p className="mt-2 text-gray-600">Blockchain ensures every verification is immutable and transparent.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
              <FileCheck size={45} className="text-green-600" />
              <h4 className="mt-4 font-semibold text-xl">Instant Verification</h4>
              <p className="mt-2 text-gray-600">Organizations can verify nurse licenses instantly and securely.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
              <Users size={45} className="text-purple-600" />
              <h4 className="mt-4 font-semibold text-xl">Multi-User Access</h4>
              <p className="mt-2 text-gray-600">Admins, and verifiers each get tailored dashboards.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h3 className="text-3xl font-bold">Start Using Nurse License Verification System Today</h3>
        <p className="mt-3 text-lg opacity-90">Secure. Transparent. Fast. A new standard for healthcare verification.</p>
        <Link
          to="/verifier/register"
          className="mt-6 inline-block bg-white text-blue-700 font-semibold py-3 px-8 rounded-lg shadow hover:bg-gray-100"
        >
          Create Account
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10 text-center">
        <p>&copy; {new Date().getFullYear()} NurseChain. All rights reserved.</p>
      </footer>

    </div>
  );
}