const router = require(`express`).Router();
const cubeSeervices = require(`../services/cubeService`);
const accessoryService = require(`../services/accessoryService`);
const { isAuth } = require("../Middlewares/authMiddleware");

router.get(`/create`, isAuth, (req,res)=> {
    res.render(`create`);
});

router.post(`/create`, isAuth, (req,res) => {
    const cube = req.body;
    cube.owner = req.user._id;
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

router.get(`/:cubeId/edit`,isAuth, async(req,res) => {
     const cube = await cubeSeervices.getOne(req.params.cubeId).lean();

     if (cube.owner != req.user._id) {
        return res.redirect(`/404`);
     }

     cube[`difficultyLevel${cube.difficultyLevel}`] = true;
     //For the select option 

     if (!cube) {
        return res.redirect(`/404`);
     }

     res.render(`cube/edit`, { cube });
});

router.post(`/:cubeId/edit`, async(req,res) => {
    
   let modifiedCube = await cubeSeervices.edit(req.params.cubeId, req.body);

   if (!modifiedCube) {
       return res.redirect(`/404`);
   }
    
    res.redirect(`/cube/details/${modifiedCube._id}`);
});

module.exports = router;