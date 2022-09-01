const mongoose = require(`mongoose`);

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: /[a-zA-Z0-9 ]/,
        minLength: 5,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(){
                return this.imageUrl.startsWith(`http`);
            },
            message: `ImageUrl must to be link`
        }
    },
    description: {
        type: String,
        required: true,
        maxLength: 120,
    },
    cubes: [
        {
        type: mongoose.Types.ObjectId,
        ref: `Cube`,
        }
    ]
})

const Accessory = mongoose.model(`Accessory`, accessorySchema);

module.exports = Accessory;