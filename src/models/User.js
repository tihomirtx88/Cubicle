const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, `Username is required`],
        unique: [true, `Email should be unique`],
        validate: /[a-zA-Z0-9]/,
        minLength: 5,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate: /[a-zA-Z0-9]/,
    }
});

// userSchema.virtual(`repeatPassword`).set(function(value){
//   if (this.password !== value) {
//       throw new Error(`Repeat password must match passowrd`);
//   }
// });
// mongoose custom schema 

const User = mongoose.model(`User`, userSchema);

module.exports = User;