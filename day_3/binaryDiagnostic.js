import dataParser from '../helper/dataParser.js';

const diagnosticReportData = await dataParser('./data.txt');

const binaryToDecimalConverter = binaryNumber => {
    binaryNumber = binaryNumber.split('').reverse();

    let aggregate = 0;
    for(let i = 0; i < binaryNumber.length; i++) {
        aggregate += binaryNumber[i] * 2**i;
    }
    return aggregate;
}


const findPowerConsumption = data => {
    let powerConsumption = 0;
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

    powerConsumption = binaryToDecimalConverter(gammaRateBinary) * binaryToDecimalConverter(epsilonRateBinary);
    return powerConsumption;
}

// findPowerConsumption(diagnosticReportData);