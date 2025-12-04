import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { step1Schema, step2Schema } from "../../utils/validation";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Use the right schema depending on the step
  const currentSchema = step === 1 ? step1Schema : step2Schema;

  const methods = useForm({
    resolver: zodResolver(currentSchema),
    mode: "onTouched", // validate on blur
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger, // manually trigger validation
    reset,
  } = methods;

  const nextStep = async () => {
    const valid = await trigger(); // validate current step fields
    if (!valid) return;
    setStep(2);
  };

  const goBack = () => setStep(1);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/verifier/register`,
        data
      );
      toast.success("Registration submitted! Awaiting admin approval.");
      reset();
      setStep(1);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white w-full max-w-3xl p-8 rounded-xl shadow-lg">
        <a
          href="/"
          className="text-blue-600 text-lg hover:underline flex items-center gap-2 justify-start"
        >
          <ArrowLeft /> Back
        </a>

        <h1 className="text-3xl font-bold mb-2">Verifier Registration</h1>
        <p className="text-gray-600 mb-8">
          Submit your organization for approval
        </p>

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

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ------------------ STEP 1 ------------------ */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">
                    Organization Name *
                  </label>
                  <input {...register("orgName")} className="input" placeholder="Organization" />
                  {errors.orgName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.orgName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Organization Type *
                  </label>
                  <select {...register("orgType")} className="input">
                    <option value="">Select</option>
                    <option>Hospital</option>
                    <option>Clinic</option>
                    <option>Staffing Agency</option>
                  </select>
                  {errors.orgType && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.orgType.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    {...register("street")}
                    placeholder="Street"
                    className="input"
                  />
                  {errors.street && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.street.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("city")}
                    placeholder="City"
                    className="input"
                  />
                  {errors.city && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("state")}
                    placeholder="State"
                    className="input"
                  />
                  {errors.state && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("country")}
                    placeholder="Country"
                    className="input"
                  />
                  {errors.country && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("phone")}
                    placeholder="Phone"
                    className="input"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("email")}
                    placeholder="Email *"
                    className="input"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("website")}
                    placeholder="Website (optional)"
                    className="input"
                  />
                </div>
                <div>
                  <input
                    {...register("cacNumber")}
                    placeholder="CAC Number"
                    className="input"
                  />
                  {errors.cacNumber && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.cacNumber.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("tin")}
                    placeholder="TIN"
                    className="input"
                  />
                  {errors.tin && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.tin.message}
                    </p>
                  )}
                </div>

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
                <div>
                  <input
                    {...register("repFirstName")}
                    placeholder="Rep First Name"
                    className="input"
                  />
                  {errors.repFirstName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.repFirstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("repMiddleName")}
                    placeholder="Rep Middle Name"
                    className="input"
                  />
                </div>
                <div>
                  <input
                    {...register("repLastName")}
                    placeholder="Rep Last Name"
                    className="input"
                  />
                  {errors.repLastName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.repLastName.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("repTitle")}
                    placeholder="Rep Title"
                    className="input"
                  />
                </div>
                <div>
                  <input
                    {...register("repAddress")}
                    placeholder="Rep Address"
                    className="input"
                  />
                  {errors.repAddress && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.repAddress.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("repEmail")}
                    placeholder="Rep Email"
                    className="input"
                  />
                  {errors.repEmail && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.repEmail.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="Create Password"
                    className="input"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Confirm Password"
                    className="input"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2 flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={goBack}
                    className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold"
                  >
                    ← Back
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold disabled:bg-gray-400"
                  >
                    {loading ? "Submitting..." : "Submit Registration"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
