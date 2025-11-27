export default function VerifierHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome, Verifier!</h1>
      <p className="text-gray-600">
        Use the sidebar to navigate through your portal and manage license
        verifications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Total Verified Licenses</h2>
          <p className="mt-2 text-gray-700 text-2xl font-bold">154</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Successful Verifications</h2>
          <p className="mt-2 text-gray-700 text-2xl font-bold">12</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Invalid Records</h2>
          <p className="mt-2 text-gray-700 text-2xl font-bold">3</p>
        </div>
      </div>
    </div>
  );
}
