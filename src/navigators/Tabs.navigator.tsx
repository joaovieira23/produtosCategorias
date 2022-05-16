import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Adicionar from '../pages/Adicionar';
import Atividades from '../pages/Atividades';
import ButtonTab from '../components/ButtonTab';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type TabNavigatorParams = {
  Inicio: undefined;
  Adicionar: undefined;
  Atividades: undefined
};

const Tab = createBottomTabNavigator<TabNavigatorParams>();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      //@ts-ignore
      tabBarOptions={{
        labelStyle: {
          fontFamily: 'Poppins-Medium'
        },
        tabStyle: {
          paddingVertical: 4,
        },
        adaptive: true,
        allowFontScaling: true,
        keyboardHidesTabBar: Platform.OS === 'android',
      }}
    >
      <Tab.Screen options={{
        tabBarIcon: ({ size, color }) => (
          <Icon name="home-outline" size={size} color={color} />
        )
      }} name="Inicio" component={Home} />

      <Tab.Screen options={{
        tabBarLabel: '',
        tabBarIcon: () => (
          <ButtonTab />
        )
      }} name="Adicionar" component={Adicionar} />

      <Tab.Screen options={{
        tabBarIcon: ({ size, color }) => (
          <Icon name="trackpad" size={size} color={color} />
        )
      }} name="Categorias" component={Atividades} />

    </Tab.Navigator>
  );
}

export default Tabs;