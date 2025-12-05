import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifiersList() {
  const [verifiers, setVerifiers] = useState([]);
  const [allVerifiers, setAllVerifiers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("pending"); // NEW

  // Fetch pending verifiers
  const fetchVerifiers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/verifier/pending`
      );
      console.log("pending verifires", data);
      setVerifiers(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch verifiers");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all verifiers
  const fetchAllVerifiers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/verifier/all`
      );
      console.log("all verifires", data);
      setAllVerifiers(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch verifiers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifiers();
    fetchAllVerifiers();
  }, []);

  // Approve verifier
  const handleApprove = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/verifier/${id}/approve`
      );
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
      await axios.post(
        `${import.meta.env.VITE_API_URL}/verifier/${id}/reject`,
        { reason }
      );
      toast.success("Verifier rejected");
      setVerifiers((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Rejection failed");
    }
  };

  const renderTable = (data, showActions = false) => (
    <div className="bg-white shadow rounded-lg overflow-y-auto max-h-[500px]">
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2 text-left">Organization</th>
            <th className="px-2 py-2 text-left">CAC</th>
            <th className="px-2 py-2 text-left">Tin</th>
            <th className="px-2 py-2 text-left">Email</th>
            <th className="px-2 py-2 text-left">Status</th>
            {showActions && <th className="px-4 py-2 text-left">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="px-4 py-4 text-center">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-4 py-4 text-center">
                No verifiers found
              </td>
            </tr>
          ) : (
            data.map((v) => (
              <tr key={v._id} className="border-b">
                <td className="px-4 py-2">{v.orgName}</td>
                <td className="px-1 py-2">{v.cacNumber}</td>
                <td className="px-1 py-2">{v.tin}</td>
                <td className="px-1 py-2">{v.email}</td>
                <td className="px-1 py-2">{v.status}</td>

                {showActions && (
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleApprove(v._id)}
                      className="px-2 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(v._id)}
                      className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 pb-2">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "pending"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Verifiers
        </button>

        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "all"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Verifiers
        </button>
      </div>

      {/* 🔹 TAB CONTENT */}
      {activeTab === "pending" && renderTable(verifiers, true)}
      {activeTab === "all" && renderTable(allVerifiers, false)}
    </div>
  );
}
