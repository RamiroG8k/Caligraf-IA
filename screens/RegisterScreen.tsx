import * as React from 'react';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { InputField } from '../components/InputField';
import { StyleSheet, Dimensions, Keyboard, ActivityIndicator } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { useForm, Controller } from 'react-hook-form';
import { loginInstance } from '../services/instances';

type FormData = {
    name: string;
    lastName: string;
    email: string;
    password: string;
};

const RegisterScreen = ({ navigation }: { navigation: any }, props: any) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [userFlag, setUserFlag] = useState(false);

    const onSubmit = (data: any) => {
        console.log(data);
        
        setUserFlag(!userFlag);
        setCredentials(data);
        return;
    };

    const setCredentials = async (form: FormData) => {
        await loginInstance.post('/user', form)
            .then((response: any) => {
                // TODO: manage response
                alert(`Hi ${response.data.name}!`)
            }).catch((error: any) => {
                alert(error.response.data.message);
            });
        setUserFlag(false);
    };


    return (
        <TouchableWithoutFeedback style={{ padding: '10%' }} onPress={Keyboard.dismiss} accessible={false} >
            <View transparent={true} style={{ marginBottom: '10%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                    <AntDesign name="back" size={30} color="black" />
                </TouchableOpacity>
                <View transparent={true} >
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>{`Sign up to get \nStarted`}</Text>
                </View>
            </View>
            <View transparent={true} style={{ height: '45%' }}>
                <View transparent={true} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View transparent={true} style={[styles.inputContainer, { width: '48%' }]}>
                        <Controller control={control} name="name" rules={{ required: true }} defaultValue="" render={({ field: { onChange, onBlur, value } }) => (
                            <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Name *" />)} />
                        {errors.name && <Text style={styles.error}>Required.</Text>}
                    </View>
                    <View transparent={true} style={[styles.inputContainer, { width: '48%' }]}>
                        <Controller control={control} name="lastName" rules={{ required: true }} defaultValue="" render={({ field: { onChange, onBlur, value } }) => (
                            <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Last Name *" />)} />
                        {errors.lastName && <Text style={styles.error}>Required.</Text>}
                    </View>
                </View>
                <View transparent={true} style={styles.inputContainer}>
                    <Controller control={control} name="email" rules={{ required: true }} defaultValue="" render={({ field: { onChange, onBlur, value } }) => (
                        <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Your email *" placeholder="username@example.com" />)} />
                    {errors.email && <Text style={styles.error}>Email is required.</Text>}
                </View>
                <View transparent={true} style={styles.inputContainer}>
                    <Controller control={control} name="password" rules={{ required: true }} defaultValue="" render={({ field: { onChange, onBlur, value } }) => (
                        <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Password *" secureTextEntry={true} placeholder="* * * * * * * *" />)} />
                    {errors.password && <Text style={styles.error}>Password is required.</Text>}
                </View>
                <View transparent={true}>
                    <Text style={{ fontSize: 12, textAlign: 'center', color: '#7A7A7A' }}>
                        Creating an account means you're okay with our
                    <Text style={{ fontFamily: 'Montserrat-Bold' }}> Terms of Service</Text> and our
                    <Text style={{ fontFamily: 'Montserrat-Bold' }}> Privacy Policy</Text>
                    </Text>
                </View>
            {userFlag && <ActivityIndicator size="large" color="#869EDB"></ActivityIndicator>}
            </View>
            <View transparent={true} style={{ marginTop: '10%' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.info}>
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>Already have an account? <Text style={{ fontFamily: 'Montserrat-Bold' }}> Log In.</Text></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                    <Text style={[styles.label, { textAlign: 'center', color: 'white' }]}>Sign Up</Text>
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
        fontFamily: 'Montserrat-Bold',
        color: '#383838',
    },
    error: {
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
        color: '#F97068',
    },
    inputContainer: {
        marginBottom: 15,
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
        paddingHorizontal: 40,
        paddingVertical: 20,
        fontSize: 16,
        width: '100%',
        flexDirection: 'row',
        textAlign: 'center',
        color: '#7A7A7A'
    }
})

export default RegisterScreen;
