import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifiersList() {
  const [verifiers, setVerifiers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch pending verifiers
  const fetchVerifiers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/verifier/pending`);
      setVerifiers(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch verifiers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifiers();
  }, []);

  // Approve verifier
  const handleApprove = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/verifier/${id}/approve`);
      toast.success("Verifier approved!");
      setVerifiers((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Approval failed");
    }
  };

  // Reject verifier
  const handleReject = async (id) => {
    const reason = prompt("Enter reason for rejection:");
    if (!reason) return toast.error("Rejection reason is required");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/verifier/${id}/reject`, { reason });
      toast.success("Verifier rejected");
      setVerifiers((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Rejection failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Pending Verifiers</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Organization</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : verifiers.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center">
                  No pending verifiers
                </td>
              </tr>
            ) : (
              verifiers.map((v) => (
                <tr key={v._id} className="border-b">
                  <td className="px-4 py-2">{v.orgName}</td>
                  <td className="px-4 py-2">{v.email}</td>
                  <td className="px-4 py-2">{v.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleApprove(v._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(v._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
