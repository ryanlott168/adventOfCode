import path from 'path';
import dataParser from '../helper/dataParser.js';

const dataPath = path.resolve('day_6/data.txt');

const daysTillSpawnPerFish = await dataParser(dataPath, ',');

// Part 1. Naive Solution
const findHowManyFishAfterGivenDays = (dayCount, daysTillSpawnPerFish) => {
    let fishData = [...daysTillSpawnPerFish];

    for(let i = 0; i < dayCount; i++) {
        let newFish = [];
        fishData = fishData.map(daysTillSpawn => {
            daysTillSpawn -= 1;

            if(daysTillSpawn === -1) {
                daysTillSpawn = 6;
                newFish.push(8);
            }

            return daysTillSpawn
        });

        fishData = fishData.concat(newFish);
    }

    return fishData.length;
}


// Part 2. Optimized Solution
const findHowManyFishAfterGivenDaysOptimized = (dayCount, daysTillSpawnPerFish) => {
    let fishData = {};
    let fishCount = 0;

    daysTillSpawnPerFish.forEach(fish => {
        fishData[fish] ? fishData[fish]++ : fishData[fish] = 1;
    });

    for(let i = 0; i < dayCount; i++) {
        const newFishData = {};

        for(const counter in fishData) {
            if(counter === '0') {
                newFishData[6] = fishData[counter];
                newFishData[8] = fishData[counter];
            } else {
                newFishData[parseInt(counter) - 1] = newFishData[parseInt(counter) - 1] ? newFishData[parseInt(counter) - 1] + fishData[counter] : fishData[counter];
            }
        }
        fishData = newFishData;
    }

    for(const counter in fishData) {
        fishCount += fishData[counter];
    };

    return fishCount;
}

// const solution1 = findHowManyFishAfterGivenDays(80, daysTillSpawnPerFish);
// const solution2 = findHowManyFishAfterGivenDaysOptimized(256, daysTillSpawnPerFish);
// console.log(solution1);
// console.log(solution2);

