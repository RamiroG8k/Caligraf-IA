// Common
import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, ActivityIndicator, TouchableWithoutFeedback, SafeAreaView, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// Components
import { Text, View, Button } from '../components/shared/Themed';
import { InputField } from '../components/shared/InputField';
import BackButton from '../components/shared/BackButton';
// Others
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { apiInstance } from '../services/instances';
import { LoginFormData } from '../types';
import { Platform } from 'react-native';

const LoginScreen: React.FunctionComponent = (props: any) => {
    const { navigation: go } = props;
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const [userFlag, setUserFlag] = useState(false);

    const onSubmit = (data: any) => {
        getCredentials(data);
        return;
    };

    const getCredentials = async (form: LoginFormData) => {
        setUserFlag(true);
        await apiInstance.post('/auth/login', form)
            .then(async (response: any) => {
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('info', JSON.stringify(response.data.user));
                go.navigate('Root');
            }).catch((error: any) => {
                alert(error.response.data.message);
            });
        setUserFlag(false);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} {...(Platform.OS === 'ios' && { behavior: 'padding' })}>
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, padding: '10%' }}>
                        {/* Title Section */}
                        <View style={{ marginBottom: 20 }}>
                            <BackButton onPress={() => go.goBack()} />
                            <View>
                                <Text primary bold style={styles.title}>Let's sign you in</Text>
                                <Text style={styles.subtitle}>{`Welcome back,\nYou've been missed!`}</Text>
                            </View>
                        </View>
                        {/* END: Title Section */}

                        {/* Form Section */}
                        <View style={{ height: '40%' }}>
                            <View style={{ marginBottom: 15 }}>
                                <Controller control={control} name="email" rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                                    <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Your Email" placeholder="email@example.com" />)} />
                                {errors.email && <Text style={styles.error}>Email is required.</Text>}
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Controller control={control} name="password" rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                                    <InputField change={(value: string) => onChange(value)} value={value} onBlur={onBlur} label="Password" secureTextEntry={true} placeholder="* * * * * * * *" />)} />
                                {errors.password && <Text style={styles.error}>Password is required.</Text>}
                            </View>
                            {userFlag && <ActivityIndicator size="large" color="#FFAA49" style={{ marginVertical: '15%' }}></ActivityIndicator>}
                        </View>
                        {/* END: Form Section */}

                        {/* Footer */}
                        <View style={{ marginTop: '10%' }}>
                            <TouchableOpacity onPress={() => go.navigate('Register')}>
                                <Text style={styles.info}>¿Don't have an account?<Text primary bold> Register.</Text></Text>
                            </TouchableOpacity>
                            <Button primary onPress={handleSubmit(onSubmit)} text="Log In" />
                        </View>
                        {/* END: Footer */}
                    </View  >
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView >
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
        fontSize: 16,
        textAlign: 'center',
    }
})

export default LoginScreen;
