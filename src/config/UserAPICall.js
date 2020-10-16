import firebase from 'firebase';

export const getAllWatchList = user => {
    // an api call to the server to fetch all the eatchLists of tht secific user
    return []
}

export const getAllStocks = () => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("Stocks")
            .onSnapshot((snapshot) => {
                // console.log('onSnapshot Called!')
                let updatedData = snapshot.docs.map(doc => doc.data())
                resolve(updatedData)
            }, reject)
    })
}
