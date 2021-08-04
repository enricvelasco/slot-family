import firebase from "../firebase/config";

export const setLoginWithEmailAndPassword = async (email, password) => (
  await firebase.auth().signInWithEmailAndPassword(email, password)
)

export const onAuthStateChange = (onChange) => {
  return firebase.auth().onAuthStateChanged(data => {
    onChange(data)
  })
}

export const onSignOut = () => {
  console.log('ON_SIGN_OUT')
  firebase.auth().signOut().then(function () {
    window.location.href = '/'
  }).catch(function (error) {
    console.error('ERROR_ON_SIGN_OUT', error)
  })
}
