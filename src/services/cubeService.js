const fs = require(`fs/promises`);
const path = require(`path`);

const Accessory = require("../models/Accessory");

const Cube = require(`../models/Cube`);

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.getOneDetails = (cubeId) => Cube.findById(cubeId).populate(`accessories`);
//Take also the accessories from model


exports.create = (cube) => Cube.create(cube);

exports.edit = (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId, cubeData);


exports.attachAccessory = async (cubeId, accessoryId) => {
  const cube = await Cube.findById(cubeId);
  const accessory = await Accessory.findById(accessoryId);

  cube.accessories.push(accessory);
  accessory.cubes.push(cube);

  await cube.save();
  await accessory.save();

  return cube;
}
//Relations bettwen accessories and cubes

exports.getAll = async (search = ``, fromInput, toInput) => {
     const from = Number(fromInput) || 0;
     const to = Number(toInput) || 6;

     let cubes = await Cube.find({name: {$regex: new RegExp(search, `i`)}})
         .where(`difficultyLevel`)
         .lte(to).gte(from)
         .lean();
      
     return cubes;
};