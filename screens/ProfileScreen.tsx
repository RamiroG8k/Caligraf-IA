import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Image, ScrollView, Dimensions, TouchableHighlight, Pressable } from 'react-native';

import { Text, View } from '../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DATA = [
    {
        id: "6",
        title: "SABOR MORENO",
        image:
            "https://res.cloudinary.com/demo/image/upload/w_260,h_200,c_crop,g_north/sample.jpg"
    },
    {
        id: "7",
        title: "0 MESTRE PUB",
        image:
            "https://res.cloudinary.com/demo/image/upload/w_260,h_200,c_crop,g_north/sample.jpg"
    },
    {
        id: "8",
        title: "GRILL 54 CHEF",
        image:
            "https://res.cloudinary.com/demo/image/upload/w_260,h_200,c_crop,g_north/sample.jpg"
    }
];

const columns: number = 2;

export default function ProfileScreen() {
    const formatData = (data: Array<any>, columns: number): Array<any> => {
        while (data.length % columns) {
            data.push({ empty: true });
        }
        return data;
    }

    return (
        <View style={styles.container}>
            <View style={styles.pSection}>
                <View style={[styles.pPicture, { marginTop: '10%' }]}>
                    <View style={styles.pPictureBorder}>
                        <Image style={styles.pPicture}
                            source={require('../assets/images/profile.jpg')} />
                    </View>
                </View>
                <View style={styles.pInfo}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5, color: '#707070'}}>@Username</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#A9AAAA'}}>first.example@hotmail.com</Text>
                    <View style={styles.buttonGroup}>
                        <TouchableHighlight underlayColor="#CCCCCC" onPress={() => alert('Log out')} style={styles.button}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Log Out</Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight underlayColor="#94C7A7" onPress={() => alert('Edit')} style={[styles.button, { backgroundColor: '#BCDCC8' }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Edit</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.title}>Stats</Text>
                <TouchableOpacity onPress={() => alert('CLICK') } style={[styles.card, { flexDirection: 'row' }, { alignItems: 'center'}]}>
                    <View style={styles.icon}>
                        <Ionicons size={30} name="ios-home-outline" />
                    </View>
                    <View style={{ backgroundColor: 'transparent', padding: 10, flex: 1}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Title</Text>
                        <Text style={{ fontSize: 14 }}>Lorem ipsum dolor sit a asddam msdsmka asomsd km asoas as</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 0,
    },
    pSection: {
        alignItems: 'center',
    },
    pPicture: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        backgroundColor: '#E6E6E6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pPictureBorder: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.55,
        height: Dimensions.get('window').width * 0.55,
        backgroundColor: '#E6E6E6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pInfo: {
        alignItems: 'center',
        paddingTop: '5%',
        margin: '10%',
        width: '80%',
    },
    title: {
        fontSize: 30,
        marginLeft: 10,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#6CB286',
    },
    stats: {

    },
    card: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
    },
    buttonGroup: {
        marginTop: 20,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '90%'
    },
    button: {
        backgroundColor: '#E6E6E6',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: '45%',
    },
    icon: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').width * 0.15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
