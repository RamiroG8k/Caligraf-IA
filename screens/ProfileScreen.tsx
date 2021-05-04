import * as React from 'react';
import { StyleSheet, Image, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';
// Common
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiInstance } from '../services/instances';
import { useEffect, useState } from 'react';
// Components
import { Text, View } from '../components/Themed';
import StatsCard from '../components/StatsCard';
// Util
import * as Util from '../utils/util-functions';
import Layout from '../constants/Layout';

export default function ProfileScreen({ navigation }: { navigation: any }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<Object | null | any>(null);
    const [metrics, setMetrics] = useState<Array<object> | null | any>([]);

    useEffect(() => {
        AsyncStorage.getItem('info').then((response: any) => {
            if (response !== null) {
                fetchMetrics(JSON.parse(response)._id);
                setUserInfo(JSON.parse(response));
                setLoading(false);
                return;
            }
        }).catch((error: any) => {
            console.log('ERROR IN ASYNC STORAGE: ', error);
        });
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#BCDCC8"></ActivityIndicator>
            </View>
        );
    }

    const fetchMetrics: any = async (userID: number) => {
        await apiInstance.get(`/metric/user/${userID}`).then(
            (response: any) => {
                setMetrics(response.data.content);
            }
        ).catch((error: any) => {
            console.log('ERROR: ', error);
        });
    };

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
