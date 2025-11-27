export default function Profile() {
  return (
    <div className="space-y-6 max-w-md">
      <h1 className="text-3xl font-bold text-gray-800">Verifier Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <h2 className="text-gray-600 font-semibold">Organization Name</h2>
          <p className="text-gray-800">City Hospital</p>
        </div>

        <div>
          <h2 className="text-gray-600 font-semibold">Contact Person</h2>
          <p className="text-gray-800">John Doe</p>
        </div>

        <div>
          <h2 className="text-gray-600 font-semibold">Email</h2>
          <p className="text-gray-800">contact@hospital.com</p>
        </div>

        <div>
          <h2 className="text-gray-600 font-semibold">Phone</h2>
          <p className="text-gray-800">+123 456 7890</p>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition w-full">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
