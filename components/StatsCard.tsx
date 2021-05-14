// Common
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
// Others
import { Icon, Text, View } from '../components/Themed';
import Layout from '../constants/Layout';

const StatsCard = (props: any) => {
    const { title, phrase, icon, onPress } = props;
    return (
        <View themed style={styles.card}>
            <TouchableOpacity activeOpacity={0.4} onPress={onPress} style={{ alignItems: 'center', flexDirection: 'row' }}>
                <View themed light="#FFFFFF" dark="#000000" style={styles.icon}>
                    <Icon size={35} name={icon} module="Ionicons"/>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20 }}>{title}</Text>
                    <Text style={{ fontSize: 14 }}>{phrase}</Text>
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