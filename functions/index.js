// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const request = require('request');

exports.updateStockPrices = functions.pubsub.schedule('every 5 minutes').onRun((context) => {

    const stockDB = admin.firestore().collection("Stocks");

    const updateStockPrice = (stockId, price) => {
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
    
    stockDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            let url = 'https://finnhub.io/api/v1/quote?symbol=';
            let token = '&token=bu4heof48v6p8t6ghn2g';
            url = url + doc.id.toString() + token;
            request(url, { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }
                let stockPrice = body.c;
                console.log(doc.id, " => ", stockPrice);
                updateStockPrice(doc.id.toString(), stockPrice);
            });
            // let id = doc.id.toString();
            // console.log(getStockPriceFromAPI(id));
            // updateStockPrice(id, getStockPriceFromAPI(id));
        })
    })

   return console.log('every 5 minutes it will update stock prices');
 
});

