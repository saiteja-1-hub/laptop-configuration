const express = require("express");

const router = express.Router();

const configurationController =
    require("../controllers/configurationController");

const authMiddleware =
    require("../middleware/authMiddleware");


router.get(
    "/",
    authMiddleware,
    configurationController.getConfigurations
);

router.get(
    "/:id",
    authMiddleware,
    configurationController.getConfiguration
);

router.post(
    "/",
    authMiddleware,
    configurationController.createConfiguration
);

router.delete(
    "/:id",
    authMiddleware,
    configurationController.deleteConfiguration
);


module.exports = router;