import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AllLogs() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/verifier/logs/${user._id}`)
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredLogs =
    activeTab === "all"
      ? logs
      : logs.filter((log) => log.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Verification Logs</h1>

        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => navigate("/verifier/home")}
        >
          ← Back
        </button>
      </div>

      {/* TABS */}
      <div className="flex space-x-4 pb-2">
        {["all", "success", "invalid"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold capitalize ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* LOG TABLE */}
      <div className="bg-white p-6 rounded-lg shadow max-h-[600px] overflow-y-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">License #</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="p-3 text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-3 text-center text-gray-500">
                  No logs found.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log._id} className="border-b">
                  <td className="p-2">{log.licenseNumber}</td>

                  <td
                    className={`p-2 font-semibold capitalize ${
                      log.status === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {log.status}
                  </td>

                  <td className="p-2">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
