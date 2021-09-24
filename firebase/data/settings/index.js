import firebase from "../../config";
import {sortArrayByParam} from "../../../services/array";

const collectionName = 'settings'
const ref = firebase.firestore().collection(collectionName)

export const getSettings = async () => {
  return new Promise(function(resolve, reject) {
    ref.get()
      .then(querySnapshot => {
        const datalist = []
        querySnapshot.forEach(doc => {datalist.push({id: doc.id, ...doc.data()})});
        resolve(sortArrayByParam(datalist, 'name'))
      })
      .catch(err => reject(err))
  })
}

export const updateSettings = (data) => {
  const { id } = data
  return new Promise(function(resolve, reject) {
    ref.doc(id).update(data)
      .then(doc => resolve(doc))
      .catch(err => reject(err))
  })
}

export const saveSettings = (data) => {
  return new Promise(function(resolve, reject) {
    ref.add(data)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const deleteManufacturer = () => {

}
