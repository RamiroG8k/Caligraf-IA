import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';


const InfoCard = (props: any) => {
    return (
        <View style={styles.tip}>
            <View style={styles.icon}>
                <Ionicons size={45} name={props.icon}/>
            </View>
            <View style={styles.info}>
                <Text style={{ width: '100%', }}>{props.phrase}</Text>
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
        marginLeft: 20,
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