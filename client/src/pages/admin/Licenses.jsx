import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Licenses() {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch all licenses from backend
  const fetchLicenses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/nurses");
      const data = await res.json();
      setLicenses(data);
    } catch (e) {
      console.error("Failed to fetch licenses:", e);
    } finally {
      setLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    fetchLicenses();
  }, []);

  // 2️⃣ Update license status backend
  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/nurses/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      setLicenses((prev) =>
        prev.map((l) => (l.licenseNumber === id ? { ...l, licenseStatus: newStatus } : l))
      );
    } catch (e) {
      console.error(e);
    }
  };

  // 3️⃣ Revoke license
  const revokeLicense = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/nurses/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Revoked" }),
      });

      setLicenses((prev) =>
        prev.map((l) =>
          l.internalNurseId === id ? { ...l, licenseStatus: "Revoked" } : l
        )
      );
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <p>Loading licenses...</p>;

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Nurse Licenses</h1>
        <Link
          to="/admin/licenses/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add New License
        </Link>
      </div>

      {/* LICENSE TABLE */}
      <div className="bg-white shadow rounded-xl p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">License ID</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Expiry</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {licenses.map((l) => (
              <tr key={l.internalNurseId} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{l.internalNurseId}</td>
                <td className="p-3">{l.firstName} {l.lastName}</td>
                <td className="p-3">{l.licenseStatus}</td>
                <td className="p-3">{l.expiryDate}</td>

                {/* ACTION BUTTONS */}
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-3">

                    {/* View/Edit */}
                    <Link
                      to={`/admin/licenses/${l.internalNurseId}`}
                      className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      View
                    </Link>

                    {/* Change Status */}
                    <select
                      className="border rounded-lg px-2 py-1"
                      value={l.licenseStatus}
                      onChange={(e) => updateStatus(l.licenseNumber, e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Revoked">Revoked</option>
                      <option value="Probation">Probation</option>
                      <option value="Pending Renewal">Pending Renewal</option>
                    </select>

                    {/* REVOKE BUTTON */}
                    <button
                      onClick={() => revokeLicense(l.licenseNumber)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Revoke
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
