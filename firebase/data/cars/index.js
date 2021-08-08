import firebase from "../../config";

const collectionName = 'cars'
const ref = firebase.firestore().collection(collectionName)

export const getCars = async () => {
  return new Promise(function(resolve, reject) {
    ref.get()
      .then(querySnapshot => {
        const datalist = []
        querySnapshot.forEach(doc => {datalist.push({id: doc.id, ...doc.data()})});
        resolve(datalist)
      })
      .catch(err => reject(err))
  })
}

export const getCarById = async (id) => {
  return new Promise(function(resolve, reject) {
    ref.doc(id).get()
      .then(doc => resolve({ id: doc.id, ...doc.data() }))
      .catch(err => reject(err))
  })
}

export const updateCar = (data) => {
  const { id } = data
  return new Promise(function(resolve, reject) {
    ref.doc(id).set(data)
      .then(doc => resolve(doc))
      .catch(err => reject(err))
  })
}

export const saveCar = (data) => {
  ref.add(data)
    .then(data => console.log('COCHE_gUARDADO', data))
    .catch(error => console.log('ERROR', error))
}

export const deleteCar = () => {

}
