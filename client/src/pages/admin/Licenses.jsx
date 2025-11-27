import { useState } from "react";
import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";

const dummyLicenses = [
  { id: "LNC-001", name: "Sarah John", status: "Active", expiry: "2025-06-15" },
  { id: "LNC-002", name: "Jane Doe", status: "Expired", expiry: "2023-04-10" },
];

export default function Licenses() {
  const [licenses, setLicenses] = useState(dummyLicenses);

  const updateStatus = (id, newStatus) => {
    setLicenses((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  const revokeLicense = (id) => {
    setLicenses((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: "Revoked" } : l
      )
    );
  };

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
              <tr key={l.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{l.id}</td>
                <td className="p-3">{l.name}</td>
                <td className="p-3">{l.status}</td>
                <td className="p-3">{l.expiry}</td>

                {/* ACTION BUTTONS */}
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-3">

                    {/* View/Edit */}
                    <Link
                      to={`/admin/licenses/${l.id}`}
                      className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      View
                    </Link>

                    {/* Change Status */}
                    <select
                      className="border rounded-lg px-2 py-1"
                      value={l.status}
                      onChange={(e) => updateStatus(l.id, e.target.value)}
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
                      onClick={() => revokeLicense(l.id)}
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
