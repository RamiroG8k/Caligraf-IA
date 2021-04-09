import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import { AppLoading } from 'expo';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    },
};

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    }

    const MainComponent = () => {
        return (
            <SafeAreaProvider>
                <Navigation  colorScheme={colorScheme} />
                <StatusBar />
            </SafeAreaProvider>
        );
    }

    return (
        <NavigationContainer independent={true} theme={MainTheme}>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={LoginScreen} />
                <Stack.Screen name="MainScreen" component={MainComponent} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
