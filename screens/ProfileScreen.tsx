import * as React from 'react';
import { StyleSheet, Image, ScrollView, TouchableHighlight } from 'react-native';

import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import StatsCard from '../components/StatsCard';

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

export default function ProfileScreen() {

    const availableStats: any = DATA.map((item: any) => {
        return (
            <StatsCard key={item.id} icon={item.icon} title={item.title} phrase={item.text} />
        );
    });

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <View style={[styles.picture, { marginTop: '10%' }]}>
                    <View style={styles.pictureBorder}>
                        <Image style={styles.picture} source={require('../assets/images/profile.jpg')} />
                    </View>
                </View>
                <View style={{ alignItems: 'center', margin: '10%' }}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 22, marginBottom: 5, color: '#707070' }}>@Username</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#A9AAAA' }}>first.example@hotmail.com</Text>
                    <View style={styles.buttonGroup}>
                        <TouchableHighlight underlayColor="#CCCCCC" onPress={() => alert('Log out')} style={styles.button}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 18 }}>Log Out</Text>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="#94C7A7" onPress={() => alert('Edit')} style={[styles.button, { backgroundColor: '#BCDCC8' }]}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 18 }}>Edit</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            <View>
                <View style={{ marginVertical: '5%' }}>
                    <Text style={styles.title}>Stats</Text>
                    <Text style={styles.info}>Before taking a shot, you must know some tips.</Text>
                </View>
                {availableStats}
            </View>
            <View style={{ alignItems: 'center', marginTop: 10, marginBottom: '30%' }}>
                <Text>Coming Soon...</Text>
            </View>
        </ScrollView>
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
        backgroundColor: '#E6E6E6',
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
        borderRadius: 10,
        padding: 12,
        margin: 10,
        width: '45%',
    },
});
