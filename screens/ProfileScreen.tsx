// Common
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Image, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiInstance } from '../services/instances';
// Components
import { Text, View } from '../components/Themed';
import StatsCard from '../components/StatsCard';
import { Modalize } from 'react-native-modalize';
// Util
import * as Util from '../utils/util-functions';
import Layout from '../constants/Layout';
import MetricDetails from '../components/shared/MetricDetails';

type User = {
    name: string;
    email: string;
};

export default function ProfileScreen({ navigation }: { navigation: any }) {
    const modalizeRef = useRef<Modalize>(null);
    const [modalContent, setModalContent] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<User>({ name: 'Unassigned', email: 'example@email.com' });
    const [metrics, setMetrics] = useState<Array<Object>>([]);

    useEffect(() => {
        AsyncStorage.getItem('info').then(
            (response: any) => {
                if (response !== null) {
                    setUserInfo(JSON.parse(response));
                    fetchMetrics(JSON.parse(response)._id);
                    return;
                }
            }
        ).catch(
            (error: any) => {
                console.warn('ERROR IN ASYNC STORAGE: ', error);
            }
        );

        setLoading(false);
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#BCDCC8"></ActivityIndicator>
            </View>
        );
    }

    async function fetchMetrics(userID: number) {
        await apiInstance.get(`/metric/user/${userID}`).then(
            (response: any) => {
                response.data ? setMetrics(response.data.content) : setMetrics([]);
            }
        ).catch((error: any) => {
            console.log('ERROR: ', error);
        });
    };

    const availableMetrics = metrics.map((item: any): any => {
        return (
            <StatsCard key={item._id} title={Util.toMinString(item.phrase.data)} icon="attach-outline"
                onPress={() => renderContent(item._id)} phrase={Util.toLocalDate(item.date)} />
        );
    });

    const nullMetrics = (): any => {
        return (
            <StatsCard key={0} title="No Data" icon="sad-outline"
                phrase="Oops, it looks like you have no metrics available" />
        );
    };

    const renderContent = (index: number) => {
        setModalContent(<MetricDetails id={index} />);
        modalizeRef.current?.open();
    };

    const Logout = () => {
        AsyncStorage.clear();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
        });
    };

    return (
        <View themed={true}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View themed={true} style={{ alignItems: 'center' }}>
                    <View style={[styles.picture, { marginTop: '10%' }]}>
                        <View style={styles.pictureBorder}>
                            <Image style={styles.picture} source={require('../assets/images/profile.jpg')} />
                        </View>
                    </View>
                    <View themed={true} style={{ alignItems: 'center', margin: '10%' }}>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 22, marginBottom: 5, color: '#707070' }}>{Util.toTitleCase(userInfo.name)}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#A9AAAA' }}>{userInfo.email}</Text>
                        <View themed={true} style={styles.buttonGroup}>
                            <TouchableHighlight underlayColor="#CCCCCC" onPress={Logout} style={styles.button}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 18 }}>Log Out</Text>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="#94C7A7" onPress={() => alert('Edit')} style={[styles.button, { backgroundColor: '#BCDCC8' }]}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 18 }}>Edit</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View themed={true}>
                    <View themed={true} style={{ marginVertical: '5%' }}>
                        <Text style={styles.title}>Stats</Text>
                        <Text style={styles.info}>Before taking a shot, you must know some tips.</Text>
                    </View>
                    {metrics.length ? availableMetrics : nullMetrics()}
                </View>
                <View themed={true} style={{ alignItems: 'center', marginTop: '15%', marginBottom: '40%' }}>
                    <Text style={{ fontSize: 18 }}>Coming Soon...</Text>
                </View>
            </ScrollView>
            <Modalize modalStyle={[styles.modal, { backgroundColor: '#F3F3F3' }]}
                modalHeight={Layout.window.height * 0.7} ref={modalizeRef}
                overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.55)' }}>
                {modalContent}
            </Modalize>
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
    modal: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
});