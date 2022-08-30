const express = require(`express`);
const homeController = require(`./controlers/homeControllers`);
const cubeController = require(`./controlers/cubeController`);
const accessoryController = require(`./controlers/accessoryControler`);
const authController = require(`./controlers/authController`);

const router = express.Router();

router.use(`/`, homeController);

router.use(`/cube`, cubeController);

router.use(`/accessory`, accessoryController);

router.use(`/auth`, authController);

router.use(`*`, (req,res) => {
    res.render(`404`);
});

module.exports = router;



