import path from 'path';
import dataParser from '../helper/dataParser.js';

const dataPath = path.resolve('day_3/data.txt');

const diagnosticReportData = await dataParser(dataPath);

const binaryToDecimalConverter = (binaryNumString: string) => {
    const binaryNumArr = binaryNumString.split('').reverse();
    let aggregate = 0;
    
    for(let i = 0; i < binaryNumArr.length; i++) {
        aggregate += parseInt(binaryNumArr[i]) * 2**i;
    }
    return aggregate;
}

// Part 1.

const findPowerConsumption = (data: string[]) => {
    let gammaRateBinary = '';
    let epsilonRateBinary = '';

    for(let i = 0; i < data[0].length; i++) {
        let zeroCount = 0;
        let oneCount = 0;

        for(let j = 0; j < data.length; j++) {
            data[j][i] === '0' ? zeroCount++ : oneCount++;
        }

        if(zeroCount > oneCount) {
            gammaRateBinary += 0;
            epsilonRateBinary += 1;
        } else {
            gammaRateBinary += 1;
            epsilonRateBinary += 0;
        }
    }

    let powerConsumption = binaryToDecimalConverter(gammaRateBinary) * binaryToDecimalConverter(epsilonRateBinary);
    return powerConsumption;
}

// const powerConsumption = findPowerConsumption(diagnosticReportData);
// console.log(powerConsumption);


// Part 2.
interface BinaryStorage {
    0: string[];
    1: string[];
}

const getO2GeneratorRating = (data: string[]) => {
    let potentialRatings = data;

        for(let i = 0; potentialRatings.length > 1 && i < potentialRatings[0].length; i++) {
            const binaryStorage: BinaryStorage = {0: [], 1: []};

            for(let j = 0; j < potentialRatings.length; j++) {
                if(potentialRatings[j][i] === '0') {
                    binaryStorage[0].push(potentialRatings[j]);
                } else {
                    binaryStorage[1].push(potentialRatings[j]);
                }
            }

            if (binaryStorage[0].length <= binaryStorage[1].length) {
                potentialRatings = binaryStorage[1];
            } else {
                potentialRatings = binaryStorage[0];
            }
        }

    let o2GeneratorRating = potentialRatings[0];

    return binaryToDecimalConverter(o2GeneratorRating);
}


const getCO2ScrubberRating = (data: string[]) => {
    let potentialRatings = data;

        for(let i = 0; potentialRatings.length > 1 && i < potentialRatings[0].length; i++) {
            const storage: BinaryStorage = {0: [], 1: []};
            for(let j = 0; j < potentialRatings.length; j++) {
                if(potentialRatings[j][i] === '0') {
                    storage[0].push(potentialRatings[j]);
                } else {
                    storage[1].push(potentialRatings[j]);
                }
            }

            if (storage[0].length <= storage[1].length) {
                potentialRatings = storage[0];
            } else {
                potentialRatings = storage[1];
            }
        }

    let co2ScrubberRating = potentialRatings[0];

    return binaryToDecimalConverter(co2ScrubberRating);
}

const findLifeSupportRating = (data: string[]) => {
    const o2GeneratorRating = getO2GeneratorRating(data);
    const co2ScrubberRating = getCO2ScrubberRating(data);
    
    const lifeSupportRating = o2GeneratorRating * co2ScrubberRating;
    return lifeSupportRating
}

// const lifeSupportRating = findLifeSupportRating(diagnosticReportData);
// console.log(lifeSupportRating);