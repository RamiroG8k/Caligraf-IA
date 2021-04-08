import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export function Banner() {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={[{ fontWeight: 'bold' }, { marginBottom: 5 }, { color: '#172A3A' }]}>Title Example</Text>
                <Text style={[{ fontSize: 12 }, { color: '#ACACAC' }, { flex: 1 }]}>Lorem ipsum dolor sit, sed do eiusmod tempor etsed do </Text>
                <Text style={[{ fontSize: 10 }, { marginTop: 10 }, { color: '#ACACAC' }]}>5 minutes session</Text>
            </View>
            <View style={styles.imgContainer}>
                <Image style={styles.img}
                    source={require('../assets/images/example.jpeg')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '20%',
        borderRadius: 25,
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
    },
    info: {
        padding: 15,
        width: '40%',
        color: 'black',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0)',
    },
    imgContainer: {
        height: '100%',
        width: '60%',
        backgroundColor: 'rgba(52, 52, 52, 0)',
    },
    img: {
        flex: 1,
        height: '100%',
        width: '100%',
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25
    }
});