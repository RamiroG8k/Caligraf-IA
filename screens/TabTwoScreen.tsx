import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import InfoCard from '../components/InfoCard';
import Layout from '../constants/Layout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const DATA = [
    {
        id: 1,
        icon: "information-circle-outline",
        text: "Lorem ipsum dolor sit amet, consectetur adip sample"
    },
    {
        id: 2,
        icon: "scan-outline",
        text: "Lorem ipsum dolor sit amet, consectetur adip sample"
    },
    {
        id: 3,
        icon: "camera-reverse-outline",
        text: "Lorem ipsum dolor sit amet, consectetur adip sample"
    },
];

export default function TabTwoScreen() {

    const tipsToShot: any = DATA.map((item: any) => {
        return (
            <InfoCard key={item.id} icon={item.icon} phrase={item.text} />
        );
    });

    return (
        <View transparent={true} style={styles.container}>
            <View transparent={true} style={{ marginVertical: '5%' }}>
                <Text style={[styles.strongText, styles.title]}>Getting Started</Text>
                <Text style={styles.info}>Before taking a shot, you must know some tips.</Text>
            </View>
            <View transparent={true} style={styles.tipsContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {tipsToShot}
                </ScrollView>
            </View>
            <View transparent={true} style={{ marginVertical: '5%' }}>
                <Text style={[styles.strongText, styles.subtitle]}>Let's get into it!</Text>
                <Text style={styles.info}>Now that you're ready, let's Begin Analyzing.</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Ionicons size={150} name="camera-outline" color="#CFA9DB" />
                <Text style={[styles.strongText, styles.subtitle]}>¡Tap Here!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        paddingTop: '20%',
        paddingBottom: 0,
    },
    tipsContainer: {
        marginHorizontal: '-7%',
        height: '20%',
    },
    strongText: {
        marginLeft: 10,
        marginBottom: 12,
        fontFamily: 'Montserrat-Bold',
    },
    title: {
        fontSize: 32,
        color: '#B981CC',
    },
    subtitle: {
        fontSize: 28,
        color: '#CFA9DB',
    },
    info: {
        fontSize: 14,
        marginLeft: 10,
    },
    button: {
        borderRadius: 25,
        backgroundColor: '#F5F5F5',
        width: '100%',
        // width: Layout.window.width * 0.75,
        height: Layout.window.width * 0.75,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
