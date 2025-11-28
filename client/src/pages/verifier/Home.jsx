import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function VerifierHome() {
  const [stats, setStats] = useState({
    totalVerified: 0,
    successCount: 0,
    invalidCount: 0,
  });

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch metrics
    fetch("http://localhost:5000/api/verifier/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));

    // Fetch recent logs
    fetch("http://localhost:5000/api/verifier/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Welcome, Verifier!</h1>
      <p className="text-gray-600">
        Review your verification activity and track logs.
      </p>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Verifications</h2>
          <p className="mt-2 text-3xl font-bold">{stats.totalVerified}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Successful</h2>
          <p className="mt-2 text-3xl font-bold text-green-600">{stats.successCount}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Invalid Attempts</h2>
          <p className="mt-2 text-3xl font-bold text-red-600">{stats.invalidCount}</p>
        </div>
      </div>

      {/* LOG TABLE */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Verification Logs</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">License #</th>
              <th className="p-2">Status</th>
              <th className="p-2">Verifier</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-b">
                <td className="p-2">{log.licenseNumber}</td>
                <td
                  className={`p-2 font-semibold ${
                    log.status === "VALID" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {log.status}
                </td>
                <td className="p-2">{log.verifierOrg}</td>
                <td className="p-2">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}

            {logs.length === 0 && (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No verification logs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
