const router = require(`express`).Router();
const cubeSeervices = require(`../services/cubeService`);
const accessoryService = require(`../services/accessoryService`);

router.get(`/create`, (req,res)=> {
    res.render(`create`);
});

router.post(`/create`, (req,res) => {
    const cube = req.body;
    //Validate
    if (cube.name.length < 2) {
       return res.status(400).send(`Invalid requiest`)
    }

    //Save data
    
    cubeSeervices.create(cube)
          .then(()=>{
               //Redirect to page
               res.redirect(`/`);
          })
          .catch(err=>{
             res.status(400).send(err);
          });
});

router.get(`/details/:id`, async(req,res)=>{
    const cube = await cubeSeervices.getOneDetails(req.params.id).lean();

    res.render(`details`, {cube});
})

router.get(`/:cubeId/attach-accessory`, async(req, res) => {
    const cube = await cubeSeervices.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAllAvailable(cube.accessories).lean();

    res.render(`accessory/attach`, {cube, accessories})
})

router.post(`/:cubeId/attach-accessory`, async(req, res) => {
    const accessoryId = req.body.accessory;

    await cubeSeervices.attachAccessory(req.params.cubeId, accessoryId);

    res.redirect(`/cube/details/${req.params.cubeId}`);
});

module.exports = router;