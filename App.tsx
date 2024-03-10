// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllNotes from './src/screens/AllNotes';
import AddNotes from './src/screens/AddNotes';
import Splash from './src/screens/Splash';
import NotesDetails from './src/screens/NotesDetails';
import EditNote from './src/screens/EditNotes';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='splash' component={Splash} options={{headerShown:false}}/>
      <Stack.Screen name="allnote" component={AllNotes} options={{headerShown:false}}/>
      <Stack.Screen name="addnote" component={AddNotes} options={{}}/>
      <Stack.Screen name='notedetails' component={NotesDetails}/>
      <Stack.Screen name='editnote' component={EditNote}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;