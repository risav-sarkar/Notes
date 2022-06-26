import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useUserFetch } from "./hooks/useUserFetch";

import TabIcon from "./src/tabIcon";
import SplashScreen from "./screens/splashscreen";
import Home from "./screens/home";
import Profile from "./screens/profile";
import StartUp from "./screens/startup";
import Login from "./screens/login";
import Register from "./screens/register";
import Note from "./screens/note";

import { useEffect, useState } from "react";
import { View } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            if (focused) return <TabIcon name={"Home"} selected={true} />;
            else return <TabIcon name={"Home"} selected={false} />;
          } else if (route.name === "Profile") {
            if (focused) return <TabIcon name={"Profile"} selected={true} />;
            else return <TabIcon name={"Profile"} selected={false} />;
          }
        },
        tabBarLabel: () => {
          return null;
        },
        tabBarActiveBackgroundColor: "#0b0f13",
        tabBarInactiveBackgroundColor: "#0b0f13",
        headerShown: false,
        tabBarStyle: { height: 60, borderTopWidth: 0 },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default function App() {
  const { user } = useUserFetch();

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      >
        {user == "loading" ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : user === null ? (
          <>
            <Stack.Screen name="StartUp" component={StartUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="Note" component={Note} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
