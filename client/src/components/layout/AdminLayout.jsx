import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg fixed h-screen">
        <AdminSidebar />
      </aside>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex-1 flex flex-col bg-gray-100 ml-64">

        {/* HEADER */}
        <AdminHeader />

        {/* PAGE CONTENT */}
        <main className="p-6 overflow-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
