import { useState } from "react";

export default function VerifyLicense() {
  const [licenseId, setLicenseId] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = () => {
    // Simulate verification logic
    if (licenseId === "12345") {
      setResult({ status: "VALID", name: "Jane Doe", school: "Nursing College", issued: "2023-01-15", expiry: "2026-01-14" });
    } else {
      setResult({ status: "INVALID" });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Verify Nurse License</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <input
          type="text"
          value={licenseId}
          onChange={(e) => setLicenseId(e.target.value)}
          placeholder="Enter License ID"
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleVerify}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Verify
        </button>
      </div>

      {result && (
        <div
          className={`p-6 rounded-lg shadow ${
            result.status === "VALID" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {result.status === "VALID" ? (
            <>
              <h2 className="text-xl font-semibold text-green-800">License Valid</h2>
              <p className="text-gray-700">Name: {result.name}</p>
              <p className="text-gray-700">School: {result.school}</p>
              <p className="text-gray-700">Issued: {result.issued}</p>
              <p className="text-gray-700">Expiry: {result.expiry}</p>
            </>
          ) : (
            <h2 className="text-xl font-semibold text-red-800">
              License Invalid or Not Found
            </h2>
          )}
        </div>
      )}
    </div>
  );
}
