import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateAREA from '../screens/CreateAREA';
import ForgotPassword from '../screens/ForgotPassword';
import Home from '../screens/Home';
import React from 'react';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Forgot" component={ForgotPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateAREA" component={CreateAREA} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
