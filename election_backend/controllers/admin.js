const { Router } = require("express");
const DataServices = require("../services/dataservices");
const isAuth = require("../middleware/isuser");
const router = Router({ strict: true });

router.put("/update-votes", isAuth, DataServices.updateVotes);
router.post("/upload-s3", isAuth, DataServices.uploadToS3);

module.exports = router;