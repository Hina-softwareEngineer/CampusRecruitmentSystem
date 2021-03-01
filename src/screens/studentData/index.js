import * as React from 'react';
import {Button, Text, Root} from 'native-base';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {getUserMedicalData} from '../../middleware/queries/donorData';
import {connect} from 'react-redux';
import {useState} from 'react';
import PDFView from 'react-native-view-pdf';

export function SearchScr({route, navigation}) {
  console.log('---route----->', route.params);
  let [company, setcompany] = React.useState(null);
  let [pdf, setPdf] = useState(false);

  React.useEffect(() => {
    getCompanyOne();
    navigation.setOptions({title: route.params.selectedId?.userName});
  }, []);

  async function getCompanyOne() {
    let response = await getUserMedicalData(route.params.selectedId.uid);
    if (response) {
      setcompany({
        ...response[Object.keys(response)],
        ...route.params.selectedId,
      });
    }
  }

  // console.log('--resp----->', company);

  return (
    <Root>
      {pdf ? (
        <>
          <PDFView
            fadeInDuration={250.0}
            style={{flex: 1}}
            resource={company.resume.base64}
            resourceType={'base64'}
            onLoad={() => console.log(`PDF rendered from base64`)}
            onError={(error) => console.log('Cannot render PDF', error)}
          />
        </>
      ) : (
        <ScrollView style={styles.content}>
          {company ? (
            <>
              <Text style={styles.jobTitle}>
                Student Name : {company.userName}
              </Text>
              <Text style={styles.companyName}>CNIC : {company.cnic}</Text>

              <Text style={styles.contact}>Department of Studying</Text>
              <Text style={styles.department}>{company.department}</Text>

              <Text style={{paddingBottom: 2, ...styles.contact}}>Resume</Text>
              <Button
                style={{width: '50%', justifyContent: 'center'}}
                onPress={() => {
                  setPdf(true);
                }}>
                <Text>Open pdf</Text>
              </Button>

              <Text style={{...styles.contact, paddingBottom: 10}}>
                Educational Details
              </Text>

              <View style={styles.tableCell}>
                <Text style={styles.cell}>Matric</Text>
                <Text style={styles.cell}>{company.matric}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.cell}>Intermediate</Text>
                <Text style={styles.cell}>{company.inter}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.cell}>GPA</Text>
                <Text style={styles.cell}>{company.gpa}</Text>
              </View>

              <Text style={styles.contact}>Work Experience</Text>
              <Text
                style={{
                  ...styles.description,
                  paddingBottom: 10,
                }}>
                {company.workExp}
              </Text>

              <Text style={styles.contact}>Contact Details</Text>
              <Text style={styles.description}>{company.phone}</Text>
              <Text style={styles.description}>{company.email}</Text>

              <Text style={styles.techStack}>Address : {company.address}</Text>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </ScrollView>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  companyName: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  description: {
    fontSize: 16,
    color: '#1a1a1a',
  },

  techStack: {
    marginTop: 4,
    marginBottom: 20,
    paddingBottom: 20,
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
  department: {
    fontSize: 17,
    color: '#1a1a1a',
  },
  tableCell: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cell: {
    paddingVertical: 3,
    fontSize: 16,
  },
});

let StudentData = connect(null, null)(SearchScr);
export {StudentData};
