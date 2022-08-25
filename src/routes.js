const express = require(`express`);
const homeController = require(`./controlers/homeControllers`);
const cubeController = require(`./controlers/cubeController`);
const accessoryController = require(`./controlers/accessoryControler`);

const router = express.Router();

router.use(`/`, homeController);

router.use(`/cube`, cubeController);

router.use(`/accessory`, accessoryController);

module.exports = router;



