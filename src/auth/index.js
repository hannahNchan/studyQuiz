import * as firebase from 'firebase'
import * as firebaseui from 'firebaseui';

var provider = new firebase.auth.GoogleAuthProvider();

export const getLogin = () => {
  let user = firebase.auth().currentUser;
  if (user != null) {
    console.log('================',user);
    user.providerData.forEach(profile => {
      console.log(profile.photoURL);
    });
  }
  firebase.auth().signInWithRedirect(provider)
    .then(result => {
      var user = firebase.auth().currentUser;
      if (user != null) {
        user.providerData.forEach(profile => {
          console.log(profile.photoURL);
        }); //this will give you all the urls once there is user data
      }
      console.log('result', result);
    }).catch(function(error) {
      console.log('error', error)
    });
};

export const getSignInOut = () => {
  firebase.auth().signOut().then(function() {
    console.log('se salió')
  }).catch(function(error) {
    console.log('error', error)
  });
};

