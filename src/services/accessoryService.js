const Accessory = require(`../models/Accessory`);

exports.getAll = () => Accessory.find();

exports.getAllAvailable = (idsArray) => Accessory.find({_id: {$nin: idsArray}});
                                                    //Moongo operator for filter
exports.create = (accessoryData) => Accessory.create(accessoryData);


