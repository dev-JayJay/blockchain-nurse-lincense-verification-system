import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const menu = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Pending Verifiers", path: "/admin/verifiers" },
    { label: "Nurse Licenses", path: "/admin/licenses" },
    { label: "Profile", path: "/admin/profile" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">

      <div className="p-6 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
}
