import * as React from 'react';

import { Text, View } from '../components/Themed';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, TextInput, Dimensions, Keyboard, SafeAreaView } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const RegisterScreen = ({ navigation }: { navigation: any }, props: any) => {
    return (
        <SafeAreaProvider style={{ flex: 1, margin: '10%', alignItems: 'center' }}>
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.icon}>
                            <AntDesign name="back" size={30} color="black" />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.title}>Create Account.</Text>
                            <Text style={styles.subtitle}>Sign up to get Started.</Text>
                        </View>
                    </View>

                    <View style={styles.form}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={[styles.formGroup, { width: '48%' }]}>
                                <Text style={[styles.label, { marginLeft: 5 }]}>Name</Text>
                                <TextInput style={styles.input}/>
                            </View>
                            <View style={[styles.formGroup, { width: '48%' }]}>
                                <Text style={[styles.label, { marginLeft: 5 }]}>Last Name</Text>
                                <TextInput style={styles.input}/>
                            </View>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={[styles.label, { marginLeft: 5 }]}>Your Email</Text>
                            <TextInput style={styles.input} placeholder='username@example.com' />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={[styles.label, { marginLeft: 5 }]}>Password</Text>
                            <TextInput style={styles.input} secureTextEntry={true} placeholder='* * * * * * * *' />
                        </View>
                    </View>
                    <View>
                        <Text style={{fontSize: 16, textAlign: 'center', color: '#7A7A7A', lineHeight: 25}}>
                            Creating an account means you're okay with our
                            <Text style={styles.label}> Terms of Service</Text> and our
                            <Text style={styles.label}> Privacy Policy</Text>
                        </Text>
                    </View>
                    <View style={{ padding: 10, marginTop: 20 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.info}>Already have an account? <Text style={styles.label}> Log In.</Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('MainScreen')} style={styles.button}>
                            <Text style={[styles.label, { textAlign: 'center', color: 'white' }]}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};


const styles = StyleSheet.create({
    form: {
        marginTop: 30, 
        marginBottom: 10
    },
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

export default RegisterScreen;
