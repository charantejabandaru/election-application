const { Router } = require("express");
const DataServices = require("../services/dataservices");
const router = Router({ strict: true });

router.get("/login", DataServices.login);
router.get("/constituency-data", DataServices.getConstituencyData);
router.get("/constituency-code",DataServices.getConstituencyCode);
router.get("/party-data",DataServices.getPartyData);

module.exports = router;