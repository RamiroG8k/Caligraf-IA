// Common
import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// Components
import { Text, View } from '../components/Themed';
import { InputField } from '../components/InputField';
import BackButton from '../components/shared/BackButton';
// Others
import { useForm, Controller } from 'react-hook-form';
import { apiInstance } from '../services/instances';

type FormData = {
    name: string;
    lastName: string;
    email: string;
    password: string;
};

const RegisterScreen = ({ navigation }: { navigation: any }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState(false);

    const onSubmit = (data: any) => {
        setLoading(!loading);
        setCredentials(data);
        return;
    };

    const setCredentials = async (form: FormData) => {
        await apiInstance.post('/user', form)
            .then((response: any) => {
                navigation.navigate('/Login');
                alert(`Account created ${response.data.name}!\n Now log using your new Credentials`)
            }).catch((error: any) => {
                alert(error.response.data.message);
            });
        setLoading(false);
    };


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={0}>
            <ScrollView style={{ flex: 1, padding: '10%' }}>
                {/* Title Section */}
                <View transparent={true} style={{ justifyContent: 'flex-end' }}>
                    <View transparent={true} style={{ marginBottom: '10%' }}>
                        <BackButton onPress={() => navigation.goBack()} />
                        <View transparent={true} >
                            <Text style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>{`Sign up to get \nStarted`}</Text>
                        </View>
                    </View>
                    {/* END: Title Section */}

                    {/* Form Section */}
                    <View transparent={true} style={{ height: '45%' }}>
                        <View transparent={true} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View transparent={true} style={[styles.inputContainer, { width: '48%' }]}>
                                <Controller control={control} name="name" rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                                    <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Name *" />)} />
                                {errors.name && <Text style={styles.error}>Required.</Text>}
                            </View>
                            <View transparent={true} style={[styles.inputContainer, { width: '48%' }]}>
                                <Controller control={control} name="lastName" rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                                    <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Last Name *" />)} />
                                {errors.lastName && <Text style={styles.error}>Required.</Text>}
                            </View>
                        </View>
                        <View transparent={true} style={styles.inputContainer}>
                            <Controller control={control} name="email" rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                                <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Your email *" placeholder="username@example.com" />)} />
                            {errors.email && <Text style={styles.error}>Email is required.</Text>}
                        </View>
                        <View transparent={true} style={styles.inputContainer}>
                            <Controller control={control} name="password" rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                                <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Password *" secureTextEntry={true} placeholder="* * * * * * * *" />)} />
                            {errors.password && <Text style={styles.error}>Password is required.</Text>}
                        </View>
                        <View transparent={true}>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>
                                Creating an account means you're okay with our
                                <Text style={{ fontFamily: 'Montserrat-Bold' }}> Terms of Service</Text> and our
                                <Text style={{ fontFamily: 'Montserrat-Bold' }}> Privacy Policy</Text>
                            </Text>
                        </View>
                        {loading && <ActivityIndicator size="large" color="#869EDB"></ActivityIndicator>}
                    </View>
                    {/* END: Form Section */}

                    {/* Footer */}
                    <View transparent={true} style={{ marginTop: '10%' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.info}>
                            <Text style={{ fontSize: 16, textAlign: 'center' }}>Already have an account? <Text style={{ fontFamily: 'Montserrat-Bold' }}> Log In.</Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                            <Text style={[styles.label, { textAlign: 'center', color: 'white' }]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* END: Footer */}
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
    input: {
        height: 55,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 1,
        marginTop: 5,
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
    },
    info: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        fontSize: 16,
        width: '100%',
        flexDirection: 'row',
        textAlign: 'center',
    }
})

export default RegisterScreen;
