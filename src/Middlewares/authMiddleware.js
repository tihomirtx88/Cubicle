const jwt = require(`jsonwebtoken`);
const { promisify } = require(`util`);
const { sesionName, secret } = require(`../config/AppConstant`);

const jwtVerify = promisify(jwt.verify);

exports.auth = async (req, res, next) => {
  let token = req.cookies[sesionName];

  if (token) {
    try {

      let deocodeToken = await jwtVerify(token, secret);
      req.user = deocodeToken;
      res.locals.user = deocodeToken;
      //Reuseable for authMiddleware 
    } catch (ерр) {
      return res.redirect(`/404`);
    }
  }
  next();
}

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect(`/`);
  }

  next();
}