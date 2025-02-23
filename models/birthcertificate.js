const mongoose = require("mongoose");

const birthCertificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  fullName: String,
  aadharNumber: String,
  dob: String,
  gender: String,
  fatherName: String,
  motherName: String,
  purpose: String,
  address: String,
  email: String,
  pinCode: String,
  referenceID: { type: String, unique: true, default: () => `BC-${Date.now()}-${Math.floor(Math.random() * 1000)}` }
});

const BirthCertificate = mongoose.model("BirthCertificate", birthCertificateSchema);
module.exports = BirthCertificate;
