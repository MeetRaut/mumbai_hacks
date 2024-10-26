import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from './components/Onboarding';
import Login from './components/Login';
import Signup from './components/Signup';
import BottomTabsNavigator from './screens/BottomTabsNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={BottomTabsNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
