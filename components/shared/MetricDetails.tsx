import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';

const MetricDetails = (props: any) => {
    return (
        <ScrollView style={styles.modalContent}>
            <Text>INFO {props.id}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: '5%',
        flex: 1,
    },
});

export default MetricDetails;