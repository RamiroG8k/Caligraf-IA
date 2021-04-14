import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

const WelcomeScreen = ({ navigation }: { navigation: any }, props: any) => {
    return (
        <SafeAreaProvider style={{ flex: 1, padding: '10%', alignItems: 'center' }}>
            <SafeAreaView>
                <View style={styles.imgContainer}>
                    <Image style={styles.img}
                        source={require('../assets/images/ill.png')} />
                </View>
                <View>
                    <Text style={styles.title}>Caligraf IA analysis Assessment.</Text>
                    <Text style={styles.subtitle}>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: '30%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} style={[styles.button, { backgroundColor: '#E6E6E6' }]} >
                        <Text style={[styles.btnText, { color: '#383838' }]}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.button, { backgroundColor: '#869EDB' }]}>
                        <Text style={[styles.btnText, { color: '#FFFFFF' }]}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    imgContainer: {
        marginVertical: '20%',
        aspectRatio: 1,
        borderRadius: 25,
        width: '100%',
    },
    img: {
        flex: 1,
        width: '100%',
    },
    title: {
        color: '#385EBC',
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 25,
        color: '#7A7A7A',
    },
    button: {
        padding: 15,
        width: '45%',
        borderRadius: 15,
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#383838'
    },
});

export default WelcomeScreen;
