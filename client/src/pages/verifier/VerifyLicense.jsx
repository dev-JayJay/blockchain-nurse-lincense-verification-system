import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function VerifyLicense() {
    const { user } = useAuth();
    console.log("this is the user", user);
  const [licenseId, setLicenseId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString();
  };

  const handleVerify = async () => {
    if (!user) return;
    if (!licenseId.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`http://localhost:5000/api/nurses/${licenseId}/${user.id}`);

      if (!res.ok) {
        setResult({ status: "INVALID" });
        setLoading(false);
        return;
      }

      const data = await res.json();

      setResult({
        status: data.licenseStatus,
        fullName: `${data.firstName} ${data.middleName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        idType: data.idType,
        idNumber: data.idNumber,

        address: `${data.address}, ${data.city}, ${data.state}`,

        licenseNumber: data.licenseNumber,
        licenseType: data.licenseType,
        issueDate: data.issueDate,
        expiryDate: data.expiryDate,

        education: data.education,
        certifications: data.certifications,
      });
    } catch (err) {
      console.error(err);
      setResult({ status: "INVALID" });
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Verify Nurse License</h1>

      {/* SEARCH BOX */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <input
          type="text"
          value={licenseId}
          onChange={(e) => setLicenseId(e.target.value)}
          placeholder="Enter License Number"
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleVerify}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>

      {/* RESULT */}
      {result && (
        <div
          className={`p-6 rounded-lg shadow ${
            result.status === "Active"
              ? "bg-green-100"
              : result.status === "Inactive"
              ? "bg-yellow-100"
              : "bg-red-100"
          }`}
        >
          {result.status === "INVALID" ? (
            <h2 className="text-xl font-semibold text-red-800">
              License Invalid or Not Found
            </h2>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">
                License Status:{" "}
                <span
                  className={
                    result.status === "Active"
                      ? "text-green-700"
                      : result.status === "Inactive"
                      ? "text-yellow-700"
                      : "text-red-700"
                  }
                >
                  {result.status}
                </span>
              </h2>

              {/* BASIC LICENSE INFO */}
              <div className="bg-white p-5 rounded shadow mb-4">
                <h3 className="font-semibold text-lg mb-2">License Details</h3>
                <p><strong>License Number:</strong> {result.licenseNumber}</p>
                <p><strong>Type:</strong> {result.licenseType}</p>
                <p><strong>Issued:</strong> {formatDate(result.issueDate)}</p>
                <p><strong>Expiry:</strong> {formatDate(result.expiryDate)}</p>
              </div>

              {/* PERSONAL INFORMATION */}
              <div className="bg-white p-5 rounded shadow mb-4">
                <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                <p><strong>Name:</strong> {result.fullName}</p>
                <p><strong>Email:</strong> {result.email}</p>
                <p><strong>Phone:</strong> {result.phone}</p>
                <p><strong>Date of Birth:</strong> {formatDate(result.dob)}</p>
                <p><strong>ID Type:</strong> {result.idType}</p>
                <p><strong>ID Number:</strong> {result.idNumber}</p>
                <p><strong>Address:</strong> {result.address}</p>
              </div>

              {/* EDUCATION */}
              <div className="bg-white p-5 rounded shadow mb-4">
                <h3 className="font-semibold text-lg mb-2">Education</h3>

                {result.education.length === 0 ? (
                  <p>—</p>
                ) : (
                  result.education.map((edu) => (
                    <div key={edu._id} className="mb-2">
                      <p><strong>Institution:</strong> {edu.institution}</p>
                      <p><strong>Degree:</strong> {edu.degree}</p>
                      <p><strong>Graduation:</strong> {formatDate(edu.graduationDate)}</p>
                    </div>
                  ))
                )}
              </div>

              {/* CERTIFICATIONS */}
              <div className="bg-white p-5 rounded shadow">
                <h3 className="font-semibold text-lg mb-2">Certifications</h3>
                {result.certifications.length > 0 ? (
                  <ul className="list-disc ml-5">
                    {result.certifications.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <p>—</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
