/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

Icon.loadFont();

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function NewStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#FFF',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{
          title: 'Selecione o prestador',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.tron.log(navigation);
                navigation.navigate('Dashboard');
              }}
            >
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{
          title: 'Selecione o horário',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SelectProvider');
              }}
            >
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          title: 'Confirmar agendamento',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SelectDateTime');
              }}
            >
              <Icon name="chevron-left" size={20} color="#FFF" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function createRouter(isSigned = false) {
  return !isSigned ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  ) : (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: '#FFF',
        inactiveTintColor: 'rgba(255,255,255,0.6)',
        style: {
          backgroundColor: '#8d41a8',
          borderTopWidth: 0,
        },
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Agendamentos',
          tabBarIcon: ({ color }) => (
            <Icon name="event" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="New"
        component={NewStack}
        options={{
          tabBarVisible: false,
          tabBarLabel: 'Agendar',
          tabBarIcon: ({ color }) => (
            <Icon name="add-circle-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={20} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
