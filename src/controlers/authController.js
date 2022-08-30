const router = require(`express`).Router();

const authService = require(`../services/authService`);

router.get(`/register`, (req, res) => {
   res.render(`auth/register`);
});

router.post(`/register`, async(req, res) => {
    
    let createdUser = await authService.register(req.body);
    console.log(createdUser);
    if (createdUser) {
        res.redirect(`/auth/login`);
    }else{
        // res.redirect(``);
        res.redirect(`404`);
    }

 });


module.exports = router;