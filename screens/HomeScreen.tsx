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

import { DummyMetrics } from '../utils/dummy-data';

export default function HomeScreen({ navigation }: { navigation: any }, props: any) {
    const modalizeRef = useRef<Modalize>(null);
    const [modalContent, setModalContent] = useState<any | null>(null);
    const [metrics, setMetrics] = useState<Array<Object>>(DummyMetrics);

    const renderContent = (index: number) => {
        setModalContent(<MetricDetails id={index} />);
        modalizeRef.current?.open();
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

    return (
        <View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{ marginVertical: '5%' }}>
                        <Text style={styles.title}>Week Info</Text>
                        <Text style={styles.info}>General stats, Tips & Tricks</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
                <View>
                    <View style={{ marginVertical: '5%' }}>
                        <Text style={styles.subtitle}>Reminder</Text>
                        <Text style={styles.info}>General stats, Tips & Tricks</Text>
                    </View>
                    <Banner />
                </View>
                <View>
                    <View style={{ marginVertical: '5%' }}>
                        <Text style={styles.subtitle}>Last Analyses</Text>
                        <Text style={styles.info}>General stats, Tips & Tricks</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {metrics ? lastMetrics : emptyCard(0)}
                    </View>
                </View>
                <View style={{ alignItems: 'center', marginTop: '15%', marginBottom: '40%' }}>
                    <Text style={{ fontSize: 18 }}>Coming Soon...</Text>
                </View>
            </ScrollView>
            <Modalize modalStyle={[styles.modal, { backgroundColor: useThemeColor({}, 'background') }]}
                modalHeight={Layout.window.height * 0.6} ref={modalizeRef}
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
