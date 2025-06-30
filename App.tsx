import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './Frontend/ThemeContext';
import Entrypage from './Frontend/src/Entrypage';
import Loginpage from './Frontend/src/Loginpage';
import Home from './Frontend/src/Home';
import Setting from './Frontend/src/Setting';
import Profilepage from './Frontend/src/Profilepage';

const Stack = createNativeStackNavigator();

const NavigationWrapper = () => {
  const { navTheme } = useTheme();   

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Entry" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Entry" component={Entrypage} />
        <Stack.Screen name="Login" component={Loginpage} />
        <Stack.Screen name="setting" component={Setting}   />
        <Stack.Screen name="Home" component={Home}      />
        <Stack.Screen name="profile" component={Profilepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationWrapper />
    </ThemeProvider>
  );
}
