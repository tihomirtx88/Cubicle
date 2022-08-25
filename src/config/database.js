const mongoose = require(`mongoose`);

const conectionsString = `mongodb://localhost:27017/cubicle`;

exports.initiallizeDatabase = () => mongoose.connect(conectionsString);