import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ReviewVerifier() {
  const { id } = useParams();
  const [rejectReason, setReason] = useState("");

  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-3">Review Verifier Application</h1>
        <p className="text-gray-500 mb-6">Verifier ID: {id}</p>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Organization Info</h2>
          <p>
            <span className="font-bold">Name:</span> Example Hospital
          </p>
          <p>
            <span className="font-bold">Email:</span> example@example.com
          </p>
          <p>
            <span className="font-bold">Address:</span> 123 Medical Road
          </p>

          <h2 className="text-xl font-semibold my-4">Uploaded Documents</h2>
          <ul className="list-disc ml-6">
            <li>Registration Certificate</li>
            <li>Regulatory Approval</li>
            <li>Proof of Address</li>
          </ul>

          <div className="mt-6 flex gap-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
              Approve
            </button>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={() => alert("Rejected for: " + rejectReason)}
            >
              Reject
            </button>
          </div>

          <textarea
            className="mt-4 w-full p-3 border rounded-lg"
            placeholder="Reason for rejection..."
            value={rejectReason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
