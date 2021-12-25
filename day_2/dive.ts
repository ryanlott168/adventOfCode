import path from 'path';
import dataParser from '../helper/dataParser.js';

const dataPath = path.resolve('day_2/data.txt');
const parsingFn = (data: string[]): string[][] => {
    return data.map(instructions => instructions.split(' '));
}

const submarineInstructions = await dataParser(dataPath ).then(data => parsingFn(data));

const findFinalLocation = (instructions: string[][]): number => {
    let horizontalPosition = 0;
    let depthPosition = 0;
    for(let i = 0; i < instructions.length; i++) {
        switch(instructions[i][0]) {
            case 'forward':
                horizontalPosition += parseInt(instructions[i][1]);
                break;
            case 'up':
                depthPosition -= parseInt(instructions[i][1]);
                break;
            case 'down':
                depthPosition += parseInt(instructions[i][1]);
                break;
        }
    }
    return horizontalPosition * depthPosition;
}

const findFinalLocationWithAim = (instructions: string[][]): number => {
    let horizontalPosition = 0;
    let depthPosition = 0;
    let aim = 0;
    for(let i = 0; i < instructions.length; i++) {
        switch(instructions[i][0]) {
            case 'forward':
                horizontalPosition += parseInt(instructions[i][1]);
                depthPosition += aim * parseInt(instructions[i][1]);
                break;
            case 'up':
                aim -= parseInt(instructions[i][1]);
                break;
            case 'down':
                aim += parseInt(instructions[i][1]);
                break;
        }
    }
    return horizontalPosition * depthPosition;
}


// const finalLocation = findFinalLocation(submarineInstructions);
// const finalLocationWithAim = findFinalLocationWithAim(submarineInstructions);
// console.log(finalLocation);
// console.log(finalLocationWithAim);