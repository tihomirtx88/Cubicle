const mongoose = require(`mongoose`);

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    }
})

const Accessory = mongoose.model(`Accessory`, accessorySchema);

module.exports = Accessory;