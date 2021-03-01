import * as React from 'react';
import {
  Container,
  Content,
  Input,
  Text,
  Root,
  ListItem,
  List,
  Item,
  Left,
  Right,
  Label,
  Picker,
} from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconE from 'react-native-vector-icons/dist/Entypo';
import IconM from 'react-native-vector-icons/dist/MaterialIcons';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {FooterNav} from '../../components/Footer';
import {
  getAllCompanies,
  getSpecificCompanyDelete,
} from '../../middleware/queries/companies';
import {SpinnerLoader} from '../../components/Spinner';
import {useState} from 'react';

export function DonorsListComp({navigation, navState, user}) {
  let [usersList, setUsersList] = React.useState([]);
  let [updated, setUpdated] = React.useState(null);
  let [spinner, setSpinner] = React.useState(true);

  React.useEffect(() => {
    console.log('updated');
    getAllCompaniesData();
  }, [updated]);

  async function getAllCompaniesData() {
    let response = await getAllCompanies();
    if (response) {
      setUsersList(response);
    }
    setSpinner(false);
  }
  // console.log('--donot list---', user);

  return (
    <>
      <Root>
        <Container style={{paddingHorizontal: 15}}>
          {spinner ? (
            <SpinnerLoader />
          ) : (
            <Content style={{marginTop: 10}}>
              <List>
                {usersList?.length < 1 ? (
                  <ListItem
                    style={{
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Not found 😢 .
                    </Text>
                  </ListItem>
                ) : null}

                {usersList?.map((list, i) => (
                  <ListItem
                    style={{marginLeft: 5}}
                    key={i}
                    onPress={() => {
                      navigation.navigate('InfoCompany', {
                        selectedId: list,
                      });
                    }}>
                    <Left style={{alignItems: 'center'}}>
                      <Icon
                        name="building"
                        style={{
                          fontSize: 28,
                          color: 'rgba(112,112,112,0.6)',
                          marginRight: 10,
                        }}
                      />
                      <Content>
                        <Text style={styles.text}>{list.userName}</Text>
                        <Text style={styles.email}>{list.email}</Text>
                      </Content>
                    </Left>
                    {user?.user?.role ? (
                      <Right>
                        <IconE
                          name="cross"
                          onPress={() => {
                            async function companyDelete() {
                              let res = await getSpecificCompanyDelete(
                                list.uid,
                              );
                              console.log('---delete company---', res);
                              if (res) {
                                setUpdated(list.uid);
                              }
                            }
                            companyDelete();
                          }}
                          style={{
                            fontSize: 26,
                            color: 'rgba(255,0,0,0.8)',
                            marginRight: 3,
                          }}
                        />
                      </Right>
                    ) : null}
                  </ListItem>
                ))}
              </List>
            </Content>
          )}
        </Container>

        {/* <Modal animationType="fade" transparent visible={modalState}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Right style={styles.close}>
                <TouchableOpacity
                  style={{padding: 15}}
                  onPress={() => {
                    setModalState(false);
                  }}>
                  <Text>
                    <IconM
                      style={{
                        fontSize: 20,
                        color: '#3F51B5',
                      }}
                      name="close"
                    />
                  </Text>
                </TouchableOpacity>
              </Right>
              <Text style={styles.title}>{oneUserData?.userName}</Text>
              <Text style={styles.emailModal}>{oneUserData?.email}</Text>

              <Item style={styles.itemModalBloodGroup}>
                <Label style={styles.labels}>Blood Group </Label>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#3F51B5',
                    fontWeight: 'bold',
                  }}>
                  {oneUserData?.bloodGroup}{' '}
                  {oneUserData?.rhValue === 'neg' ? '-' : '+'}
                </Text>
              </Item>

              <Item style={styles.itemModal}>
                <Label style={styles.labelsMedical}>Address </Label>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'rgba(0,0,0,0.7)',
                  }}>
                  {oneUserData?.address}
                </Text>
              </Item>

              <Item style={styles.itemModal}>
                <Label style={styles.labels}>Phone </Label>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'rgba(0,0,0,0.7)',
                  }}>
                  {oneUserData?.phone}
                </Text>
              </Item>

              <Item style={styles.itemModal}>
                <Label style={styles.labels}>Home Phone </Label>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'rgba(0,0,0,0.7)',
                  }}>
                  {oneUserData?.homePhone}
                </Text>
              </Item>

              <Item style={styles.itemModal}>
                <Label style={styles.labelsMedical}>Medical Details </Label>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    width: 175,
                    color: 'rgba(0,0,0,0.7)',
                  }}>
                  {oneUserData?.medicalDetails}
                </Text>
              </Item>
            </View>
          </View>
        </Modal> */}

        <FooterNav />
      </Root>
    </>
  );
}

const mapStateToProps = (state) => ({
  navState: state.navState.active,
  user: state.userState,
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    position: 'relative',
    width: '85%',
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  close: {
    position: 'absolute',
    right: 0,
    top: 0,
    alignSelf: 'flex-end',
  },
  searchBox: {
    padding: 15,
    marginTop: 10,
    borderRadius: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(112,112,112,0.6)',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  bloodStyle: {
    backgroundColor: '#f8f1f0',
    color: '#3F51B5',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 15,
  },
  email: {
    fontSize: 12,
    color: '#1a1a1a',
    alignContent: 'flex-end',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    margin: 0,
  },
  emailModal: {
    textAlign: 'center',
    margin: 0,
    fontSize: 13,
    fontWeight: '700',
    color: '#767676',
    lineHeight: 16,
  },
  itemModalBloodGroup: {
    borderBottomWidth: 0,
    marginLeft: 0,
    marginVertical: 5,
    marginTop: 25,
  },
  itemModal: {
    borderBottomWidth: 0,
    marginLeft: 0,
    marginVertical: 5,
  },
  labels: {
    width: 100,
    fontSize: 12,
  },
  labelsMedical: {
    width: 100,
    fontSize: 12,
    paddingTop: 1,
    alignSelf: 'flex-start',
  },
});

let DonorsList = connect(mapStateToProps, null)(DonorsListComp);
export {DonorsList};
