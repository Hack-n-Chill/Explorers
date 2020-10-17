// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const request = require('request');

const db = admin.firestore();

exports.addUsersInCollection = functions.auth.user().onCreate((user) => {
  // Create a doc of User collection in firestore
        db.collection('Users').doc(user.email).set({
        name: user.displayName,
        stocks : []
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

});

exports.updateStockPrices = functions.pubsub.schedule('every 5 minutes').onRun((context) => {

    db.collection("Stocks").get().then(function(querySnapshot) {
        querySnapshot.forEach(function (doc) {
            const url = 'https://finnhub.io/api/v1/quote?symbol=';
            const token = '&token=bu4heof48v6p8t6ghn2g';
            url = url + doc.id.toString() + token;
            var stockPrice;
            request(url, { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }
                console.log(body.explanation);
                stockPrice = body.explanation.c;
            });
            
            console.log(doc.id, " => ", stockPrice);
            // db.collection('Stocks').doc(doc.id.toString()).update({
            //     price: stockPrice
            // });
        });
    });

   return console.log('This will be run every 5 minutes to update stock prices');
 
});

