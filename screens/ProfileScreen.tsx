import * as React from 'react';
import { StyleSheet, Image, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';

import { Text, View } from '../components/Themed';
import StatsCard from '../components/StatsCard';
import Layout from '../constants/Layout';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginInstance } from '../services/instances';

import * as Util from '../utils/util-functions';

const DATA = [
    {
        id: 1,
        title: "Meta data 0",
        icon: "information-circle-outline",
        text: "Lorem ipsum dolor sit amet, consectetur adip sample"
    },
    {
        id: 2,
        title: "Meta data 1",
        icon: "scan-outline",
        text: "Lorem ipsum dolor sit amet, consectetur adip sample"
    },
    {
        id: 3,
        title: "Meta data 2",
        icon: "camera-reverse-outline",
        text: "Lorem ipsum dolor sit amet, consectetur adip sample"
    },
];

export default function ProfileScreen({ navigation }: { navigation: any }) {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<Object | null | any>({ name: 'Undefined', email: 'No logged in' });
    const [metrics, setMetrics] = useState<Array<object> | null | any>([]);

    useEffect(() => {
        // Get user Info
        AsyncStorage.getItem('info').then((response: any) => {
            if (response !== null) {
                setUserInfo(JSON.parse(response));
                fetchMetrics(JSON.parse(response)._id);
                setLoading(false);
                return;
            }
        }).catch((error: any) => {
            console.log('ERROR ASYNC: ', error);
        });
    }, []);

    const fetchMetrics: any = async (userID: number) => {
        await loginInstance.get(`/metric/user/${userID}`).then(
            (response: any) => {
                setMetrics(response.data.content);
            }
        ).catch((error: any) => {
            console.log('ERROR: ', error);
        });
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#BCDCC8" style={{ marginVertical: '15%' }}></ActivityIndicator>
            </View>
        );
    }

    const availableMetrics: any = metrics.map((item: any) => {
        return (
            <StatsCard key={item._id} title={Util.toMinString(item.phrase.data)}
                icon="attach-outline" phrase={Util.toLocalDate(item.date)} />
        );
    });

    const Logout = () => {
        AsyncStorage.clear();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
        });
    };

    return (
        <View transparent={true}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View transparent={true} style={{ alignItems: 'center' }}>
                    <View style={[styles.picture, { marginTop: '10%' }]}>
                        <View style={styles.pictureBorder}>
                            <Image style={styles.picture} source={require('../assets/images/profile.jpg')} />
                        </View>
                    </View>
                    <View transparent={true} style={{ alignItems: 'center', margin: '10%' }}>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 22, marginBottom: 5, color: '#707070' }}>{Util.toTitleCase(userInfo.name)}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#A9AAAA' }}>{userInfo.email}</Text>
                        <View transparent={true} style={styles.buttonGroup}>
                            <TouchableHighlight underlayColor="#CCCCCC" onPress={Logout} style={styles.button}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 18 }}>Log Out</Text>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="#94C7A7" onPress={() => alert('Edit')} style={[styles.button, { backgroundColor: '#BCDCC8' }]}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 18 }}>Edit</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View transparent={true}>
                    <View transparent={true} style={{ marginVertical: '5%' }}>
                        <Text style={styles.title}>Stats</Text>
                        <Text style={styles.info}>Before taking a shot, you must know some tips.</Text>
                    </View>
                    {availableMetrics}
                </View>
                <View transparent={true} style={{ alignItems: 'center', marginTop: 10, marginBottom: '30%' }}>
                    <Text>Coming Soon...</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        paddingTop: '20%',
        paddingBottom: 0,
    },
    picture: {
        borderRadius: Math.round(Layout.window.width + Layout.window.height) / 2,
        width: Layout.window.width * 0.5,
        height: Layout.window.width * 0.5,
        backgroundColor: '#E6E6E6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pictureBorder: {
        borderRadius: Math.round(Layout.window.width + Layout.window.height) / 2,
        width: Layout.window.width * 0.55,
        height: Layout.window.width * 0.55,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        marginLeft: 10,
        marginBottom: 12,
        fontFamily: 'Montserrat-Bold',
        color: '#6CB286',
    },
    info: {
        fontSize: 14,
        marginLeft: 10,
    },
    buttonGroup: {
        marginTop: 20,
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '90%'
    },
    button: {
        backgroundColor: '#E6E6E6',
        alignItems: 'center',
        borderRadius: 15,
        padding: 12,
        margin: 10,
        width: '45%',
    },
});
