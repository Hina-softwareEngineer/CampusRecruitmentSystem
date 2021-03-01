import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const signInUser = async (email, password) => {
  let response = await auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res) => {
      console.log(res.user);
      let response;
      let user;

      await database()
        .ref(`/users/${res.user.uid}`)
        .once('value')
        .then((snapshot) => {
          console.log('User data: ', snapshot.val());
          user = snapshot.val();
        });
      response = {...user, uid: res.user.uid};
      return response;
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        return 'User not found!';
      }
      if (error.code === 'auth/wrong-password') {
        return 'Incorrect Password';
      }
    });
  return response;
};
