import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Cadastro from '../screens/Cadastro';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />  
      <Stack.Screen name="Cadastro" component={Cadastro}/>   
      <Stack.Screen name="Home" component={Home}/> 
    </Stack.Navigator>

    
  );
}

export default Navigator;