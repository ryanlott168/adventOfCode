import dataParser from '../helper/dataParser.js';

const ventLines = await dataParser('./data.txt', null, data => data.map(row => row.split(' -> ')));
console.log(ventLines);
const createVentLineDiagram = () => {

}


const addVentLinesToDiagram = () => {

}

const findVentLineOverlapPoints = () => {

}