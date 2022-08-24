const router = require(`express`).Router();
const cubeSeervices = require(`../services/cubeService`);

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
    
    cubeSeervices.save(cube)
          .then(()=>{
               //Redirect to page
               res.redirect(`/`);
          })
          .catch(err=>{
             res.status(400).send(err);
          });
});

module.exports = router;