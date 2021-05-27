// Common
import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// Components
import { Text, View, Button } from '../components/shared/Themed';
import { InputField } from '../components/shared/InputField';
import BackButton from '../components/shared/BackButton';
// Others
import { useForm, Controller } from 'react-hook-form';
import { apiInstance } from '../services/instances';
import { FormData } from '../types';

const RegisterScreen: React.FunctionComponent = (props: any) => {
    const { navigation } = props;
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
                navigation.navigate('Login');
                alert(`Account created ${response.data.name}!\n Now log in using your new Credentials`)
            }).catch((error: any) => {
                alert(error.response.data.message);
            });
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined } keyboardVerticalOffset={0}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: '10%' }}>
                {/* Title Section */}
                <View style={{ justifyContent: 'flex-end' }}>
                    <View style={{ marginBottom: 20 }}>
                        <BackButton onPress={() => navigation.goBack()} />
                        <View >
                            <Text secondary bold style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>{`Sign up to get \nStarted`}</Text>
                        </View>
                    </View>
                    {/* END: Title Section */}

                    {/* Form Section */}
                    <View style={{ height: '45%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ marginBottom: 15, width: '48%' }}>
                                <Controller control={control} name="name" rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                                    <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Name *" />)} />
                                {errors.name && <Text style={styles.error}>Required.</Text>}
                            </View>
                            <View style={{ marginBottom: 15, width: '48%' }}>
                                <Controller control={control} name="lastName" rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                                    <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Last Name *" />)} />
                                {errors.lastName && <Text style={styles.error}>Required.</Text>}
                            </View>
                        </View>
                        <View style={{ marginBottom: 15 }}>
                            <Controller control={control} name="email" rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                                <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Your email *" placeholder="username@example.com" />)} />
                            {errors.email && <Text style={styles.error}>Email is required.</Text>}
                        </View>
                        <View style={{ marginBottom: 15 }}>
                            <Controller control={control} name="password" rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                                <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Password *" secureTextEntry={true} placeholder="* * * * * * * *" />)} />
                            {errors.password && <Text style={styles.error}>Password is required.</Text>}
                        </View>
                        <View>
                            <Text style={{ fontSize: 12, textAlign: 'center' }}>
                                Creating an account means you're okay with our
                                <Text secondary bold> Terms of Service</Text> and our
                                <Text secondary bold> Privacy Policy</Text>
                            </Text>
                        </View>
                        {loading && <ActivityIndicator size="large" color="#FFAA49"></ActivityIndicator>}
                    </View>
                    {/* END: Form Section */}

                    {/* Footer */}
                    <View style={{ marginTop: '10%' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.info}>
                            <Text style={{ fontSize: 16, textAlign: 'center' }}>Already have an account?<Text secondary bold> Log In.</Text></Text>
                        </TouchableOpacity>
                        <Button secondary onPress={handleSubmit(onSubmit)} text="Sign Up"/>
                    </View>
                </View>
                {/* END: Footer */}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    error: {
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
        color: '#F97068',
    },
    title: {
        fontSize: 36,
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 26,
    },
    info: {
        paddingHorizontal: 40,
        paddingVertical: 20,
    }
})

export default RegisterScreen;
