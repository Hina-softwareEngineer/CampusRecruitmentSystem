import database from '@react-native-firebase/database';

export const addDonorData = async (data) => {
  if (data) {
    const newRef = await database().ref('/student').push();
    let response = await newRef
      .set({
        ...data,
        _id: newRef.key,
      })
      .then((res) => {
        return true;
      })
      .catch((e) => {
        return false;
      });
    return response;
  }
  return false;
};

// export const updateDonorData = async (id, data) => {
//   let updateRes = await database()
//     .ref(`/donor/${id}`)
//     .update({
//       ...data,
//     })
//     .then((res) => true)
//     .catch((err) => false);
//   return updateRes;
// };

export const getUserMedicalData = async (userId) => {
  if (userId) {
    let response = await database()
      .ref(`/student`)
      .orderByChild('userId')
      .equalTo(userId)
      .once('value')
      .then((res) => res.val())
      .catch((err) => err);
    return response;
  }
  return null;
};

export const getAllStudents = async () => {
  let students = await database()
    .ref('/users')
    .orderByChild('role')
    .equalTo('student')
    .once('value')
    .then(async (resp) => {
      let values = resp.val();
      let dataArray = [];
      if (values) {
        let keys = Object.keys(values);
        if (keys) {
          keys.forEach(async (k) => {
            dataArray.push({...values[k], uid: k});
          });
        }
      }
      return dataArray;
    });
  return students;
};

export const getUser = async (userId) => {
  if (userId) {
    let user = await database()
      .ref('/users')
      .orderByKey()
      .equalTo(userId)
      .once('value')
      .then((resp) => {
        return resp.val();
      });
    return user;
  }
  return null;
};

export const getSpecificUserDelete = async (userId) => {
  if (userId) {
    let response;
    await database()
      .ref(`/student`)
      .orderByChild('userId')
      .equalTo(userId)
      .once('value')
      .then(async (res) => {
        if (res.val()) {
          let value = Object.keys(res.val())[0];
          await database().ref(`/student/${value}`).remove();
        }
      })
      .catch((err) => err);
    response = await database()
      .ref(`/users/${userId}`)
      .remove()
      .then(() => {
        return true;
      });

    return response;
  }
  return false;
};
