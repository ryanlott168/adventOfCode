import path from 'path';
import dataParser from '../helper/dataParser.js';

const dataPath = path.resolve('day_3/data.txt');

const diagnosticReportData = await dataParser(dataPath);

const binaryToDecimalConverter = binaryNumber => {
    binaryNumber = binaryNumber.split('').reverse();

    let aggregate = 0;
    for(let i = 0; i < binaryNumber.length; i++) {
        aggregate += binaryNumber[i] * 2**i;
    }
    return aggregate;
}

// Part 1.

const findPowerConsumption = data => {
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

const getO2GeneratorRating = data => {
    let potentialRatings = data;

        for(let i = 0; potentialRatings.length > 1 && i < potentialRatings[0].length; i++) {
            const storage = {0: [], 1: []};
            for(let j = 0; j < potentialRatings.length; j++) {
                if(potentialRatings[j][i] === '0') {
                    storage[0].push(potentialRatings[j]);
                } else {
                    storage[1].push(potentialRatings[j]);
                }
            }

            if (storage[0].length <= storage[1].length) {
                potentialRatings = storage[1];
            } else {
                potentialRatings = storage[0];
            }
        }

    let o2GeneratorRating = potentialRatings.pop();
    o2GeneratorRating = binaryToDecimalConverter(o2GeneratorRating);

    return o2GeneratorRating;
}


const getCO2ScrubberRating = data => {
    let potentialRatings = data;

        for(let i = 0; potentialRatings.length > 1 && i < potentialRatings[0].length; i++) {
            const storage = {0: [], 1: []};
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

    let co2ScrubberRating = potentialRatings.pop();
    co2ScrubberRating = binaryToDecimalConverter(co2ScrubberRating);

    return co2ScrubberRating;
}

const findLifeSupportRating = data => {
    const o2GeneratorRating = getO2GeneratorRating(data);
    const co2ScrubberRating = getCO2ScrubberRating(data);
    
    const lifeSupportRating = o2GeneratorRating * co2ScrubberRating;
    return lifeSupportRating
}

// const lifeSupportRating = findLifeSupportRating(diagnosticReportData);
// console.log(lifeSupportRating);