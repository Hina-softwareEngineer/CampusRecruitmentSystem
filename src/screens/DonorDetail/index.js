import * as React from 'react';
import {
  Container,
  Content,
  Form,
  Input,
  Label,
  Button,
  Text,
  Toast,
  Root,
  ListItem,
  Radio,
  Right,
  Left,
  Textarea,
  CheckBox,
  Body,
  DatePicker,
} from 'native-base';
import {Keyboard, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {FooterNav} from '../../components/Footer';
import {
  addDonorData,
  getUserMedicalData,
  updateDonorData,
  getUser,
} from '../../middleware/queries/donorData';
import {SpinnerLoader} from '../../components/Spinner';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {useState} from 'react';

export function BloodUserDetailsComp({user, navigation}) {
  let [address, setAddress] = React.useState(null);
  let [dateOfBirth, setDateOfbirth] = React.useState(null);
  let [cnic, setCnic] = React.useState(null);
  let [department, setDepartment] = React.useState(null);
  let [matric, setMatric] = React.useState(null);
  let [inter, setInter] = React.useState(null);
  let [gpa, setGpa] = React.useState(null);
  let [workExp, setWorkExp] = React.useState(null);
  let [submitDisable, setSubmitDisable] = React.useState(false);
  let [resume, setResume] = useState(null);

  React.useEffect(() => {
    // console.log('-----------student -------------', user);
    navigation.setOptions({title: user['userName']});
    async function studentData() {
      let resp = await getUserMedicalData(user?.uid);
      if (resp) {
        setSubmitDisable(true);
        console.log('resp', resp);
        let data = resp[Object.keys(resp)[0]];
        setAddress(data.address);
        setCnic(data.cnic);
        setDateOfbirth(data.dateOfBirth);
        setDepartment(data.department);
        setGpa(data.gpa);
        setInter(data.inter);
        setMatric(data.matric);
        setWorkExp(data.workExp);
        setResume(data.resume);
      }
    }
    studentData();
  }, []);

  // console.log('--dateof birht', resume);

  const onSubmitForm = async () => {
    Keyboard.dismiss();
    if (
      address &&
      dateOfBirth &&
      cnic &&
      department &&
      matric &&
      inter &&
      workExp &&
      gpa &&
      resume
    ) {
      let data = {
        userId: user.uid,
        address,
        dateOfBirth,
        cnic,
        department,
        matric,
        inter,
        workExp,
        gpa,
        resume,
      };

      // console.log(data);

      let response = await addDonorData(data);
      console.log(response);
      if (response) {
        Toast.show({
          text: 'Successfully Saved.',
          position: 'top',
          type: 'success',
          style: {
            marginHorizontal: 10,
            borderRadius: 3,
            minHeight: 40,
            shadowOffset: {
              width: 10,
              height: 3,
            },
            elevation: 6,
          },
        });
        // setAddress(null);
        // setCnic(null);
        // setDepartment(null);
        // setDateOfbirth(null);
        // setMatric(null);
        // setInter(null);
        // setGpa(null);
        // setWorkExp(null);
        // setResume(null);
        setSubmitDisable(true);
      }
    } else {
      Toast.show({
        text: 'Fill all the necessage fields first!',
        position: 'top',
        type: 'danger',
        style: {
          marginHorizontal: 10,
          borderRadius: 3,
          minHeight: 40,
          shadowOffset: {
            width: 10,
            height: 3,
          },
          elevation: 6,
        },
      });
    }
  };

  const alertAlreadyAdd = () => {
    Toast.show({
      text: 'You have already submitted!',
      position: 'top',
      type: 'danger',
      style: {
        marginHorizontal: 10,
        borderRadius: 3,
        minHeight: 40,
        shadowOffset: {
          width: 10,
          height: 3,
        },
        elevation: 6,
      },
    });
  };

  return (
    <Root>
      <Container>
        <Content style={styles.content}>
          <Text style={styles.heading}>Profile</Text>
          <Form style={{marginTop: 15}}>
            <Content style={(styles.input, {marginTop: 30})}>
              <Label style={styles.label}>Address</Label>
              <Input
                placeholder="Enter Address"
                style={styles.inputBox}
                value={address}
                onChangeText={(value) => setAddress(value)}
              />
            </Content>

            <Content style={(styles.input, {marginTop: 30})}>
              <Label style={styles.label}>CNIC</Label>
              <Input
                style={styles.inputBox}
                placeholder="Enter CNIC"
                value={cnic}
                onChangeText={(value) => setCnic(value)}
              />
            </Content>
            <Content style={(styles.input, {marginTop: 30})}>
              <Label style={styles.label}>Department</Label>
              <Input
                style={styles.inputBox}
                placeholder="Enter Department"
                value={department}
                onChangeText={(value) => setDepartment(value)}
              />
            </Content>
            <Content style={(styles.input, {marginTop: 30})}>
              <Label style={styles.label}>Date of Birth</Label>
              <Input
                style={styles.inputBox}
                placeholder="Enter DOB"
                value={dateOfBirth}
                onChangeText={(value) => setDateOfbirth(value)}
              />
            </Content>

            <Content style={(styles.input, {marginTop: 30})}>
              <Label style={styles.label}>Matriculation Marks</Label>
              <Input
                style={styles.inputBox}
                placeholder="Enter Matric marks"
                value={matric}
                onChangeText={(value) => setMatric(value)}
              />
            </Content>

            <Content style={(styles.input, {marginTop: 30})}>
              <Label style={styles.label}>Intermediate Marks</Label>
              <Input
                style={styles.inputBox}
                placeholder="Enter Intermediate marks"
                value={inter}
                onChangeText={(value) => setInter(value)}
              />
            </Content>

            <Content style={(styles.input, {marginTop: 30})}>
              <Label style={styles.label}>CGPA</Label>
              <Input
                style={styles.inputBox}
                placeholder="Enter CGPA"
                value={gpa}
                onChangeText={(value) => setGpa(value)}
              />
            </Content>

            <Content style={(styles.input, {marginTop: 30})}>
              <Label style={styles.label}>Upload Resume</Label>
              <Button
                onPress={() => {
                  async function uploadResume() {
                    try {
                      const res = await DocumentPicker.pick({
                        type: [DocumentPicker.types.pdf],
                      });
                      console.log(res);
                      if (res && res.name.includes('.pdf')) {
                        let rnfs = await RNFS.readFile(
                          res.uri,
                          'base64',
                        ).then();
                        if (rnfs) {
                          setResume({fileName: res.name, base64: rnfs});
                        }
                      } else {
                        Toast.show({
                          text: 'Upload pdf files only!',
                          position: 'top',
                          type: 'danger',
                          style: {
                            marginHorizontal: 10,
                            borderRadius: 3,
                            minHeight: 40,
                            shadowOffset: {
                              width: 10,
                              height: 3,
                            },
                            elevation: 6,
                          },
                        });
                      }
                    } catch (err) {
                      if (DocumentPicker.isCancel(err)) {
                        // User cancelled the picker, exit any dialogs or menus and move on
                      } else {
                        throw err;
                      }
                    }
                  }
                  uploadResume();
                }}>
                <Text>Upload Resume</Text>
              </Button>
              {resume && <Label>{resume.fileName}</Label>}
            </Content>

            <Content style={(styles.input, {marginTop: 35})}>
              <Label style={styles.label}>Work Experience (If any)</Label>
              <Textarea
                style={styles.textArea}
                value={workExp}
                rowSpan={4}
                bordered
                placeholder="Textarea"
                onChangeText={(val) => setWorkExp(val)}
              />
            </Content>

            <Button
              style={submitDisable ? styles.btnSubmitDisable : styles.btnSubmit}
              onPress={submitDisable ? alertAlreadyAdd : onSubmitForm}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
      <FooterNav />
    </Root>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    letterSpacing: 0.8,
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 10,
    padding: 0,
  },
  label: {
    fontSize: 12,
    color: '#1a1a1a',
    marginBottom: 3,
  },
  inputBox: {
    height: 50,
    borderRadius: 3,
    color: '#1a1a1a',
    borderColor: 'rgba(112,112,112,0.5)',
    borderWidth: 1,
  },
  textArea: {
    marginTop: 5,
    marginBottom: 30,
  },
  btnSubmit: {
    marginVertical: 20,
    width: '100%',
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    borderRadius: 3,
  },
  btnSubmitDisable: {
    marginVertical: 20,
    width: '100%',
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    borderRadius: 3,
    opacity: 0.4,
  },
  textColor: {
    color: '#1a1a1a',
  },
});

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

let BloodUserDetails = connect(mapStateToProps, null)(BloodUserDetailsComp);
export {BloodUserDetails};
