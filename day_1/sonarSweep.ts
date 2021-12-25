import path from 'path';
import dataParser from '../helper/dataParser.js';

const dataPath = path.resolve('day_1/data.txt');
const parsingFn = (data: string[]): number[] => data.map(intString => parseInt(intString));
const sonarData = await dataParser(dataPath).then(data => parsingFn(data));

const findDepthMeasurementIncreases = (measurements: number[]): number => {
    let timesIncreased = 0;
    for(let i = 1; i < measurements.length; i++) {
        if(measurements[i] > measurements[i - 1]) timesIncreased++;
    }
    return timesIncreased;
}

const findSlidingWindowDepthMeasurementIncreases = (measurements: number[]): number => {
    let timesIncreased = 0;
    for(let i = 3; i < measurements.length; i++) {
        const previousSum = measurements[i - 1] + measurements[i - 2] + measurements[i - 3];
        const currentSum = measurements[i] + measurements[i - 1] + measurements[i - 2];
        if(currentSum > previousSum) timesIncreased++;
    }
    return timesIncreased;
}

// const increases = findDepthMeasurementIncreases(sonarData);
// const slidingWindowIncreases = findSlidingWindowDepthMeasurementIncreases(sonarData);
// console.log(increases);
// console.log(slidingWindowIncreases);

