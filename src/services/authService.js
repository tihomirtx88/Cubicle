const User = require(`../models/User`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const {saltRounds,secret} = require(`../config/AppConstant`);

exports.register = async ({ username, password, repeatPassword }) => {
    if (password !== repeatPassword) {
        return false;
    }
    let hashedPassowrd = await bcrypt.hash(password, saltRounds);

    let createdUser = User.create({
        username,
        password: hashedPassowrd
    });

    return createdUser;
};

exports.login = async ({ username, password }) => {
    let user = await User.findOne({ username });

    if (!user) {
        return;
    }

    const isAVAlid = await bcrypt.compare(password, user.password);

    if (!isAVAlid) {
       throw {
          message: `Invalid username or passowrd`
       };
    } 

    let result = new Promise((resolve, reject) => {
        jwt.sign({_id: user._id, username: user.username}, secret, {expiresIn: `2d`}, (err, token) => {
     
            if (err) {
              return  reject(err);
            }
            resolve(token);
            
        });
    }) 

    return result;
}

