import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';

const MetricDetails = (props: any) => {
    return (
        <View transparent={true} style={styles.modalContent}>
            <Text>INFO {props.id}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#FFF',
        padding: '5%',
        flex: 1,
    },
});

export default MetricDetails;