const fs = require(`fs/promises`);
const path = require(`path`);

const cubes = require(`../db.json`);

exports.getOne = (cubeId) => cubes[cubeId];

exports.getAll = (search = ``, fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;

     const result = cubes.
          filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
          .filter(c => c.difficultyLevel >= from && c.difficultyLevel <= to);

     return result;
};


exports.save = (cube) => {
    cubes.push({id: cubes[cubes.length - 1].id + 1, ...cube});

    let textData = JSON.stringify(cubes, ``, 4);

    return fs.writeFile(path.resolve(`src`, `db.json`), textData, {encoding: `utf-8`}) 
}


