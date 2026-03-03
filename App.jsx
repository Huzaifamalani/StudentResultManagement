import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StudentInfo from "./screens/StudentInfo";
import MarksEntry from "./screens/MarksEntry";
import ResultScreen from "./screens/ResultScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
        <Stack.Screen name="StudentInfo" component={StudentInfo}/>
        <Stack.Screen name="MarksEntry" component={MarksEntry} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;