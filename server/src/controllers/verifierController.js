import Verifier from "../models/Verifier.js";

export const submitVerifierRegistration = async (req, res) => {
  try {
    const body = req.body;

    const v = new Verifier({
      orgName: body.orgName,
      orgType: body.orgType,
      street: body.street,
      city: body.city,
      state: body.state,
      country: body.country,
      phone: body.phone,
      email: body.email,
      website: body.website,
      cacNumber: body.cacNumber,
      tin: body.tin,
      password: body.password,
      rep: {
        firstName: body.repFirstName,
        middleName: body.repMiddleName,
        lastName: body.repLastName,
        title: body.repTitle,
        address: body.repAddress,
        email: body.repEmail,
      },
      // documents: handle file uploads later
      status: "Pending",
    });
    await v.save();
    return res.json({ success: true, id: v._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Admin list pending verifiers
 */
export const listPendingVerifiers = async (req, res) => {
  try {
    const pending = await Verifier.find({ status: "Pending" }).sort({
      createdAt: -1,
    });
    return res.json(pending);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Admin approve verifier
 */
export const approveVerifier = async (req, res) => {
  try {
    const { id } = req.params;
    const v = await Verifier.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true }
    );
    if (!v) return res.status(404).json({ error: "not found" });
    // TODO: generate credentials / API key
    return res.json({ success: true, verifier: v });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Admin reject verifier
 */
export const rejectVerifier = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    if (!reason) return res.status(400).json({ error: "reason required" });
    const v = await Verifier.findByIdAndUpdate(
      id,
      { status: "Rejected", rejectionReason: reason },
      { new: true }
    );
    if (!v) return res.status(404).json({ error: "not found" });
    // TODO: notify via email
    return res.json({ success: true, verifier: v });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
