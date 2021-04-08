import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';


import { BottomTabParamList, TabOneParamList, TabProfileParamList, TabHomeParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].primary }}>
      <BottomTab.Screen
        name="TabHome"
        component={TabHomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-camera-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabProfile"
        component={TabProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-bar-chart-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={styles.icon} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabHomeStack = createStackNavigator<TabHomeParamList>();

function TabHomeNavigator() {
  return (
    <TabHomeStack.Navigator>
      <TabHomeStack.Screen
        name="TabHomeScreen"
        component={HomeScreen}
        // options={{ headerShown: false }}
      />
    </TabHomeStack.Navigator>
  );
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabProfileStack = createStackNavigator<TabProfileParamList>();

function TabProfileNavigator() {
  return (
    <TabProfileStack.Navigator>
      <TabProfileStack.Screen
        name="TabProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile & Stats' }}
      />
    </TabProfileStack.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 5,
    marginBottom: -3,
  }
})