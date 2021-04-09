import * as React from 'react';

import { Text, View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, TextInput, Dimensions, Keyboard, SafeAreaView } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function LoginScreen({ navigation }: { navigation: any }, props: any) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.icon}>
                            <AntDesign name="back" size={30} color="black" />
                        </TouchableOpacity>
                        <View style={{ backgroundColor: 'transparent' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 36, marginBottom: 15 }}>Let's sign you in.</Text>
                            <Text style={{ fontSize: 28, color: '#7A7A7A' }}>Welcome back.</Text>
                            <Text style={{ fontSize: 28, color: '#7A7A7A' }}>You've been missed!.</Text>
                        </View>

                        <View style={{ marginVertical: '20%', backgroundColor: 'transparent' }}>
                            <TextInput style={{ ...styles.input }} placeholder='Phone, email or username' />
                            <TextInput style={{ ...styles.input }} placeholder='Password' />
                        </View>

                        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'transparent' }}>
                            <Text style={{ fontSize: 16, textAlign: 'center', margin: 20, color: '#7A7A7A' }}>Don't have an account? <Text style={{ fontWeight: 'bold' }}>Register.</Text></Text>
                            <TouchableOpacity onPress={() => navigation.navigate('MainScreen')} style={[styles.button, { width: '100%', justifyContent: 'center' }]}>
                                <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: '#383838' }}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};


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
        backgroundColor: '#E6E6E6',

    }
})

// export default LoginScreen;
