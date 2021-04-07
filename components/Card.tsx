import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export function Card() {
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image style={styles.image}
                    source={require('../assets/images/example.jpeg')}
                />
            </View>
            <View style={styles.info}>
                <View style={styles.tags}>
                    <Text>5 minutes</Text>
                </View>
                <Text style={[{ fontWeight: 'bold' }, { marginBottom: 5 }, { color: '#172A3A' }]}>Title Example</Text>
                <Text style={[{ fontSize: 12 }, { color: '#ACACAC' }]}>Lorem ipsum dolor sit, sed etsed do </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 25,
        flexDirection: 'column',
        backgroundColor: '#F5F5F5',
    },
    imgContainer: {
        height: '40%'
    },
    image: {
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    info: {
        height: '60%',
        width: '100%',
        padding: 10,
        backgroundColor: 'rgba(52, 52, 52, 0)',
    },
    tags: {
        fontSize: 10,
        marginBottom: 3,
        color: '#ACACAC',
    }
});