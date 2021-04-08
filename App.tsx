import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Text, View } from './components/Themed';
import { Image, TouchableHighlight, StyleSheet, Dimensions, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const Welcome = () => {
        return (
            <SafeAreaProvider style={{ flex: 1, paddingHorizontal: '10%', paddingVertical: '15%', alignItems: 'center', justifyContent: 'flex-end' }}>
                <View style={{ backgroundColor: 'transparent' }}>
                    <View style={{ marginVertical: '20%', aspectRatio: 1, borderRadius: 25, width: '100%', backgroundColor: 'transparent' }}>
                        <Image style={{ flex: 1, width: '100%', borderRadius: 25 }}
                            source={require('./assets/images/ill.png')} />
                    </View>
                    <View style={{backgroundColor: 'transparent'}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 32, textAlign: 'center', marginBottom: 15 }}>Caligraf IA analysis Assessment.</Text>
                        <Text style={{ fontSize: 18, textAlign: 'center', lineHeight: 25, color: '#7A7A7A' }}>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '30%', backgroundColor: 'transparent' }}>
                        <TouchableHighlight underlayColor="#CCCCCC" onPress={() => alert('REGISTER')} style={styles.button}>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: '#383838' }}>Register</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => alert('Sign In')} style={[styles.button, { backgroundColor: '#383838' }]}>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Sign In</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </SafeAreaProvider>
        );
    };

    const LogIn = () => {
        return (
            <SafeAreaProvider style={{ flex: 1, padding: 35, alignItems: 'center' }}>
                <View style={{ flex: 1, width: '100%', backgroundColor: 'transparent' }}>
                    <TouchableHighlight underlayColor="#CCCCCC" onPress={() => alert('BACK')} style={styles.icon}>
                        <AntDesign name="back" size={30} color="black" />
                    </TouchableHighlight>
                    <View style={{ backgroundColor: 'transparent' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 36, marginBottom: 15 }}>Let's sign you in.</Text>
                        <Text style={{ fontSize: 28, color: '#7A7A7A' }}>Welcome back.</Text>
                        <Text style={{ fontSize: 28, color: '#7A7A7A' }}>You've been missed!.</Text>
                    </View>

                    <View style={{ marginVertical: '20%', backgroundColor: 'transparent' }}>
                        <TextInput style={{...styles.input}} placeholder='Phone, email or username'/>
                        <TextInput style={{...styles.input}} placeholder='Password'/>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'transparent' }}>
                        <Text style={{ fontSize: 16, textAlign: 'center', margin: 20, color: '#7A7A7A' }}>Don't have an account? <Text style={{ fontWeight: 'bold' }}>Register.</Text></Text>
                        <TouchableHighlight underlayColor="#CCCCCC" onPress={() => alert('REGISTER')} style={[styles.button, { width: '100%', justifyContent: 'center' }]}>
                            <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: '#383838' }}>Sign In</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </SafeAreaProvider>
        );
    };

    if (!isLoadingComplete) {
        return null;
    } else {
        return (LogIn());
        return (Welcome());
        return (
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 15,
        width: '45%',
        backgroundColor: '#E6E6E6',
        borderRadius: 15
    },
    icon: {
        borderRadius: 15,
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').width * 0.15,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    input: {
        height: 55,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginBottom: 15,
        borderColor: '#ACACAC',
        borderWidth: 1,
        backgroundColor: '#E6E6E6'
    }
})