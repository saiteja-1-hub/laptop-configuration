const express = require("express");

const router = express.Router();

const componentController =
    require("../controllers/componentController");

const authMiddleware =
    require("../middleware/authMiddleware");

router.get(
    "/",
    authMiddleware,
    componentController.getComponents
);

router.get(
    "/:id",
    authMiddleware,
    componentController.getComponent
);

router.post(
    "/",
    authMiddleware,
    componentController.createComponent
);

router.put(
    "/:id",
    authMiddleware,
    componentController.updateComponent
);

router.delete(
    "/:id",
    authMiddleware,
    componentController.deleteComponent
);

module.exports = router;