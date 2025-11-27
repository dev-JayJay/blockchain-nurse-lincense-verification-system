import crypto from "crypto";

export const canonicalize = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(canonicalize);
  const o = {};
  Object.keys(obj).sort().forEach(k => {
    o[k] = canonicalize(obj[k]);
  });
  return o;
};

export const sha256Hex = (obj) => {
  const canonical = JSON.stringify(canonicalize(obj));
  return crypto.createHash("sha256").update(canonical).digest("hex"); // 64 hex chars
};

export const hexToBytes32 = (hexStr) => {
  let hex = hexStr.replace(/^0x/, "");
  if (hex.length !== 64) {
    // pad left if necessary (not typical, but defensive)
    hex = hex.padStart(64, "0");
  }
  return "0x" + hex;
};
