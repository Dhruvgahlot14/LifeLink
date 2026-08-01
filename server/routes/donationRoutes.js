const router = require("express").Router();
const { getDonations, createDonation, getRecentDonations } = require("../controllers/donationController");

router.get("/", getDonations);
router.post("/", createDonation);
router.get("/recent", getRecentDonations);

module.exports = router;