const User = require(`../models/User`);
const bcrypt = require(`bcrypt`);

const saltRounds = 10;

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

