import database from '@react-native-firebase/database';

export const getAllCompanies = async () => {
  let companies = await database()
    .ref('/users')
    .orderByChild('role')
    .equalTo('company')
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
  return companies;
};

export const addCompanyData = async (data) => {
  if (data) {
    const newRef = await database().ref('/company').push();
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

export const getSpecificCompanyData = async (userId) => {
  console.log('user i d', userId);
  if (userId) {
    let response = await database()
      .ref(`/company`)
      .orderByChild('userId')
      .equalTo(userId)
      .once('value')
      .then((res) => res.val())
      .catch((err) => err);
    console.log('----resposne-', response);
    return response;
  }
  return null;
};

export const getSpecificCompanyDelete = async (userId) => {
  if (userId) {
    let response;
    await database()
      .ref(`/company`)
      .orderByChild('userId')
      .equalTo(userId)
      .once('value')
      .then(async (res) => {
        if (res.val()) {
          let value = Object.keys(res.val())[0];
          await database().ref(`/company/${value}`).remove();
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
