import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AdminNav from './AdminNav';
import { createStackNavigator } from '@react-navigation/stack';
import StudentNav from './StudentNav';
import { AdminClasses, Daignose, Login, OnBoarding, PreviousDiagnosis, Profile, SignUp, StudentList, SubjectByClassesList, SubjectList } from '../screens';
import { colors } from '../constants/colors';
import { AppContext } from '../context/AppContext';
import TeacherNav from './TeacherNav';

const MainStack = createStackNavigator()


export default function EnvironmentApp() {
  const {state} = useContext(AppContext);

  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.mainBg
          }
        }}>
          {!state.loggedin ? (
            <>
              <MainStack.Screen component={OnBoarding} name={'OnBoarding'} />
              <MainStack.Screen component={Login} name={'Login'} />
              <MainStack.Screen component={SignUp} name={'SignUp'} />
            </>
          ) : (
            <>
              {state.user.role === 'user' && (
              <MainStack.Screen component={AdminNav} name={'AdminNav'} />
              )}
                <MainStack.Screen component={Daignose} name={'Daignose'} />
                <MainStack.Screen component={PreviousDiagnosis} name={'PreviousDiagnosis'} />
            </>
          )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
