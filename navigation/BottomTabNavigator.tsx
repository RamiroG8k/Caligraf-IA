// Common
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator initialRouteName="Home"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].primary }}>
            <BottomTab.Screen name="Home" component={TabHomeNavigator}
                options={{ tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} /> }}
            />
            <BottomTab.Screen name="Analyze" component={TabAnalizeNavigator}
                options={{ tabBarIcon: ({ color }) => <TabBarIcon name="camera-outline" color={color} /> }}
            />
            <BottomTab.Screen name="Profile" component={TabProfileNavigator}
                options={{ tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart-outline" color={color} /> }}
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
const HomeStack = createStackNavigator<TabHomeParamList>();

function TabHomeNavigator() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="TabHomeScreen"
                component={HomeScreen} options={{ headerShown: false }} />
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
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="TabProfileScreen"
                component={ProfileScreen} options={{ headerShown: false }} />
        </ProfileStack.Navigator>
    );
}

const styles = StyleSheet.create({
    icon: {
        marginBottom: -10,
    }
})