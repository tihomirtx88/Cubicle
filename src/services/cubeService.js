const fs = require(`fs/promises`);
const path = require(`path`);

const Cube = require(`../models/Cube`);

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.create = (cube) => Cube.create(cube);

exports.getAll = async(search = ``, fromInput, toInput) => {
    let cubes = await Cube.find().lean();
    return cubes;
    // const from = Number(fromInput) || 0;
    // const to = Number(toInput) || 6;

    //  const result = cubes.
    //       filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    //       .filter(c => c.difficultyLevel >= from && c.difficultyLevel <= to);
};