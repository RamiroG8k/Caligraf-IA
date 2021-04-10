import * as React from 'react';

import { Text, View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, TextInput, Dimensions, Keyboard, SafeAreaView } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const LoginScreen = ({ navigation }: { navigation: any }, props: any) => {
    return (
        <SafeAreaProvider style={{ flex: 1, margin: '10%', alignItems: 'center' }}>
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.icon}>
                        <AntDesign name="back" size={30} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.title}>Let's sign you in.</Text>
                        <Text style={styles.subtitle}>Welcome back.</Text>
                        <Text style={styles.subtitle}>You've been missed!.</Text>
                    </View>
                </View>

                <View style={{ marginVertical: 50 }}>
                    <View style={styles.formGroup}>
                        <Text style={[styles.label, { marginLeft: 5 }]}>Your Email</Text>
                        <TextInput style={styles.input} placeholder='Phone, email or username' />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={[styles.label, { marginLeft: 5 }]}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry={true} placeholder='* * * * * * * *' />
                    </View>
                </View>
                <View style={{ padding: 10, marginTop: '25%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.info}>Don't have an account? <Text style={styles.label}> Register.</Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MainScreen')} style={styles.button}>
                        <Text style={[styles.label, { textAlign: 'center' }]}>Sign In</Text>
                    </TouchableOpacity>
                </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};


const styles = StyleSheet.create({
    button: {
        padding: 15,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#E6E6E6',
        borderRadius: 15,
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
        borderColor: '#E6E6E6',
        borderWidth: 1,
        backgroundColor: '#F5F5F5',
        marginTop: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#383838',
    },
    formGroup: {
        marginBottom: 10,
    },
    title: {
        color: '#383838',
        fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 28,
        color: '#7A7A7A',
    },
    info: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        fontSize: 16,
        width: '100%',
        flexDirection: 'row',
        textAlign: 'center',
        color: '#7A7A7A'
    }
})

export default LoginScreen;
