import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Verifier Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        {/* Organization Name */}
        <div className="space-y-1">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
            Organization Name
          </h2>
          <p className="text-lg text-gray-900 font-medium">{user.orgName}</p>
        </div>

        {/* Organization Type */}
        <div className="border-t pt-4 space-y-1">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
            Organization Type
          </h2>
          <p className="text-lg text-gray-900 font-medium">{user.orgType}</p>
        </div>

        {/* Contact Person */}
        <div className="border-t pt-4 space-y-1">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
            Contact Person
          </h2>
          <p className="text-lg text-gray-900 font-medium">
            {user.rep.firstName ?? ""} {user.rep.middleName ?? ""}{" "}
            {user.rep.lastName ?? ""}
          </p>
        </div>

        {/* Email */}
        <div className="border-t pt-4 space-y-1">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
            Email
          </h2>
          <p className="text-lg text-gray-900 font-medium">{user.email}</p>
        </div>

        {/* Phone */}
        <div className="border-t pt-4 space-y-1">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
            Phone
          </h2>
          <p className="text-lg text-gray-900 font-medium">{user.phone}</p>
        </div>

        {/* Address */}
        <div className="border-t pt-4 space-y-1">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
            Address
          </h2>
          <p className="text-lg text-gray-900 font-medium">{user.address}</p>
        </div>

        {/* Status */}
        <div className="border-t pt-4 space-y-1">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
            Account Status
          </h2>
          <span
            className={`px-3 py-1 rounded text-sm font-medium ${
              user.status === "approved"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {user.status}
          </span>
        </div>
        <button
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
