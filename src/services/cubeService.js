const fs = require(`fs/promises`);
const path = require(`path`);

const Accessory = require("../models/Accessory");

const Cube = require(`../models/Cube`);

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.getOneDetails = (cubeId) => Cube.findById(cubeId).populate(`accessories`);
                      //Take also the accessories from model


exports.create = (cube) => Cube.create(cube);

exports.attachAccessory = async(cubeId, accessoryId) => {
  const cube = await Cube.findById(cubeId);
  const accessory = await Accessory.findById(accessoryId);

  cube.accessories.push(accessory);
  accessory.cubes.push(cube);

  await cube.save();
  await accessory.save();

  return cube;
}
//Relations bettwen accessories and cubes

exports.getAll = async(search = ``, fromInput, toInput) => {
    let cubes = await Cube.find().lean();
    return cubes;
    // const from = Number(fromInput) || 0;
    // const to = Number(toInput) || 6;

    //  const result = cubes.
    //       filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    //       .filter(c => c.difficultyLevel >= from && c.difficultyLevel <= to);
};