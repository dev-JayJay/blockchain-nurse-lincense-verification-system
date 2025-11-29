import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen w-full  bg-gray-100 p-6">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>

        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          {/* Full name */}
          <div className="space-y-1">
            <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
              Full Name
            </h2>
            <p className="text-lg text-gray-900 font-medium">
              {user.firstName} {user.lastName}
            </p>
          </div>

          {/* Username */}
          <div className="border-t pt-4 space-y-1">
            <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
              Username
            </h2>
            <p className="text-lg text-gray-900 font-medium">{user.username}</p>
          </div>

          {/* Email */}
          <div className="border-t pt-4 space-y-1">
            <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
              Email
            </h2>
            <p className="text-lg text-gray-900 font-medium">{user.email}</p>
          </div>

          {/* Department */}
          <div className="border-t pt-4 space-y-1">
            <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
              Department
            </h2>
            <p className="text-lg text-gray-900 font-medium">
              {user.department || "N/A"}
            </p>
          </div>

          {/* Role */}
          <div className="border-t pt-4 space-y-1">
            <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
              Role
            </h2>
            <p className="text-lg text-gray-900 font-medium capitalize">
              {user.role}
            </p>
          </div>

          <button
            onClick={logout}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
