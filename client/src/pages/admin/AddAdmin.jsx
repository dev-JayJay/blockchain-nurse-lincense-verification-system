import { useState } from "react";
import axios from "axios";

function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

export default function AddAdmin() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "",
    department: "",
    permissions: [],
  });

  const [errors, setErrors] = useState({});

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    if (!form.role.trim()) newErrors.role = "Role/Designation is required";
    if (!form.department.trim())
      newErrors.department = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const token = localStorage.getItem("token"); // JWT token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin`,
        form,
        config
      );

      toast.success(`Admin added successfully: ${response.data.username}`);
      if (response.status == 201) {
        setForm({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          role: "",
          department: "",
          permissions: [],
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add admin");
    }
  };

  const hasError = (field) => errors[field];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Admin</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FieldLabel required>First Name</FieldLabel>
            <input
              value={form.firstName}
              onChange={(e) => update({ firstName: e.target.value })}
              className={`mt-1 w-full p-2 border rounded ${
                hasError("firstName") ? "border-red-500" : "border-gray-300"
              }`}
            />
            {hasError("firstName") && (
              <div className="text-red-600 text-sm mt-1">
                {errors.firstName}
              </div>
            )}
          </div>

          <div>
            <FieldLabel required>Last Name</FieldLabel>
            <input
              value={form.lastName}
              onChange={(e) => update({ lastName: e.target.value })}
              className={`mt-1 w-full p-2 border rounded ${
                hasError("lastName") ? "border-red-500" : "border-gray-300"
              }`}
            />
            {hasError("lastName") && (
              <div className="text-red-600 text-sm mt-1">{errors.lastName}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FieldLabel required>Username</FieldLabel>
            <input
              value={form.username}
              onChange={(e) => update({ username: e.target.value })}
              className={`mt-1 w-full p-2 border rounded ${
                hasError("username") ? "border-red-500" : "border-gray-300"
              }`}
            />
            {hasError("username") && (
              <div className="text-red-600 text-sm mt-1">{errors.username}</div>
            )}
          </div>

          <div>
            <FieldLabel required>Email</FieldLabel>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update({ email: e.target.value })}
              className={`mt-1 w-full p-2 border rounded ${
                hasError("email") ? "border-red-500" : "border-gray-300"
              }`}
            />
            {hasError("email") && (
              <div className="text-red-600 text-sm mt-1">{errors.email}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FieldLabel required>Password</FieldLabel>
            <input
              type="password"
              value={form.password}
              onChange={(e) => update({ password: e.target.value })}
              className={`mt-1 w-full p-2 border rounded ${
                hasError("password") ? "border-red-500" : "border-gray-300"
              }`}
            />
            {hasError("password") && (
              <div className="text-red-600 text-sm mt-1">{errors.password}</div>
            )}
          </div>

          <div>
            <FieldLabel required>Role / Designation</FieldLabel>
            <input
              value={form.role}
              onChange={(e) => update({ role: e.target.value })}
              className={`mt-1 w-full p-2 border rounded ${
                hasError("role") ? "border-red-500" : "border-gray-300"
              }`}
            />
            {hasError("role") && (
              <div className="text-red-600 text-sm mt-1">{errors.role}</div>
            )}
          </div>
        </div>

        <div>
          <FieldLabel required>Department</FieldLabel>
          <input
            value={form.department}
            onChange={(e) => update({ department: e.target.value })}
            className={`mt-1 w-full p-2 border rounded ${
              hasError("department") ? "border-red-500" : "border-gray-300"
            }`}
          />
          {hasError("department") && (
            <div className="text-red-600 text-sm mt-1">{errors.department}</div>
          )}
        </div>

        <div>
          <FieldLabel>Permissions (optional)</FieldLabel>
          <textarea
            value={form.permissions.join(", ")}
            onChange={(e) =>
              update({
                permissions: e.target.value.split(",").map((p) => p.trim()),
              })
            }
            placeholder="Comma-separated list: e.g., 'add_nurse, manage_verifiers'"
            className="mt-1 w-full p-2 border rounded border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add Admin
        </button>
      </form>
    </div>
  );
}
