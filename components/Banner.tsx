import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';

export function Banner() {
    return (
        <View style={styles.container}>
            <View style={[styles.infoContainer, { justifyContent: 'space-between' } ]}>
                <Text style={{ fontFamily: 'Montserrat-Bold', marginBottom: 5 }}>Title Example</Text>
                <Text style={[{ fontSize: 12 }, styles.subtitle]}>Lorem ipsum dolor sit, sed do eiusmod tempor etsed do </Text>
                <Text style={[{ fontSize: 10 }, styles.subtitle]}>5 minutes session</Text>
            </View>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={require('../assets/images/example.jpeg')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '20%',
        borderRadius: 25,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    subtitle: {
        color: '#999999',
        marginBottom: 5,
    },
    infoContainer: {
        padding: 15,
        width: '40%',
    },
    imgContainer: {
        width: '60%',
    },
    img: {
        height: '100%',
        width: '100%',
    }
});