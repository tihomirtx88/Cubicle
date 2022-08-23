const express = require(`express`);
const homeController = require(`./controlers/homeControllers`);

const router = express.Router();

router.get(`/`, homeController.index);

module.exports = router;



