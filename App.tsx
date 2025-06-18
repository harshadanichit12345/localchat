import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loginpage from "./Frontend/src/Loginpage";
import Home from './Frontend/src/Home';
import Forgotpassword from "./Frontend/src/Forgotpassword";
import Profilepage from "./Frontend/src/Profilepage";
import Setting from "./Frontend/src/Setting";
import { ThemeProvider } from "./Frontend/context/ThemeContext"; 
import Entrypage from "./Frontend/src/Entrypage";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Entry" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Entry" component={Entrypage} />
          <Stack.Screen name="Login" component={Loginpage} />
          <Stack.Screen name="setting" component={Setting} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="forgetpassword" component={Forgotpassword} />
          <Stack.Screen name="profile" component={Profilepage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
