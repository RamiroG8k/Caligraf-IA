import * as React from 'react';

import { Text, View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Dimensions, Keyboard, ActivityIndicator } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useState } from 'react';

// Instances
import { loginInstance } from '../services/instances';
import { InputField } from '../components/InputField';

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

        await loginInstance.post('/auth/login', { email, password })
            .then((response: any) => {
                // alert(`Hi ${response.data.user.name}!`)
                navigation.navigate('Root')
            }).catch((error: any) => {
                alert(error.response.data.message);
            });
        setUserFlag(false);
    };

    return (
        <TouchableWithoutFeedback style={{ padding: '10%' }} onPress={Keyboard.dismiss} accessible={false} >
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
            <View style={{ marginVertical: '15%' }}>
                <InputField change={emailHandler} label="Your Email" placeholder="email@example.com" />
                <InputField change={pwdHandler} label="Password" secureTextEntry={true} placeholder="* * * * * * * *" />
            </View>

            {userFlag ? <ActivityIndicator size="large" color="#869EDB" style={{ marginBottom: '-10%' }}></ActivityIndicator> : null}

            <View style={{ marginVertical: '30%' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.info}>Don't have an account? <Text style={[styles.label, { fontFamily: 'Montserrat-Bold' }]}> Register.</Text></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleForm} style={styles.button}>
                    <Text style={[styles.label, { textAlign: 'center', color: 'white' }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
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
    label: {
        fontSize: 16,
        color: '#383838',
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 36,
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 26,
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
