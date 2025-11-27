import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    orgName: "",
    orgType: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    cacNumber: "",
    tin: "",
    repFirstName: "",
    repMiddleName: "",
    repLastName: "",
    repTitle: "",
    repAddress: "",
    repEmail: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const nextStep = () => {
    if (!form.orgName || !form.orgType || !form.email) {
      toast.error("Please complete all required fields.");
      return;
    }
    setStep(2);
  };

  const goBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/verifier/register`,
        form
      );

      toast.success("Registration submitted! Awaiting admin approval.");
      setForm({});
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white w-full max-w-3xl p-8 rounded-xl shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">Verifier Registration</h1>
        <p className="text-gray-600 mb-8">
          Submit your organization for approval
        </p>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-8">
          <div
            className={`flex-1 text-center pb-2 border-b-4 ${
              step === 1 ? "border-blue-600 text-blue-600" : "border-gray-300"
            }`}
          >
            Step 1: Organization Info
          </div>
          <div
            className={`flex-1 text-center pb-2 border-b-4 ${
              step === 2 ? "border-blue-600 text-blue-600" : "border-gray-300"
            }`}
          >
            Step 2: Representative Info
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* ------------------ STEP 1 ------------------ */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">
                  Organization Name *
                </label>
                <input
                  name="orgName"
                  className="input"
                  value={form.orgName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Organization Type *
                </label>
                <select
                  name="orgType"
                  className="input"
                  value={form.orgType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option>Hospital</option>
                  <option>Clinic</option>
                  <option>Staffing Agency</option>
                </select>
              </div>

              <input
                name="street"
                placeholder="Street"
                className="input"
                onChange={handleChange}
              />
              <input
                name="city"
                placeholder="City"
                className="input"
                onChange={handleChange}
              />
              <input
                name="state"
                placeholder="State"
                className="input"
                onChange={handleChange}
              />
              <input
                name="country"
                placeholder="Country"
                className="input"
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone"
                className="input"
                onChange={handleChange}
              />
              <input
                name="email"
                placeholder="Email *"
                className="input"
                onChange={handleChange}
                required
              />
              <input
                name="website"
                placeholder="Website (optional)"
                className="input"
                onChange={handleChange}
              />

              <input
                name="cacNumber"
                placeholder="CAC Number"
                className="input"
                onChange={handleChange}
              />
              <input
                name="tin"
                placeholder="TIN"
                className="input"
                onChange={handleChange}
              />

              {/* NEXT button */}
              <div className="col-span-2 mt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Continue → Step 2
                </button>
              </div>
            </div>
          )}

          {/* ------------------ STEP 2 ------------------ */}
          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="repFirstName"
                placeholder="Rep First Name"
                className="input"
                onChange={handleChange}
                required
              />
              <input
                name="repMiddleName"
                placeholder="Rep Middle Name"
                className="input"
                onChange={handleChange}
              />
              <input
                name="repLastName"
                placeholder="Rep Last Name"
                className="input"
                onChange={handleChange}
                required
              />
              <input
                name="repTitle"
                placeholder="Rep Title"
                className="input"
                onChange={handleChange}
              />
              <input
                name="repAddress"
                placeholder="Rep Address"
                className="input"
                onChange={handleChange}
                required
              />
              <input
                name="repEmail"
                placeholder="Rep Email"
                className="input"
                onChange={handleChange}
                required
              />

              {/* Password fields */}
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                className="input"
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="input"
                onChange={handleChange}
                required
              />

              {/* Back + Submit */}
              <div className="col-span-2 flex justify-between mt-4">
                <button
                  type="button"
                  onClick={goBack}
                  className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold"
                >
                  ← Back
                </button>

                <button
                  disabled={loading}
                  className="px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold disabled:bg-gray-400"
                >
                  {loading ? "Submitting..." : "Submit Registration"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
