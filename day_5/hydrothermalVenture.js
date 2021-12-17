import path from 'path';
import dataParser from '../helper/dataParser.js';

const dataPath = path.resolve('day_5/data.txt');


const ventLineData = await dataParser(dataPath, null, data => data.map(coordinateSet => {
    coordinateSet = coordinateSet.split(' -> ');
    return coordinateSet.map(coordinate => {
        return  coordinate.split(',').map(number => parseInt(number));
    });
}));

const findHighestCordinates = ventLines => {
    let highestX = 0;
    let highestY = 0;

    ventLines.forEach(coordinateSet => {
        const higherX = coordinateSet[0][0] > coordinateSet[1][0] ? coordinateSet[0][0] : coordinateSet[1][0];
        const higherY = coordinateSet[0][1] > coordinateSet[1][1] ? coordinateSet[0][1] : coordinateSet[1][1];
        if(higherX > highestX) highestX = higherX;
        if(higherY > highestY) highestY = higherY;
    });

    return { highestX, highestY };
}

const createVentLineDiagram = size => {
    let diagram = [];
    for(let i = 0; i < size; i++) {
        let row = Array(size).fill(0);
        diagram.push(row);
    }
    return diagram;
}

const addVentLinesToDiagram = (ventLineData, ventLineDiagram) => {
    ventLineData.forEach(coordinateSet => {
        if(coordinateSet[0][0] === coordinateSet[1][0]) {
            // Handles vertical lines
            const x = coordinateSet[0][0];
            const lowerY = coordinateSet[0][1] > coordinateSet[1][1] ? coordinateSet[1][1] : coordinateSet[0][1];
            const higherY = coordinateSet[0][1] < coordinateSet[1][1] ? coordinateSet[1][1] : coordinateSet[0][1];
            for(let y = lowerY; y < higherY + 1; y++) {
                ventLineDiagram[y][x]++;
            }
        } else if(coordinateSet[0][1] === coordinateSet[1][1]) {
            // Handles horizontal lines
            const y = coordinateSet[0][1];
            const lowerX = coordinateSet[0][0] > coordinateSet[1][0] ? coordinateSet[1][0] : coordinateSet[0][0];
            const higherX = coordinateSet[0][0] < coordinateSet[1][0] ? coordinateSet[1][0] : coordinateSet[0][0];
            for(let x = lowerX; x < higherX + 1; x++) {
                ventLineDiagram[y][x]++;
            }
        } else {
            // Handles diagonal lines
            let x = coordinateSet[0][0], y = coordinateSet[0][1];
            const xDifference = coordinateSet[0][0] < coordinateSet[1][0] ? 1 : -1;
            const yDifference = coordinateSet[0][1] < coordinateSet[1][1] ? 1 : -1;

            while(x !== coordinateSet[1][0] + xDifference) {
                ventLineDiagram[y][x]++;
                x += xDifference, y += yDifference;
            }
        }
    });
     
    return ventLineDiagram;
}

const findVentLineOverlapPoints = ventLineDiagram => {
    const diagramSize = ventLineDiagram.length;
    let overlapCount = 0
    for(let i = 0; i < diagramSize; i++) {
        for(let j = 0; j < diagramSize; j++) {
            if(ventLineDiagram[i][j] > 1) overlapCount++;
        }
    }
    return overlapCount;
}


// Comes out with highest x = 989 and highest y = 990, so a matrix of 990 rows and columns is suitable
// for vent line diagram.
const highestCoordinates = findHighestCordinates(ventLineData);
const diagramSize = 990;

// Creates a matrix 990 x 990 to store ventLine coordinates
let ventLineDiagram = createVentLineDiagram(diagramSize);

// Returns diagram with all ventLines drawn
ventLineDiagram = addVentLinesToDiagram(ventLineData, ventLineDiagram);

// Returns overlapCount
const overlapCount = findVentLineOverlapPoints(ventLineDiagram);
// console.log(overlapCount);
