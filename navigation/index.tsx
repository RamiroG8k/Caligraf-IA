// Common 
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorSchemeName } from 'react-native';
import * as React from 'react';

// Routing
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// Screens
import NotFoundScreen from '../screens/NotFoundScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Custom Theme
const MainTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    },
};

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : MainTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

const Stack = createStackNavigator<RootStackParamList>();

let user: any;

AsyncStorage.getItem('info').then((response: any) => {
    user = response;
});

function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName={user ? "Root" : "Welcome"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
}
