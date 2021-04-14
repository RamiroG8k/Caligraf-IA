import * as React from 'react';

import { Text, View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, TextInput, Dimensions, Keyboard, SafeAreaView, ActivityIndicator } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useState } from 'react';

// Instances
import { loginInstance } from '../services/instances';

const LoginScreen = ({ navigation }: { navigation: any }, props: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [userFlag, setUserFlag] = useState(false);

    const emailHandler = (text: string) => {
        setEmail(text);
    };

    const pwdHandler = (text: string) => {
        setPassword(text);
    };

    const handleForm = () => {
        if (email && password) {
            getCredentials();
            return;
        }
        alert('Please Verify your info');
    };

    const getCredentials = async () => {
        setUserFlag(true);
        await loginInstance.post('/auth/login', {email, password})
            .then((response: any) => {
                alert(`Hi ${response.data.user.name}!`)
                // console.log(response.data);
            }).catch((error: any) => {
                alert(error.message);
            });
            setUserFlag(false);
    };

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
                            <TextInput onChangeText={emailHandler} style={styles.input} placeholder='Phone, email or username' />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={[styles.label, { marginLeft: 5 }]}>Password</Text>
                            <TextInput onChangeText={pwdHandler} style={styles.input} secureTextEntry={true} placeholder='* * * * * * * *' />
                        </View>
                    </View>

                    { userFlag ? <ActivityIndicator size="large" color="tomato" style={{ marginBottom: '-10%' }}></ActivityIndicator> : null }

                    <View style={{ padding: 10, marginTop: '25%' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.info}>Don't have an account? <Text style={styles.label}> Register.</Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleForm} style={styles.button}>
                            <Text style={[styles.label, { textAlign: 'center', color: 'white' }]}>Sign In</Text>
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
        backgroundColor: '#869EDB',
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
