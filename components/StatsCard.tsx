import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import Layout from '../constants/Layout';


const StatsCard = (props: any) => {
    return (
        <View style={styles.card}>
            <TouchableOpacity activeOpacity={0.4} onPress={() => alert('CLICK')} style={{ alignItems: 'center', flexDirection: 'row' }}>
                <View style={styles.icon}>
                    <Ionicons size={30} name={props.icon} />
                </View>
                <View transparent={true} style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20 }}>{props.title}</Text>
                    <Text style={{ fontSize: 14 }}>{props.phrase}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        borderRadius: Math.round(Layout.window.width + Layout.window.height) / 2,
        width: Layout.window.width * 0.15,
        height: Layout.window.width * 0.15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    info: {
        width: '70%'
    },
    card: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 25,
        marginBottom: 15,
    },
});

export default StatsCard;