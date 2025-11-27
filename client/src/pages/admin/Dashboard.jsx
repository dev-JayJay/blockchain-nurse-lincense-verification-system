import { Users, UserPlus, ShieldCheck, Clock, UserCog, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">System overview and quick actions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-white rounded-xl shadow flex items-center gap-4">
          <Clock size={40} className="text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Pending Verifiers</h2>
            <p className="text-3xl font-bold text-blue-600 mt-1">12</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow flex items-center gap-4">
          <ShieldCheck size={40} className="text-green-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Active Verifiers</h2>
            <p className="text-3xl font-bold text-green-600 mt-1">34</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow flex items-center gap-4">
          <FileCheck size={40} className="text-purple-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Registered Licenses</h2>
            <p className="text-3xl font-bold text-purple-600 mt-1">780</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link to="/admin/licenses/new" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-5 flex flex-col items-center shadow">
            <UserPlus size={32} />
            <span className="mt-2 font-semibold">Add Nurse</span>
          </Link>

          <Link to="/admin/add-admin" className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-5 flex flex-col items-center shadow">
            <UserCog size={32} />
            <span className="mt-2 font-semibold">Add Admin</span>
          </Link>

          <Link to="/admin/licenses" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-5 flex flex-col items-center shadow">
            <Users size={32} />
            <span className="mt-2 font-semibold">Manage Nurses</span>
          </Link>

          <Link to="/admin/verifiers" className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-5 flex flex-col items-center shadow">
            <ShieldCheck size={32} />
            <span className="mt-2 font-semibold">Manage Verifiers</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>

        <ul className="space-y-3 text-gray-700">
          <li className="border-b pb-3">
            • Verifier <span className="font-semibold">Medix Hospital</span> submitted registration.
          </li>
          <li className="border-b pb-3">
            • Nurse <span className="font-semibold">Jane Doe</span> added by Admin.
          </li>
          <li>
            • Admin approved license renewal for <span className="font-semibold">RN-09231</span>.
          </li>
        </ul>
      </div>

    </div>
  );
}
