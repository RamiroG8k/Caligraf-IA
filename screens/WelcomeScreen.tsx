import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

const WelcomeScreen = ({ navigation }: { navigation: any }, props: any) => {
    const colorScheme = useColorScheme();

    return (
        <View transparent={true} style={styles.container}>
            <View transparent={true} style={styles.imgContainer}>
                <Image style={styles.img}
                    source={require('../assets/images/ill.png')} />
            </View>
            <View transparent={true}>
                <Text style={[styles.title, { color: Colors[colorScheme].secondary }]}>Caligraf IA analysis Assessment.</Text>
                <Text style={styles.subtitle}>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            </View>
            <View transparent={true} style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View transparent={true} style={styles.buttonGroup}>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{padding: 15}}>
                            <Text style={styles.btnText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ backgroundColor: Colors[colorScheme].tint, padding: 15 }}>
                            <Text style={styles.btnText}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '10%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imgContainer: {
        width: '100%',
        aspectRatio: 1,
        marginVertical: '20%',
    },
    img: {
        flex: 1,
        width: '100%',
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 30,
    },
    subtitle: {
        fontFamily: 'Montserrat',
        textAlign: 'center',
        color: '#7A7A7A',
        lineHeight: 25,
        fontSize: 16,
    },
    buttonGroup: {
        justifyContent: 'space-around',
        marginVertical: '5%',
        flexDirection: 'row',
    },
    button: {
        borderRadius: 15,
        overflow: 'hidden',
        width: '45%',
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
});

export default WelcomeScreen;
