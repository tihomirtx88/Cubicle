const express = require(`express`);
const homeController = require(`./controlers/homeControllers`);
const cubeController = require(`./controlers/cubeController`);

const router = express.Router();

router.get(`/`, homeController.index);
router.get(`/about`, homeController.about);

router.use(`/cube`, cubeController);

module.exports = router;



