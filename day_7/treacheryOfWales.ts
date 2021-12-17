import path from 'path';
import dataParser from '../helper/dataParser.js';

const dataPath = path.resolve('day_7/data.txt');

const crabPositionData: number[] = await dataParser(dataPath, ',', (data: string[]) => data.map(position => parseInt(position)));

const sampleData = [16,1,2,0,4,2,7,1,2,14]
let range = crabPositionData.reduce((prev, curr) => {
    if(prev[0] > curr) prev[0] = curr;
    if(prev[1] < curr) prev[1] = curr;
    return prev;
}, [crabPositionData[0], crabPositionData[0]]);


// Part 1. Linear Fuel Cost
const findBestPositionAndFuelCost = (range: number[], crabPositionData: number[]) => {
    let bestPosition;
    let lowestCost;

    for(let i = range[0]; i <= range[1]; i++) {
        const cost = crabPositionData.reduce((prev, curr) => {
            return prev + Math.abs(i - curr)
        }, 0);

        if(!(bestPosition && lowestCost) || cost < lowestCost) {
            lowestCost = cost;
            bestPosition = i;
        }
    }
    return {bestPosition, lowestCost};
}


// Part 2. Exponential Fuel Cost
const findBestPositionAndFuelCost2 = (range: number[], crabPositionData: number[]) => {
    let bestPosition;
    let lowestCost;

    for(let i = range[0]; i <= range[1]; i++) {
        const cost = crabPositionData.reduce((prev, curr) => {
            let change = Math.abs(i - curr);
            if(change < 1) return prev;

            let individualCost = 0;
            for(let i = 1; i <= change; i++) {
                individualCost += i;
            }
            return prev + individualCost;

        }, 0);

        if(!(bestPosition && lowestCost) || cost < lowestCost) {
            lowestCost = cost;
            bestPosition = i;
        }
    }
    return {bestPosition, lowestCost};
}


// const linearGrowthBestPositionAndCost = findBestPositionAndFuelCost(range, crabPositionData);
// const exponentialGrowthBestPositionAndCost = findBestPositionAndFuelCost2(range, crabPositionData);
// console.log(linearGrowthBestPositionAndCost);
// console.log(exponentialGrowthBestPositionAndCost);