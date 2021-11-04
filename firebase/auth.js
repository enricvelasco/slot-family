import firebase from "../firebase/config";

export const setLoginWithEmailAndPassword = async (email, password) => (
  await firebase.auth().signInWithEmailAndPassword(email, password)
)

export const getToken = async () => {
  var token = await firebase.auth().currentUser.getIdToken();
  return token;
  // var response = await httpClient.get(url,headers: {'Authorization':"Bearer $token"});
}

export const onAuthStateChange = (onChange) => {
  return firebase.auth().onAuthStateChanged(data => {
    console.log('LOGGED::', data)
    onChange(data)
  })
}

export const onSignOut = () => {
  firebase.auth().signOut().then(function () {
    window.location.href = '/'
  }).catch(function (error) {
    console.error('ERROR_ON_SIGN_OUT', error)
  })
}
