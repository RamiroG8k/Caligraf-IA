import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

const WelcomeScreen = ({ navigation }: { navigation: any }, props: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image style={styles.img}
                    source={require('../assets/images/ill.png')} />
            </View>
            <View>
                <Text style={styles.title}>Caligraf IA analysis Assessment.</Text>
                <Text style={styles.subtitle}>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} style={[styles.button, { backgroundColor: '#E6E6E6' }]} >
                        <Text style={[styles.btnText, { color: '#383838' }]}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.button, { backgroundColor: '#869EDB' }]}>
                        <Text style={[styles.btnText, { color: '#FFFFFF' }]}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: '10%', alignItems: 'center', justifyContent: 'space-between'
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
        color: '#385EBC',
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
        padding: 15,
        width: '45%',
    },
    btnText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
        color: '#383838'
    },
});

export default WelcomeScreen;
