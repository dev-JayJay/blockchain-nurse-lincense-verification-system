import { useState } from "react";
import axios from "axios";

/**
 * Admin AddLicense multi-step form
 * Place in: src/pages/admin/AddLicense.jsx
 *
 * Notes:
 * - Replace console.log in handleSubmit with real API call.
 * - Dates are captured as yyyy-mm-dd by native <input type="date"> but the UI shows a hint for DD/MM/YYYY.
 * - Education entries are dynamic and can be added/removed.
 */

const ID_TYPES = [
  "National ID",
  "Driver’s License",
  "Passport",
  "Voter’s Card",
];
const LICENSE_TYPES = [
  "Registered Nurse (RN)",
  "Licensed Practical Nurse (LPN)",
  "Advanced Practice Registered Nurse (APRN)",
  "Nurse Educator",
  "Nurse Specialist",
  "Others",
];
const LICENSE_STATUSES = [
  "Active",
  "Inactive",
  "Suspended",
  "Revoked",
  "Probation",
  "Pending Renewal",
];
const CERTIFICATIONS = [
  "Pediatric Nursing",
  "Psychiatric Nursing",
  "Peri-operative Nursing",
];

function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

export default function AddLicense() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    // Section 1: Nurse Identification
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    idType: ID_TYPES[0],
    idNumber: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",

    // Section 2: License & Registration
    licenseType: LICENSE_TYPES[0],
    licenseNumber: "",
    issueDate: "",
    expiryDate: "",
    licenseStatus: LICENSE_STATUSES[0],

    // Section 3: Qualifications & History
    education: [
      { id: Date.now(), institution: "", degree: "", graduationDate: "" },
    ],
    certifications: [],

    // Section 4: System/Admin fields
    internalNurseId: "",
    walletAddress: "",
    attestation: false,
    adminESignature: "",
    // auto-captured (display-only)
    adminUsername: "admin.user", // placeholder - auto-filled in real system
    adminStaffId: "STAFF-001",
    adminTitle: "Registrar",
    adminDepartment: "Licensing",
    adminTimestamp: new Date().toISOString(),
    adminIP: "", // optional
  });

  const [errors, setErrors] = useState({});

  // Helper to update form fields
  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  // Education entries handlers
  const addEducation = () =>
    setForm((f) => ({
      ...f,
      education: [
        ...f.education,
        { id: Date.now(), institution: "", degree: "", graduationDate: "" },
      ],
    }));

  const updateEducation = (id, key, value) =>
    setForm((f) => ({
      ...f,
      education: f.education.map((e) =>
        e.id === id ? { ...e, [key]: value } : e
      ),
    }));

  const removeEducation = (id) =>
    setForm((f) => ({
      ...f,
      education: f.education.filter((e) => e.id !== id),
    }));

  // Validation for each step
  const validateStep = (s = step) => {
    const newErrors = {};

    if (s === 1) {
      if (!form.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!form.dob) newErrors.dob = "Date of birth is required";
      if (!form.idNumber.trim()) newErrors.idNumber = "ID number is required";
      if (!form.email.trim()) newErrors.email = "Email is required";
      if (!form.phone.trim()) newErrors.phone = "Phone number is required";
      if (!form.address.trim())
        newErrors.address = "Contact address is required";
      if (!form.city.trim()) newErrors.city = "City is required";
      if (!form.state.trim()) newErrors.state = "State is required";
    }

    if (s === 2) {
      if (!form.licenseType) newErrors.licenseType = "License type is required";
      if (!form.licenseNumber.trim())
        newErrors.licenseNumber = "License number is required";
      if (!form.issueDate) newErrors.issueDate = "Issue date is required";
      if (!form.expiryDate) newErrors.expiryDate = "Expiry date is required";
      if (!form.licenseStatus)
        newErrors.licenseStatus = "License status is required";
    }

    if (s === 3) {
      // Basic validation: at least one education institution and all required fields filled
      form.education.forEach((edu, idx) => {
        if (!edu.institution.trim())
          newErrors[`education.${edu.id}.institution`] = "Institution required";
        if (!edu.degree.trim())
          newErrors[`education.${edu.id}.degree`] = "Degree required";
        if (!edu.graduationDate)
          newErrors[`education.${edu.id}.graduationDate`] =
            "Graduation date required";
      });
    }

    if (s === 4) {
      if (!form.internalNurseId.trim())
        newErrors.internalNurseId = "Internal Nurse ID is required";
      if (!form.walletAddress.trim())
        newErrors.walletAddress = "Wallet address is required";
      if (!form.attestation) newErrors.attestation = "Attestation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => s + 1);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate steps
    let allValid = true;
    for (let s = 1; s <= 4; s++) {
      if (!validateStep(s)) {
        allValid = false;
        setStep(s);
        return;
      }
    }

    try {
      const payload = { ...form };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/nurses`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.data;

      if (!data.success) {
        alert("Failed: " + data.message);
        return;
      }

      alert("Nurse registered! Blockchain Tx: " + data.blockchainTx);
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  // Small UI helpers
  const hasError = (field) => errors[field];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Register Nurse License
      </h1>

      {/* Stepper */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex-1">
              <div
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  step === n ? "bg-blue-600 text-white" : "bg-white border"
                }`}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                  {n}
                </div>
                <div className="text-sm">
                  {n === 1 && (
                    <div className="font-medium">Nurse Identification</div>
                  )}
                  {n === 2 && (
                    <div className="font-medium">License Details</div>
                  )}
                  {n === 3 && <div className="font-medium">Qualifications</div>}
                  {n === 4 && <div className="font-medium">System & Admin</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1 */}
        {step === 1 && (
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Nurse Identification Data
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <FieldLabel required>First Name</FieldLabel>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={(e) => update({ firstName: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("firstName") ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {hasError("firstName") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.firstName}
                  </div>
                )}
              </div>

              <div>
                <FieldLabel>Middle Name</FieldLabel>
                <input
                  name="middleName"
                  value={form.middleName}
                  onChange={(e) => update({ middleName: e.target.value })}
                  className="mt-1 w-full p-2 border rounded border-gray-300"
                />
              </div>

              <div>
                <FieldLabel required>Last Name</FieldLabel>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={(e) => update({ lastName: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("lastName") ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {hasError("lastName") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <FieldLabel required>
                  Date of Birth{" "}
                  <span className="text-xs text-gray-500 font-normal">
                    {" "}
                    (DD/MM/YYYY)
                  </span>
                </FieldLabel>
                <input
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={(e) => update({ dob: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("dob") ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {hasError("dob") && (
                  <div className="text-red-600 text-sm mt-1">{errors.dob}</div>
                )}
              </div>

              <div>
                <FieldLabel required>ID Type</FieldLabel>
                <select
                  name="idType"
                  value={form.idType}
                  onChange={(e) => update({ idType: e.target.value })}
                  className="mt-1 w-full p-2 border rounded border-gray-300"
                >
                  {ID_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel required>ID Number</FieldLabel>
                <input
                  name="idNumber"
                  value={form.idNumber}
                  onChange={(e) => update({ idNumber: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("idNumber") ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {hasError("idNumber") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.idNumber}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <FieldLabel required>Email Address</FieldLabel>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update({ email: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("email") ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {hasError("email") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <FieldLabel required>Phone Number</FieldLabel>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("phone") ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {hasError("phone") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.phone}
                  </div>
                )}
              </div>

              <div>
                <FieldLabel required>Contact Address</FieldLabel>
                <input
                  name="address"
                  value={form.address}
                  onChange={(e) => update({ address: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("address") ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {hasError("address") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.address}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <FieldLabel required>City</FieldLabel>
                <input
                  name="city"
                  value={form.city}
                  onChange={(e) => update({ city: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("city") ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {hasError("city") && (
                  <div className="text-red-600 text-sm mt-1">{errors.city}</div>
                )}
              </div>

              <div>
                <FieldLabel required>State</FieldLabel>
                <input
                  name="state"
                  value={form.state}
                  onChange={(e) => update({ state: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("state") ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {hasError("state") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.state}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2 */}
        {step === 2 && (
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              License & Registration Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel required>License Type</FieldLabel>
                <select
                  name="licenseType"
                  value={form.licenseType}
                  onChange={(e) => update({ licenseType: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("licenseType")
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  {LICENSE_TYPES.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
                {hasError("licenseType") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.licenseType}
                  </div>
                )}
              </div>

              <div>
                <FieldLabel required>License Number</FieldLabel>
                <input
                  name="licenseNumber"
                  value={form.licenseNumber}
                  onChange={(e) => update({ licenseNumber: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("licenseNumber")
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {hasError("licenseNumber") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.licenseNumber}
                  </div>
                )}
              </div>

              <div>
                <FieldLabel required>Date of Issue</FieldLabel>
                <input
                  type="date"
                  name="issueDate"
                  value={form.issueDate}
                  onChange={(e) => update({ issueDate: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("issueDate") ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {hasError("issueDate") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.issueDate}
                  </div>
                )}
              </div>

              <div>
                <FieldLabel required>Expiration Date</FieldLabel>
                <input
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={(e) => update({ expiryDate: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("expiryDate")
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {hasError("expiryDate") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.expiryDate}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <FieldLabel required>License Status</FieldLabel>
                <select
                  name="licenseStatus"
                  value={form.licenseStatus}
                  onChange={(e) => update({ licenseStatus: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("licenseStatus")
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  {LICENSE_STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {hasError("licenseStatus") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.licenseStatus}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3 */}
        {step === 3 && (
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Professional Qualifications & History
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Education Details</h3>
                <button
                  type="button"
                  onClick={addEducation}
                  className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
                >
                  + Add Education
                </button>
              </div>

              <div className="space-y-4">
                {form.education.map((edu) => (
                  <div key={edu.id} className="border p-4 rounded">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <FieldLabel required>Institution Name</FieldLabel>
                        <input
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(
                              edu.id,
                              "institution",
                              e.target.value
                            )
                          }
                          className={`mt-1 w-full p-2 border rounded ${
                            errors[`education.${edu.id}.institution`]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors[`education.${edu.id}.institution`] && (
                          <div className="text-red-600 text-sm mt-1">
                            {errors[`education.${edu.id}.institution`]}
                          </div>
                        )}
                      </div>

                      <div>
                        <FieldLabel required>Degree / Diploma</FieldLabel>
                        <input
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(edu.id, "degree", e.target.value)
                          }
                          className={`mt-1 w-full p-2 border rounded ${
                            errors[`education.${edu.id}.degree`]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors[`education.${edu.id}.degree`] && (
                          <div className="text-red-600 text-sm mt-1">
                            {errors[`education.${edu.id}.degree`]}
                          </div>
                        )}
                      </div>

                      <div>
                        <FieldLabel required>Graduation Date</FieldLabel>
                        <input
                          type="date"
                          value={edu.graduationDate}
                          onChange={(e) =>
                            updateEducation(
                              edu.id,
                              "graduationDate",
                              e.target.value
                            )
                          }
                          className={`mt-1 w-full p-2 border rounded ${
                            errors[`education.${edu.id}.graduationDate`]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors[`education.${edu.id}.graduationDate`] && (
                          <div className="text-red-600 text-sm mt-1">
                            {errors[`education.${edu.id}.graduationDate`]}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end gap-2">
                      {form.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEducation(edu.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <FieldLabel>Certifications / Specializations</FieldLabel>
                <div className="mt-2 flex flex-wrap gap-2">
                  {CERTIFICATIONS.map((c) => (
                    <label
                      key={c}
                      className={`px-3 py-1 border rounded cursor-pointer ${
                        form.certifications.includes(c)
                          ? "bg-blue-600 text-white"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.certifications.includes(c)}
                        onChange={(e) => {
                          if (e.target.checked)
                            update({
                              certifications: [...form.certifications, c],
                            });
                          else
                            update({
                              certifications: form.certifications.filter(
                                (x) => x !== c
                              ),
                            });
                        }}
                        className="hidden"
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4 */}
        {step === 4 && (
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              System Data & Administrative Controls
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel required>Internal Nurse ID</FieldLabel>
                <input
                  name="internalNurseId"
                  value={form.internalNurseId}
                  onChange={(e) => update({ internalNurseId: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("internalNurseId")
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {hasError("internalNurseId") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.internalNurseId}
                  </div>
                )}
              </div>

              <div>
                <FieldLabel required>
                  System Wallet Address (Public Key)
                </FieldLabel>
                <input
                  name="walletAddress"
                  value={form.walletAddress}
                  onChange={(e) => update({ walletAddress: e.target.value })}
                  className={`mt-1 w-full p-2 border rounded ${
                    hasError("walletAddress")
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {hasError("walletAddress") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.walletAddress}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center gap-3">
                  <input
                    id="attest"
                    type="checkbox"
                    checked={form.attestation}
                    onChange={(e) => update({ attestation: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <label htmlFor="attest" className="text-sm">
                    I confirm that all information entered is accurate and has
                    been verified according to regulatory standards.
                  </label>
                </div>
                {hasError("attestation") && (
                  <div className="text-red-600 text-sm mt-1">
                    {errors.attestation}
                  </div>
                )}
              </div>

              <div>
                <FieldLabel>Admin E-signature (optional)</FieldLabel>
                <input
                  name="adminESignature"
                  value={form.adminESignature}
                  onChange={(e) => update({ adminESignature: e.target.value })}
                  className="mt-1 w-full p-2 border rounded border-gray-300"
                />
              </div>

              <div>
                <FieldLabel>Auto-captured: Admin Username</FieldLabel>
                <input
                  readOnly
                  value={form.adminUsername}
                  className="mt-1 w-full p-2 border rounded bg-gray-50"
                />
              </div>

              <div>
                <FieldLabel>Auto-captured: Staff ID</FieldLabel>
                <input
                  readOnly
                  value={form.adminStaffId}
                  className="mt-1 w-full p-2 border rounded bg-gray-50"
                />
              </div>

              <div>
                <FieldLabel>Official Title</FieldLabel>
                <input
                  readOnly
                  value={form.adminTitle}
                  className="mt-1 w-full p-2 border rounded bg-gray-50"
                />
              </div>

              <div>
                <FieldLabel>Department</FieldLabel>
                <input
                  readOnly
                  value={form.adminDepartment}
                  className="mt-1 w-full p-2 border rounded bg-gray-50"
                />
              </div>

              <div>
                <FieldLabel>Date & Time of Entry</FieldLabel>
                <input
                  readOnly
                  value={new Date(form.adminTimestamp).toLocaleString()}
                  className="mt-1 w-full p-2 border rounded bg-gray-50"
                />
              </div>

              <div>
                <FieldLabel>IP Address / Device (optional)</FieldLabel>
                <input
                  name="adminIP"
                  value={form.adminIP}
                  onChange={(e) => update({ adminIP: e.target.value })}
                  className="mt-1 w-full p-2 border rounded border-gray-300"
                />
              </div>
            </div>
          </section>
        )}

        {/* REVIEW STEP */}
        {step === 5 && (
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Review & Submit</h2>

            <div className="space-y-3 text-sm text-gray-800">
              <div>
                <strong>Nurse:</strong> {form.firstName} {form.middleName}{" "}
                {form.lastName}
              </div>
              <div>
                <strong>DOB:</strong> {form.dob || "—"}
              </div>
              <div>
                <strong>ID:</strong> {form.idType} — {form.idNumber}
              </div>
              <div>
                <strong>License:</strong> {form.licenseType} —{" "}
                {form.licenseNumber} ({form.licenseStatus})
              </div>
              <div>
                <strong>Education entries:</strong>
                <ul className="list-disc ml-6">
                  {form.education.map((e) => (
                    <li key={e.id}>
                      {e.institution} — {e.degree} — {e.graduationDate}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Internal Nurse ID:</strong> {form.internalNurseId}
              </div>
              <div>
                <strong>Wallet Address:</strong>{" "}
                <span className="break-all">{form.walletAddress}</span>
              </div>
              <div>
                <strong>Attestation:</strong> {form.attestation ? "Yes" : "No"}
              </div>
            </div>
          </section>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-4">
          <div>
            {step > 1 && step <= 5 && (
              <button
                type="button"
                onClick={back}
                className="px-4 py-2 border rounded-lg"
              >
                Back
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {step < 4 && (
              <button
                type="button"
                onClick={next}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Next
              </button>
            )}

            {step === 4 && (
              <button
                type="button"
                onClick={() => {
                  if (validateStep(4)) setStep(5);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Review
              </button>
            )}

            {step === 5 && (
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Submit License
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
