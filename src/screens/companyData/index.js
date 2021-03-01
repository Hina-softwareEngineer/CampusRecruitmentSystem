import * as React from 'react';
import {Button, Text, Root} from 'native-base';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {getSpecificCompanyData} from '../../middleware/queries/companies';
import {connect} from 'react-redux';
import {useState} from 'react';

export function SearchScr({route, navigation}) {
  console.log('---route---', route.params);
  let [company, setcompany] = React.useState(null);

  React.useEffect(() => {
    getCompanyOne();
    navigation.setOptions({title: route.params.selectedId?.userName});
  }, []);

  async function getCompanyOne() {
    console.log('response-->------------');
    let response = await getSpecificCompanyData(route.params.selectedId.uid);
    if (response) {
      console.log('response-->', response);
      setcompany({
        ...response[Object.keys(response)],
        ...route.params.selectedId,
      });
    }
  }

  console.log('--resp---', company);

  return (
    <Root>
      <View style={styles.content}>
        {company ? (
          <>
            <Text style={styles.jobTitle}>Job Title : {company.title}</Text>
            <Text style={styles.companyName}>Company : {company.userName}</Text>

            <Text style={styles.contact}>Job Description</Text>
            <Text
              style={{
                ...styles.description,
                paddingBottom: 20,
                paddingTop: 10,
              }}>
              {company.description}
            </Text>
            <Text style={styles.techStack}>
              Technologies Preferred : {company.techStack}
            </Text>

            <Text style={styles.contact}>Contact Us :</Text>
            <Text style={styles.description}>{company.phone}</Text>
            <Text style={styles.description}>{company.email}</Text>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  content: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  jobTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  companyName: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  description: {
    fontSize: 16,
    color: '#1a1a1a',
  },

  techStack: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  contact: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
});

let CompanyData = connect(null, null)(SearchScr);
export {CompanyData};
