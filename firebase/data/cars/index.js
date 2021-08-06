import firebase from "../../config";

const collectionName = 'cars'
const ref = firebase.firestore().collection(collectionName)

export const getCars = async () => {
  return new Promise(function(resolve, reject) {
    firebase.firestore().collection(collectionName).get()
      .then(querySnapshot => {
        const datalist = []
        querySnapshot.forEach(doc => {datalist.push({id: doc.id, ...doc.data()})});
        resolve(datalist)
      })
      .catch(err => reject(err))
  })
}

export const getCarById = () => {

}

export const updateCar = () => {

}

export const saveCar = (data) => {
  ref.add(data)
    .then(data => console.log('COCHE_gUARDADO', data))
    .catch(error => console.log('ERROR', error))
}

export const deleteCar = () => {

}
