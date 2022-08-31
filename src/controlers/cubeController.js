const router = require(`express`).Router();
const {body,check, validationResult} = require(`express-validator`);
const cubeSeervices = require(`../services/cubeService`);
const accessoryService = require(`../services/accessoryService`);
const { isAuth } = require("../Middlewares/authMiddleware");

router.get(`/create`, isAuth, (req,res)=> {
    res.render(`create`);
});

router.post(`/create`,
   isAuth, 
   body(`name`, `Name is required`).not().isEmpty(),
   body(`description`).isLength({min: 5, max: 120}),
   body(`difficultyLevel`,`DifficultyLevel is required to be in range 1 to 6`).toInt().isInt({min: 1, max: 6}),
                          //Sanitizered
  (req,res) => {
                               //Express-validator
    const cube = req.body;

    cube.owner = req.user._id;
    //Validate

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg)
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
    const isOwner = cube.owner == res.user?._id;

    res.render(`details`, {cube, isOwner});
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

router.get(`/:cubeId/delete`, async(req,res) => {
    const cube = await cubeSeervices.getOne(req.params.cubeId).lean();

    res.render(`cube/delete` , {cube});
});

router.post(`/:cubeId/delete`, async(req,res) => {
    await cubeSeervices.delete(req.params.cubeId);

    res.redirect(`/`);
});

module.exports = router;