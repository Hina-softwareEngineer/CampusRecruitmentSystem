import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const loadingUser = async () => {
  let response;
  let awaitTrue;
  let wholeUser;
  await auth().onAuthStateChanged(async function (user) {
    if (user) {
      response = user;
    } else {
      response = null;
    }
  });

  if (response) {
    await database()
      .ref(`/users/${response.uid}`)
      .once('value')
      .then((snapshot) => {
        // console.log('User data on load: ', snapshot.val());
        wholeUser = snapshot.val();
      });
    awaitTrue = {...wholeUser, uid: response.uid};

    return awaitTrue;
  } else {
    return null;
  }
};

export const logoutSignInUser = async () => {
  auth()
    .signOut()
    .then(() => {
      console.log('Successfully Logout');
    })
    .catch((e) => {
      console.log('Unable to logout.');
    });
};
