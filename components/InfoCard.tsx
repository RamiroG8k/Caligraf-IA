import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Text, View } from './shared/Themed';

const InfoCard = (props: any) => {
    const { icon, phrase } = props;
    return (
        <View themed style={styles.tip}>
            <View style={styles.icon}>
                <Icon size={45} name={icon}/>
            </View>
            <View style={styles.info}>
                <Text style={{ width: '100%', }}>{phrase}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tip: {
        width: 275,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderRadius: 25,
        marginHorizontal: 10,
        padding: 10,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%'
    },
    info: {
        width: '70%'
    }
});

export default InfoCard;