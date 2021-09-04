import firebase from "../../config";
import {sortArrayByParam} from "../../../services/array";

const collectionName = 'users'
const ref = firebase.firestore().collection(collectionName)

export const getUsers = async () => {
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

export const getUserById = async (id) => {
  return new Promise(function(resolve, reject) {
    ref.doc(id).get()
      .then(doc => resolve({ id: doc.id, ...doc.data() }))
      .catch(err => reject(err))
  })
}

export const updateUser = (data) => {
  const { id } = data
  return new Promise(function(resolve, reject) {
    ref.doc(id).update(data)
      .then(doc => resolve(doc))
      .catch(err => reject(err))
  })
}

export const saveUser = (data) => {
  return new Promise(function(resolve, reject) {
    ref.add(data)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const deleteUser = () => {

}
