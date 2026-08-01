const Donation = require("../models/Donation");
const Request = require("../models/Request");

exports.createRequest = async (req, res) => {
  try {
    const { name, bloodGroup, quantity, city } = req.body;

    console.log("REQ BODY:", req.body); // 🔥 DEBUG

    // ✅ SAVE WITHOUT USER LOGIN
    const newRequest = await Request.create({
      name,
      bloodGroup,
      quantity,
      city
    });

    res.json(newRequest);

  } catch (err) {
    console.error("REQUEST ERROR:", err); // 🔥 IMPORTANT
    res.status(500).json({ msg: "Error creating request" });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const data = await Request.find();

    res.json(data);

  } catch (err) {
    console.error("GET REQUEST ERROR:", err);
    res.status(500).json({ msg: "Error" });
  }
};

exports.getRecentRequests = async (req, res) => {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const data = await Request.find({
      createdAt: { $gte: twoDaysAgo }
    });

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error" });
  }
};

exports.findBloodBanks = async (req, res) => {
  try {
    const { bloodGroup } = req.body;

    const data = await Donation.aggregate([
      { $match: { bloodGroup } },
      {
        $group: {
          _id: {
            bloodBank: "$bloodBank",
            city: "$city"
          },
          totalUnits: { $sum: "$quantity" }
        }
      }
    ]);

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error" });
  }
};