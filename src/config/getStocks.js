import firebase from 'firebase';

const getStocks = () => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection("Stocks")
          .onSnapshot((snapshot) => {
        console.log('onSnapshot Called!')
        let updatedData = snapshot.docs.map(doc => doc.data())
        resolve(updatedData)
      }, reject)
    } )
}

export default getStocks

