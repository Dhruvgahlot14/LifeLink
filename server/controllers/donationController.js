const Donation = require("../models/Donation");
const PDFDocument = require("pdfkit");

exports.createDonation = async (req, res) => {
  try {
    const { name, bloodGroup, quantity, city, bloodBank } = req.body;

    // ✅ SAVE DONATION
    await Donation.create({
      name,
      bloodGroup,
      quantity,
      city,
      bloodBank
    });

    // 🔥 CREATE PDF
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=certificate.pdf"
    );

    doc.pipe(res);

    // 🎨 DESIGN
    doc.fontSize(22).text("LifeLink Donation Certificate", {
      align: "center"
    });

    doc.moveDown();

    doc.text("This certifies that", { align: "center" });

    doc.moveDown();

    doc.fontSize(18).text(name || "Donor", {
      align: "center",
      underline: true
    });

    doc.moveDown();

    doc.fontSize(14).text("has successfully donated blood", {
      align: "center"
    });

    doc.moveDown();

    doc.text(`Blood Group: ${bloodGroup}`, { align: "center" });
    doc.text(`Units: ${quantity}`, { align: "center" });
    doc.text(`City: ${city}`, { align: "center" });
    doc.text(`Blood Bank: ${bloodBank}`, { align: "center" });

    doc.moveDown();

    doc.text(`Date: ${new Date().toLocaleDateString()}`, {
      align: "center"
    });

    doc.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error generating certificate" });
  }
};
// 🔵 GET ALL DONATIONS
exports.getDonations = async (req, res) => {
  try {
    const data = await Donation.find();

    res.json(data);
    console.log("GET DONATIONS:", data); // 🔥 DEBUG

  } catch (err) {
    console.error("GET DONATION ERROR:", err);
    res.status(500).json({ msg: "Error" });
  }
};
exports.getRecentDonations = async (req, res) => {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const data = await Donation.find({
      createdAt: { $gte: twoDaysAgo }
    });

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error" });
  }
};