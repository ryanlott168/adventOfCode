import dataParser from '../helper/dataParser.js';

const bingoData = await dataParser('./data.txt', '\n\n', data => {
    data = data.map(row => {
        row = row.split('\n');
        return row
    });
    return data;
});

const calledNums = bingoData.shift()[0].split(',');
const bingoCards = bingoData.map(bingoCard => {
    bingoCard = bingoCard.map(row => {
        return row.trim().split(/\s+/).map(num => {
            return {num, called: false};
        });
    });
    return bingoCard;
});

const isGameWon = bingoCard => {

    for(let i = 0; i < bingoCard.length; i++) {
        let horizontalCount = 0;
        let verticalCount = 0;
        for(let j = 0; j < bingoCard[i].length; j++) {
            if(bingoCard[i][j].called) horizontalCount++;
            if(bingoCard[j][i].called) verticalCount++;
            if(horizontalCount > 4 || verticalCount > 4) return true;
        }
    }

    return false;
}

const placeBingoChip = (bingoCard, calledNum) => {
    for(let i = 0; i < bingoCard.length; i++) {
        for(let j = 0; j < bingoCard[i].length; j++) {
            if(bingoCard[i][j].num === calledNum) {
                bingoCard[i][j].called = true;
                return bingoCard;
            }

            if(bingoCard[j][i].num === calledNum) {
                bingoCard[j][i].called = true;
                return bingoCard;
            };
        }
    } 
    return bingoCard;
}

const findHowManyNumsCalledTillWin = (bingoCard, calledNums, earlyExitComparator) => {
    let numsCalledTillWin = 0;
    for(let i = 0; i < calledNums.length; i++) {
        bingoCard = placeBingoChip(bingoCard, calledNums[i]);
        numsCalledTillWin++;

        if(earlyExitComparator && earlyExitComparator(numsCalledTillWin)) return null;
        if(isGameWon(bingoCard)) return { bingoCard, numsCalledTillWin, winningNum: calledNums[i] };
    }

    return null;
}


const findFirstWinningCard = (bingoCards, calledNums) => {
    let winningCard;
    const earlyExitComparator = numsCalledTillWin => numsCalledTillWin >= winningCard.numsCalledTillWin;

    for(let i = 0; i < bingoCards.length; i++) {
        let card = findHowManyNumsCalledTillWin(bingoCards[i], calledNums, winningCard ? earlyExitComparator : null);
        if(card) winningCard = card;
    }

    return winningCard;
}

const findLastWinningCard = (bingoCards, calledNums) => {
    let winningCard;

    for(let i = 0; i < bingoCards.length; i++) {
        let card = findHowManyNumsCalledTillWin(bingoCards[i], calledNums);
        if(card && !winningCard || card.numsCalledTillWin > winningCard.numsCalledTillWin) winningCard = card;
    }

    return winningCard;
}

const findCardScore = winningCard => {
    const card = winningCard.bingoCard;
    let score = card.reduce((prevValue, row) => {
        let rowScore = row.reduce((prevValue, currentValue) => {
            if(currentValue.called) return prevValue;
            return prevValue + parseInt(currentValue.num);
        }, 0);
        return prevValue + rowScore;
    }, 0);

    return score * winningCard.winningNum;
}

// const firstWinningCardScore = findCardScore(findFirstWinningCard(bingoCards, calledNums));
// const lastWinningCardScore = findCardScore(findLastWinningCard(bingoCards, calledNums));
// console.log(firstWinningCardScore);
// console.log(lastWinningCardScore);