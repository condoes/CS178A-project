import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Landing from "../screens/landing";
import TimerPick from "../screens/timerPick";
import Profile from "../screens/Profile";
import ForgotPassword from "../screens/ForgotPassword";
import TimerScreen from "../screens/timerScreen";
import Login from "../screens/Login";
import Register from "../screens/Register";
import PickPet from "../screens/pickPet";
import ConfirmPet from "../screens/confirmPet";
import NamePet from "../screens/namePet";
import Store from "../screens/Store";
import Settings from "../screens/settings";
import Tutorial from "../screens/Tutorial";
import Analytics from "../screens/Analytics";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PickPet"
          component={PickPet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmPet"
          component={ConfirmPet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tutorial"
          component={Tutorial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TimerPick"
          component={TimerPick}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TimerScreen"
          component={TimerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Store"
          component={Store}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Analytics"
          component={Analytics}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
