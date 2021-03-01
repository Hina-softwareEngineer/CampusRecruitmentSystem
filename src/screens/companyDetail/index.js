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
import {addCompanyData} from '../../middleware/queries/companies';
import {SpinnerLoader} from '../../components/Spinner';

export function BloodUserDetailsComp({user, navigation}) {
  let [address, setAddress] = React.useState(null);
  let [role, setRole] = React.useState(null);
  let [techStack, setTechStack] = React.useState(null);
  let [description, setDescription] = React.useState(null);

  React.useEffect(() => {
    // console.log('-----------student -------------', user);
    navigation.setOptions({title: user['userName']});
  }, []);

  // console.log('--dateof birht', dateOfBirth);

  const onSubmitForm = async () => {
    Keyboard.dismiss();
    if (address && description && role && techStack) {
      let data = {
        userId: user.uid,
        techStack: techStack,
        title: role,
        description,
      };

      console.log(data);

      let response = await addCompanyData(data);
      console.log(response);
      if (response) {
        Toast.show({
          text: 'Successfully posted new Job Vacancy.',
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
        setAddress(null);
        setDescription(null);
        setRole(null);
        setTechStack(null);
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

  return (
    <Root>
      <Container>
        <Content style={styles.content}>
          <Text style={styles.heading}>Job Vacancy</Text>
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
              <Label style={styles.label}>For Role </Label>
              <Input
                style={styles.inputBox}
                placeholder="Enter role"
                value={role}
                onChangeText={(value) => setRole(value)}
              />
            </Content>

            <Content style={(styles.input, {marginTop: 30})}>
              <Label style={styles.label}>Tech Stack</Label>
              <Input
                style={styles.inputBox}
                placeholder="Enter tech Stack"
                value={techStack}
                onChangeText={(value) => setTechStack(value)}
              />
            </Content>

            <Content style={(styles.input, {marginTop: 35})}>
              <Label style={styles.label}>Description</Label>
              <Textarea
                style={styles.textArea}
                value={description}
                rowSpan={4}
                bordered
                placeholder="Textarea"
                onChangeText={(val) => setDescription(val)}
              />
            </Content>

            <Button style={styles.btnSubmit} onPress={onSubmitForm}>
              <Text>Add</Text>
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

let CompanyDetails = connect(mapStateToProps, null)(BloodUserDetailsComp);
export {CompanyDetails};
