const { Router } = require("express");
const DataServices = require("../services/dataservices");
const isAuth = require("../middleware/isuser");
const router = Router({ strict: true });

router.put("/update-votes", isAuth, DataServices.updateVotes);

module.exports = router;