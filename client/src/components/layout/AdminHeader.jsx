import { useAuth } from "../../context/AuthContext";

export default function AdminHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">

      <h1 className="text-lg font-semibold">Regulatory Admin</h1>

      <div className="flex items-center gap-4">
        <span className="font-medium">{user?.name || "Admin"}</span>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>

    </header>
  );
}
