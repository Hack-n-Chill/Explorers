const ifBuyPriceHit = (currentPrice, buyPrice) => {
    if (currentPrice<=buyPrice) {
        return `${currentPrice} can be a great buy option`
    }
    
}
const ifSellPriceHit = (currentPrice, sellPrice) => {
    if (currentPrice >= sellPrice) {
        return `${currentPrice} can be a great sell option`
    }
    
}
const ifStopLossPriceHit = (currentPrice, stopLoss) => {
    if (currentPrice <= stopLoss) {
        return `This Share has hit the stoploss of target ${stopLoss}`
    }
    
}
const ifTrailingStopLossPriceHit = (currentPrice, stopLossPercentage, maxValue) => {
    const leastValue = maxValue * stopLossPercentage / 100;
    if (currentPrice<=leastValue) {
        return `This Share has hit the trailing stoploss of ${stopLossPercentage}%`
    }
}

export const anyTriggerHit = (user, stock) => {
    return ifBuyPriceHit(stock.currentPrice, user.buyPrice)
        || ifSellPriceHit(stock.currentPrice, user.sellPrice)
        || ifStopLossPriceHit(stock.currentPrice, user.stopLoss)
        || ifTrailingStopLossPriceHit(stock.currentPrice, user.stopLossPercentage, user.maxValue)
}
