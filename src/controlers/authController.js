const router = require(`express`).Router();
const validator = require(`validator`);

const authService = require(`../services/authService`);
const { sesionName } = require(`../config/AppConstant`);


router.get(`/register`, (req, res) => {
   res.render(`auth/register`);
});

router.post(`/register`, async (req, res) => {
   if (!validator.isEmail(req.body.username)) {
      return res.status(404).send(`Invalid email`);
   }
   //Validate with validator

   let createdUser = await authService.register(req.body);

   if (createdUser) {
      res.redirect(`/auth/login`);
   } else {
      // res.redirect(``);
      res.redirect(`404`);
   }

});

router.get(`/login`, (req, res) => {
   res.render(`auth/login`);
});

router.post(`/login`, async (req, res) => {
   try {
      let token = await authService.login(req.body);

      if (!token) {
         return res.redirect(`/404`);
      }

      res.cookie(sesionName, token, { httpOnly: true });

      res.redirect(`/`);

   } catch (error) {
      res.status(400).render(`auth/login`, {error: error.message});
   }

});

router.get(`/logout`, (req, res) => {
   res.clearCookie(sesionName);
   res.redirect(`/`);
});

module.exports = router;