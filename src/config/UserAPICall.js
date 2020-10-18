import firebase from 'firebase';
import request from 'request';

const userDB = firebase.firestore().collection("Users");
const stockDB = firebase.firestore().collection("Stocks");

export const getAllStocks = () => {
    return new Promise((resolve, reject) => {
        stockDB.onSnapshot((snapshot) => {
                // console.log('onSnapshot Called!')
                let updatedData = snapshot.docs.map(doc => doc.data())
                resolve(updatedData)
            }, reject)
    })
}

export const getUserStocks = (userId) => {

    return new Promise((resolve, reject) => {
        userDB.doc(userId).get()
        .then(doc => {
            let userStocks = doc.data().userStocks;  
            stockDB.where('id','in',userStocks).onSnapshot((snapshot) => {
                // console.log('onSnapshot Called!')
                let updatedData = snapshot.docs.map(doc => doc.data())
                resolve(updatedData)
            }, reject)
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });     
    })
}

export const getUserStockInfo = (userId, stockId) => {
    return new Promise((resolve, reject) => {
    userDB.doc(userId).get()
    .then(doc => {
        // let watchList = doc.data().watchList;  
        // for (let index = 0; index < watchList.length; index++) {
        //     if (watchList[index].stockID === stockId) {
        //         resolve(watchList[index]);
        //         break;
        //     }
        // }
        resolve(doc.data().watchList.find(e => e.id === stockId));
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });     
    })
}

/*
export const updateStockPrice = (stockId, price) => {
    stockDB.doc(stockId).get().then(doc => {
        let prevPrice = doc.data().currentPrice;
        stockDB.doc(stockId).update({
            currentPrice : price,
            previousPrice : prevPrice
        }).then(() => {
            console.log(stockId,"Updated Succesfully to",price);
        }).catch((error) => {
            console.log("Error updating :",stockId, error);
    });
    }).catch((error) => {
        console.log("Error getting ",stockId, error);
    });
} 
*/

const updateStockName = (stockId) => {
    let url = 'https://finnhub.io/api/v1/stock/profile2?symbol=';
    let token = '&token=bu4heof48v6p8t6ghn2g';
    url = url + stockId + token;
    request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        let stockName = body.name;
        console.log(body);
        
        console.log(stockId, " => ", stockName);
        stockDB.doc(stockId).set({
            name : stockName
        },{merge : true}).then(() => {
            console.log(stockId, "Updated Succesfully to", body.name);
        }).catch((error) => {
            console.log("Error updating :", stockId, error)
        });
    });
}


export const addStock = (userID, stockId) => {
    return new Promise((resolve, reject) => {
        stockDB.doc(stockId).get().then(doc => {
            if (doc.exists) {
            
            } else {
                let url = 'https://finnhub.io/api/v1/quote?symbol=';
                let token = '&token=bu4heof48v6p8t6ghn2g';
                url = url + stockId + token;
                request(url, { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    let stockPrice = body.c;
                    console.log(doc.id, " => ", stockPrice);
                    stockDB.doc(stockId).set({
                        id : stockId,
                        currentPrice: stockPrice,
                        previousPrice: stockPrice
                    }, { merge: true }).then(() => {
                        console.log(stockId, "Updated Succesfully to", stockPrice);
                    }).catch((error) => {
                        console.log("Error updating :", stockId, error)
                    });
                });
                updateStockName(stockId);
            }
        })

        userDB.doc(userID).update({
            watchList: firebase.firestore.FieldValue.arrayUnion(
                {
                    id: stockId,
                    buy: 0,
                    sell: 0,
                    stopLoss: 0,
                    trailing: 0,
                }
            ),
            userStocks: firebase.firestore.FieldValue.arrayUnion(stockId)
        }).then(() => {
            console.log(stockId, "added Succesfully");
            resolve(true)
        }).catch((error) => {
            console.log("Error adding :", stockId, error);
            reject(true)
        })
    })
}

export const updateStock = () => {
    
}

export const getStock = (stockId) => {
     return new Promise((resolve, reject) => {
        stockDB.doc(stockId).get().then(doc => {
            resolve(doc.data());
            }, reject)
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
             
    }

export const deleteStock = (userID, stockId) => {
    userDB.doc(userID).update({
            userStocks: firebase.firestore.FieldValue.arrayRemove(stockId)
            
        }).then(() => {
            console.log(stockId, "removed Successfully");
        }).catch((error) => {
            console.log("Error adding :", stockId, error);
        })
}