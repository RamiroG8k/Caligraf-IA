// Common
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
// Components
import { Text, useThemeColor, View } from '../components/shared/Themed';
import Card from '../components/Card';
import Banner from '../components/Banner';
// Others
import Colors from '../constants/Colors';
import { Modalize } from 'react-native-modalize';
import Layout from '../constants/Layout';
import MetricDetails from '../components/shared/MetricDetails';
// Utils
import { DummyMetrics } from '../util/dummy-data';
import { actualWeek } from '../util';

export default function HomeScreen({ navigation }: { navigation: any }, props: any) {
    const [modalContent, setModalContent] = useState<any | null>(null);
    const [metrics, setMetrics] = useState<Array<Object>>(DummyMetrics);

    const renderContent = (index: number) => {
        setModalContent(<MetricDetails id={index} />);
    };

    const emptyCard = (key: number): any => {
        return (
            <View key={key} style={{ width: '48%', marginVertical: 7 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Analyze')} style={{ aspectRatio: 1 }}>
                    <Image style={{ flex: 1, width: '100%', borderRadius: 25, opacity: 0.5 }}
                        source={require('../assets/images/Plus2.jpg')} />
                </TouchableOpacity>
            </View>
        );
    };

    useEffect(() => {
        setMetrics([...metrics, { empty: true }]);
    }, []);

    const lastMetrics = metrics.map((item: any, index: number, { length }) => {
        if (index === length - 1) {
            return emptyCard(0);
        } else {
            return (
                <View key={item.id} style={{ width: '48%', marginVertical: 7 }}>
                    <Card onPress={() => renderContent(item.id)} {...item} />
                </View>
            );
        }
    });

    const week = actualWeek().map((item: any, index: number) => {
        const bgColor = new Date(item).getDate() === new Date().getDate() ? true : false;

        return (
            <View key={index} themed primary={bgColor} style={{ width: '12%', height: 75, borderRadius: 15 }}>
                <Text style={{ textAlign: 'center', marginTop: 6, fontSize: 12 }}>{new Date(item).toLocaleString('en-us', { weekday: 'short' }).substring(0, 2)}</Text>
                <View style={{ flex: 1, alignItems: 'center', marginTop: '30%' }}>
                    <Text bold style={{ fontSize: 18 }}>{new Date(item).getDate()}</Text>
                </View>
            </View>
        );
    });

    return (
        <View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{ marginVertical: '5%' }}>
                        <Text primary bold style={styles.title}>Week Info</Text>
                        <Text style={styles.info}>General stats, Tips & Tricks</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
                <View>
                    <View style={{ marginVertical: '5%' }}>
                        <Text secondary bold style={styles.subtitle}>Reminder</Text>
                        <Text style={styles.info}>General stats, Tips & Tricks</Text>
                    </View>
                    <Banner />
                </View>

                <View>
                    <View style={{ marginVertical: '5%' }}>
                        <Text secondary bold style={styles.subtitle}>Last Analyses</Text>
                        <Text style={styles.info}>General stats, Tips & Tricks</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
                            {week}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {metrics ? lastMetrics : emptyCard(0)}
                    </View>
                </View>
                <View style={{ alignItems: 'center', marginTop: '15%', marginBottom: '40%' }}>
                    <Text style={{ fontSize: 18 }}>Coming Soon...</Text>
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
    title: {
        fontSize: 32,
        marginLeft: 10,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 26,
        marginLeft: 10,
        marginBottom: 12,
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
    emptyCard: {
        flex: 1,
        margin: 10,
        aspectRatio: 1,
        borderRadius: 25
    }
});
