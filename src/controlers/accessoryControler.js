const router = require(`express`).Router();
const Accessory = require(`../models/Accessory`);
const {modelValidator} = require(`../Middlewares/modelValidatorMiddleware`);
const accessoryService = require(`../services/accessoryService`);

router.get(`/create`, (req,res) => {
     res.render(`accessory/create`);
});

router.post(`/create`, modelValidator(Accessory), async(req,res) => {
                      //Custom mongoose middleware validator
    await accessoryService.create(req.body);
    res.redirect(`/`);
});

module.exports = router;