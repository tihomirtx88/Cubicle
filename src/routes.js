const express = require(`express`);
const homeController = require(`./controlers/homeControllers`);
const cubeController = require(`./controlers/cubeController`);

const router = express.Router();

router.use(`/`, homeController);

router.use(`/cube`, cubeController);

module.exports = router;



