// Common
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, FlatList, Image, TouchableHighlight, StatusBar } from 'react-native';
// Components
import { Text, useThemeColor, View } from '../components/Themed';
import Card from '../components/Card';
import Banner from '../components/Banner';
// Others
import Colors from '../constants/Colors';
import { Modalize } from 'react-native-modalize';
import Layout from '../constants/Layout';
import MetricDetails from '../components/shared/MetricDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [
    {
        id: "6",
        title: "SABOR MORENO",
        time: 5,
        image: "https://images.pexels.com/photos/7260632/pexels-photo-7260632.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
        id: "7",
        title: "0 MESTRE PUB",
        time: 6,
        image:
            "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
        id: "8",
        title: "GRILL 54 CHEF",
        time: 10,
        image:
            "https://images.pexels.com/photos/760709/pexels-photo-760709.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    }
];

const columns: number = 2;

export default function HomeScreen({ navigation }: { navigation: any }, props: any) {
    const modalizeRef = useRef<Modalize>(null);
    const [modalContent, setModalContent] = useState<any | null>(null);

    const renderContent = (index: number) => {
        setModalContent(<MetricDetails id={index} />);
        modalizeRef.current?.open();
    };

    const formatData = (data: Array<any>, columns: number): Array<any> => {
        while (data.length % columns) {
            data.push({ empty: true });
        }
        return data;
    };

    const emptyCard = (): any => {
        return (
            <TouchableHighlight underlayColor="#CCCCCC" onPress={() => navigation.navigate('Analyze')} style={styles.emptyCard}>
                <Image style={{ flex: 1, width: '100%', borderRadius: 25, opacity: 0.5 }}
                    source={require('../assets/images/Plus2.jpg')} />
            </TouchableHighlight>
        );
    };

    const renderCard = (item: any) => {
        return item.empty ? emptyCard() : <Card onPress={() => renderContent(item.id)} {...item} />
    };

    // useEffect(() => {
    //     try {
    //         AsyncStorage.getAllKeys((err, keys: any) => {
    //             AsyncStorage.multiGet(keys, (err, stores: any) => {
    //                 stores.map((result: any, i: number, store: any) => {
    //                     console.log(`KEY: ${store[i][0]}, VAL: ${store[i][1]}`);
    //                 });
    //             });
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, [])

    return (
        <View transparent={true}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View transparent={true}>
                    <View transparent={true} style={{ marginVertical: '5%' }}>
                        <Text style={styles.title}>Week Info</Text>
                        <Text style={styles.info}>General stats, Tips & Tricks</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
                <View transparent={true}>
                    <View transparent={true} style={{ marginVertical: '5%' }}>
                        <Text style={styles.subtitle}>Reminder</Text>
                        <Text style={styles.info}>General stats, Tips & Tricks</Text>
                    </View>
                    <Banner />
                </View>
                <View transparent={true}>
                    <View transparent={true} style={{ marginVertical: '5%' }}>
                        <Text style={styles.subtitle}>Last Analyses</Text>
                        <Text style={styles.info}>General stats, Tips & Tricks</Text>
                    </View>
                    <FlatList scrollEnabled={false} data={formatData(DATA, columns)}
                        keyExtractor={item => item.id} numColumns={columns}
                        style={{ margin: -10 }} renderItem={({ item }) => renderCard(item)} />
                </View>
                <View transparent={true} style={{ alignItems: 'center', marginTop: '15%', marginBottom: '40%' }}>
                    <Text style={{ fontSize: 18 }}>Coming Soon...</Text>
                </View>
            </ScrollView>
            <Modalize modalStyle={[styles.modal, { backgroundColor: useThemeColor({}, 'background') }]}
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
    title: {
        fontSize: 32,
        marginLeft: 10,
        marginBottom: 12,
        fontFamily: 'Montserrat-Bold',
        color: Colors.light.primary,
    },
    subtitle: {
        fontSize: 26,
        marginLeft: 10,
        marginBottom: 12,
        fontFamily: 'Montserrat-Bold',
        color: Colors.light.secondary,
    },
    info: {
        fontSize: 14,
        marginLeft: 10,
    },
    separator: {
        marginLeft: 10,
        width: '80%',
        height: 2,
    },
    modal: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    emptyCard: {
        flex: 1,
        margin: 10,
        aspectRatio: 1,
        borderRadius: 25
    }
});
