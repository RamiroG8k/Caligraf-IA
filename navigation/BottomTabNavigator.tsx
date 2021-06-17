// Common
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// Hooks
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
// Screens
import HomeScreen from '../screens/HomeScreen';
import ShotScreen from '../screens/ShotScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AnalizeScreen from '../screens/AnalizeScreen';
// ParamsList
import { BottomTabParamList, TabProfileParamList, TabHomeParamList, TabAnallizeNavigator } from '../types';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    const options: BottomTabBarOptions = {
        activeTintColor: Colors[colorScheme].tabIconSelected,
        inactiveTintColor: Colors[colorScheme].tabIconDefault,
        showLabel: false,
        style: {
            alignItems: 'center',
            height: Platform.OS === 'ios' ? 75 : 60,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingVertical: 10,
            ...styles.shadow
        }
    };

    return (
        <BottomTab.Navigator initialRouteName="Home" tabBarOptions={options} >
            <BottomTab.Screen name="Home" component={TabHomeNavigator}
                options={{
                    tabBarIcon: ({ color, focused }) =>
                        <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
                }}
            />
            <BottomTab.Screen name="Analyze" component={TabAnalizeNavigator}
                options={({ route }) => ({
                    tabBarVisible: ((route) => {
                        return getFocusedRouteNameFromRoute(route) === 'CameraScreen' ? false : true;
                    })(route),
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "camera" : "camera-outline"} color={color} />),
                })}
            />
            <BottomTab.Screen name="Profile" component={TabProfileNavigator}
                options={{
                    tabBarIcon: ({ color, focused }) =>
                        <TabBarIcon name={focused ? "bar-chart" : "bar-chart-outline"} color={color} />
                }}|
            />
        </BottomTab.Navigator>
    );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={35} {...props} />;
}

const HomeStack = createStackNavigator<TabHomeParamList>();

function TabHomeNavigator() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }} >
            <HomeStack.Screen name="TabHomeScreen" component={HomeScreen} />
        </HomeStack.Navigator>
    );
}

const AnalizeStack = createStackNavigator<TabAnallizeNavigator>();

function TabAnalizeNavigator() {
    return (
        <AnalizeStack.Navigator initialRouteName="AnalizeScreen" screenOptions={{ headerShown: false }}>
            <AnalizeStack.Screen name="AnalizeScreen" component={AnalizeScreen} />
            <AnalizeStack.Screen name="CameraScreen" component={ShotScreen} />
        </AnalizeStack.Navigator>
    );
}

const ProfileStack = createStackNavigator<TabProfileParamList>();

function TabProfileNavigator() {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="TabProfileScreen" component={ProfileScreen} />
        </ProfileStack.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#383838',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4.5,
        elevation: 10,
    }
})