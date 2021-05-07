// Common Modules
import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// Components
import { Text, View } from '../components/Themed';
import { InputField } from '../components/InputField';
import BackButton from '../components/shared/BackButton';
// Instances
import { apiInstance } from '../services/instances';
// Hooks
import { useForm, Controller } from 'react-hook-form';
// Others
import AsyncStorage from '@react-native-async-storage/async-storage';

type FormData = {
    email: string;
    password: string;
};

const LoginScreen = ({ navigation }: { navigation: any }, props: any) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [userFlag, setUserFlag] = useState(false);

    const onSubmit = (data: any) => {
        getCredentials(data);
        return;
    };

    const getCredentials = async (form: FormData) => {
        setUserFlag(true);
        await apiInstance.post('/auth/login', form)
            .then(async (response: any) => {
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('info', JSON.stringify(response.data.user));
                navigation.navigate('Root');
            }).catch((error: any) => {
                alert(error.response.data.message);
            });
        setUserFlag(false);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={0}>
            <ScrollView style={{ flex: 1, padding: '10%' }}>
                <View transparent={true} style={{ justifyContent: 'flex-start' }}>
                    <View transparent={true} style={{ marginBottom: '10%' }}>
                        <BackButton onPress={() => navigation.goBack()}/>
                        <View transparent={true}>
                            <Text style={styles.title}>Let's sign you in</Text>
                            <Text style={styles.subtitle}>{`Welcome back,\nYou've been missed!`}</Text>
                        </View>
                    </View>

                    <View transparent={true} style={{ height: '45%' }}>
                        <View transparent={true} style={styles.inputContainer}>
                            <Controller control={control} name="email" rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                                <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Your Email" placeholder="email@example.com" />)} />
                            {errors.email && <Text style={styles.error}>Email is required.</Text>}
                        </View>
                        <View transparent={true} style={styles.inputContainer}>
                            <Controller control={control} name="password" rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                                <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Password" secureTextEntry={true} placeholder="* * * * * * * *" />)} />
                            {errors.password && <Text style={styles.error}>Password is required.</Text>}
                        </View>
                        {userFlag && <ActivityIndicator size="large" color="#869EDB" style={{ marginVertical: '15%' }}></ActivityIndicator>}
                    </View>

                    <View transparent={true} style={{ marginTop: '10%' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.info}>Don't have an account? <Text style={[styles.label, { fontFamily: 'Montserrat-Bold' }]}> Register.</Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                            <Text style={[styles.label, { textAlign: 'center', color: 'white' }]}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
    },
    error: {
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
        color: '#F97068',
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 36,
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 26,
    },
    info: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        fontSize: 16,
        width: '100%',
        flexDirection: 'row',
        textAlign: 'center',
    }
})

export default LoginScreen;
