import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {connect} from 'react-redux';

import {LoginScreen} from '../Login';
import {SignUpScreen} from '../Signup';
import {BloodUserDetails} from '../DonorDetail';
import {loadingUser} from '../../middleware/queries/loadingUser';
import {loadingUserState, logoutUser} from '../../redux/actions/authActions';
import {DonorsList} from '../DonorList';
import {StudentsList} from '../studentList';
import {CompanyDetails} from '../companyDetail';

import {bottomNavStateChange} from '../../redux/actions/navActions';
import {CompanyData} from '../companyData';
import {StudentData} from '../studentData';

const Stack = createStackNavigator();

function Navigation({
  user,
  navState,
  loadingUserState,
  logoutUser,
  bottomNavStateChange,
}) {
  console.log('--user nav---', user);
  React.useEffect(() => {
    async function userData() {
      let response = await loadingUser();
      if (response) {
        await loadingUserState(response);
      } else {
        await logoutUser();
      }
    }
    userData();
    if (navState === 2 || navState === 1) {
      bottomNavStateChange(0);
    }
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#3F51B5',
            },
            headerTintColor: '#fff',
          }}>
          {!user.isAuthenticated ? (
            <>
              <Stack.Screen
                name="Login"
                options={{
                  headerShown: false,
                }}
                component={LoginScreen}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Signup"
                component={SignUpScreen}
              />
            </>
          ) : null}
          {user.isAuthenticated && user.isLoaded ? (
            <>
              {user.user?.role === 'student' ? (
                <>
                  <Stack.Screen
                    name="donorsList"
                    options={{
                      title: 'Companies',
                    }}
                    component={DonorsList}
                  />
                  <Stack.Screen
                    name="UserProfile"
                    options={{
                      headerLeft: null,
                      cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    }}
                    component={BloodUserDetails}
                  />
                  <Stack.Screen
                    name="InfoCompany"
                    options={{
                      cardStyleInterpolator:
                        CardStyleInterpolators.forFadeFromBottomAndroid,
                    }}
                    component={CompanyData}
                  />
                </>
              ) : user.user?.role === 'company' ? (
                <>
                  <Stack.Screen
                    name="donorsList"
                    options={{
                      title: 'Students List',
                    }}
                    component={StudentsList}
                  />
                  <Stack.Screen
                    name="UserProfile"
                    options={{
                      headerLeft: null,
                      cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    }}
                    component={CompanyDetails}
                  />
                  <Stack.Screen
                    name="Infostudent"
                    options={{
                      cardStyleInterpolator:
                        CardStyleInterpolators.forFadeFromBottomAndroid,
                    }}
                    component={StudentData}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="donorsList"
                    options={{
                      title: 'Companies',
                    }}
                    component={DonorsList}
                  />
                  <Stack.Screen
                    name="studentList"
                    options={{
                      title: 'Students',
                      headerLeft: null,
                      cardStyleInterpolator:
                        CardStyleInterpolators.forHorizontalIOS,
                    }}
                    component={StudentsList}
                  />
                  <Stack.Screen
                    name="InfoCompany"
                    options={{
                      cardStyleInterpolator:
                        CardStyleInterpolators.forFadeFromBottomAndroid,
                    }}
                    component={CompanyData}
                  />
                  <Stack.Screen
                    name="Infostudent"
                    options={{
                      cardStyleInterpolator:
                        CardStyleInterpolators.forFadeFromBottomAndroid,
                    }}
                    component={StudentData}
                  />
                </>
              )}
            </>
          ) : null}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.userState,
  navState: state.navState.active,
});

export default connect(mapStateToProps, {
  loadingUserState,
  logoutUser,
  bottomNavStateChange,
})(Navigation);
