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
    ref.doc(id).update(data)
      .then(doc => resolve(doc))
      .catch(err => reject(err))
  })
}

export const saveCar = (data) => {
  return new Promise(function(resolve, reject) {
    ref.add(data)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const setImage = ({ filename, payload }) => {
  const storageRef = firebase.storage().ref(`car_images_sizes/${filename}`);

  return new Promise(function(resolve, reject) {
    storageRef.put(payload)
      .then(snapshot => {
        storageRef.getDownloadURL()
          .then(url => {
            resolve(url)
          })
          .catch(err => console.log('ERROR_ON_DOWNLOAD_IMAGE', err))
      })
      .catch(err => console.log('ERROR_ON_UPDATE_IMAGE', err))
  })
}

export const deleteCar = () => {

}
