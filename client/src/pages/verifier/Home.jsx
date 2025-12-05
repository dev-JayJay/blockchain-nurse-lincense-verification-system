import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VerifierHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalVerified: 0,
    successCount: 0,
    invalidCount: 0,
  });

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch metrics
    fetch(`http://localhost:5000/api/verifier/stats/${user._id}`)
      .then((res) => res.json())
      .then((data) => setStats(data));

    // Fetch recent logs
    fetch(`http://localhost:5000/api/verifier/logs/${user._id}`)
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, {user.rep.firstName ?? ""} {user.rep.middleName ?? ""}{" "}
        {user.rep.lastName ?? ""}!
      </h1>
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
          <p className="mt-2 text-3xl font-bold text-green-600">
            {stats.successCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Invalid Attempts</h2>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {stats.invalidCount}
          </p>
        </div>
      </div>

      {/* LOG TABLE */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Verification Logs</h2>

          <button
            onClick={() => navigate("/verifier/logs")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View All Logs →
          </button>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">License #</th>
              <th className="p-2">Status</th>
              {/* <th className="p-2">Verifier</th> */}
              <th className="p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-b">
                <td className="p-2">{log.licenseNumber}</td>
                <td
                  className={`p-2 font-semibold capitalize ${
                    log.status === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {log.status}
                </td>
                {/* <td className="p-2">{log.verifierOrg}</td> */}
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
