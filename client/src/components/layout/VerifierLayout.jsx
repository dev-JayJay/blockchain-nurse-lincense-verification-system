import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function VerifierLayout() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Home", to: "/verifier/home" },
    { label: "Verify License", to: "/verifier/verify" },
    { label: "Profile", to: "/verifier/profile" },
  ];

  

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ---------------- SIDEBAR (DESKTOP) ---------------- */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg px-4 py-6">
        <h2 className="text-xl font-bold mb-8 text-blue-600">Verifier Portal</h2>

        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition 
                ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ---------------- MOBILE SIDEBAR ---------------- */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg px-4 py-6 z-50 transform md:hidden transition
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-blue-600">Verifier Portal</h2>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition 
                ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white shadow-md h-16 flex items-center justify-between px-4 md:px-6">
          {/* Mobile menu button */}
          <button onClick={() => setOpen(true)} className="md:hidden">
            <Menu size={26} />
          </button>

          {/* Center title or dynamic */}
          <h1 className="font-semibold text-xl text-gray-800">Verifier Panel</h1>

          {/* User avatar */}
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
