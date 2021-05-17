import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from './Themed';

const Stat = (props: any) => {
    const { letter, average } = props;

    return (
        <View style={styles.container}>
            <View themed light="#FFF" dark="#000" style={styles.graph}>
                <View style={[styles.stat, { height: `${average}%` }]}>
                    <Text bold style={{ fontSize: 30 }}>{letter}</Text>
                </View>
            </View>
            <Text style={{ fontSize: 16, margin: 5 }}>{Math.round(average)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
    },
    graph: {
        flex: 1,
        justifyContent: 'flex-end',
        borderRadius: 15,
        width: 70,
        alignItems: 'center',
        padding: 5
    },
    stat: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0D9F1',
        width: '100%',
        borderRadius: 15
    }
});

export default Stat;