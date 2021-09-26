import firebase from "../../config";
import {sortArrayByParam} from "../../../services/array";

const collectionName = 'basic-race'
const ref = firebase.firestore().collection(collectionName)

let lastRaceCreated = '';
export const raceListener = () => {
  let firstTime = true

  console.log('RACE_LISTENER_INIT');
  ref.onSnapshot((querySnapshot) => {
    console.log('QUERY_SNAPSHOT')
    const races = []
    querySnapshot.forEach((doc) => {
      races.push({...doc.data(), id: doc.id});
    });
    // console.log('RACES::', sortArrayByParam(races, 'onCreateData').reverse())
    const lastRace = sortArrayByParam(races, 'onCreateData').reverse()[0]
    // console.log('LAST_RACE', lastRace.id)
    // console.log('LAST_RACE_CREATED', lastRaceCreated)
    // resolve(sortArrayByParam(races, 'onCreateData').reverse())
    const hasInRacePage = window.location.pathname.includes(lastRace?.id)
    if (!hasInRacePage && !firstTime && lastRace.id !== lastRaceCreated) {
      // console.log('NEW_TAB::', window.location)
      const url = `${window.location.origin}/basic-race/${lastRace.id}`
      window.open(url, '_blank')?.focus();
      // console.log('URL::::', url)
      // console.log('LAST_RACE_CREATED', lastRaceCreated)
      // lastRace.id !== lastRaceCreated && window.open(url, '_blank')?.focus();
      lastRaceCreated = lastRace.id
      // window.open(url, '_self').focus();
    }
    firstTime = false
  });
}

export const getBasicRaces = async () => {
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

export const getBasicRaceId = async (id) => {
  return new Promise(function(resolve, reject) {
    ref.doc(id).get()
      .then(doc => resolve({ id: doc.id, ...doc.data() }))
      .catch(err => reject(err))
  })
}

export const updateBasicRace = (data) => {
  const { id } = data
  return new Promise(function(resolve, reject) {
    ref.doc(id).update(data)
      .then(doc => resolve(doc))
      .catch(err => reject(err))
  })
}

export const saveBasicRace = (data) => {
  const race = {...data, onCreateData: Date.now()}
  return new Promise(function(resolve, reject) {
    ref.add(race)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export const deleteCar = () => {

}
