import firebase from 'firebase';

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

export const getStock = (userId, stockId) => {
        return new Promise((resolve, reject) => {
            // this part will br handled by droyder
        }
    )
}

const userDB = firebase.firestore().collection("Users");
const userId = firebase.auth().currentUser.email.toString();

export const addStock = ( stockId, newStockInfo) => {
        // return new Promise((resolve, reject) => {
        //     // this part will br handled by droyder
            
        // }
        userDB.doc(userId).update({
            stocks : newStocks
        })
}

export const deleteStock = (userId, stockId) => {
    return new Promise((resolve, reject) => {
        // this part will br handled by droyder
    }
    )
}



