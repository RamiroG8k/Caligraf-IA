import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Card = (props: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image style={styles.img}
                    source={{uri: props.image }}
                />
            </View>
            <View style={styles.info}>
                <View style={styles.tags}>
                    <Text>{props.time} minutes</Text>
                </View>
                <Text style={[{ fontWeight: 'bold' }, { marginBottom: 5 }, { color: '#172A3A' }]}>{props.title}</Text>
                <Text style={[{ fontSize: 12 }, { color: '#ACACAC' }]}>Lorem ipsum dolor sit, sed etsed do </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        aspectRatio: 1,
        borderRadius: 25,
        flexDirection: 'column',
        backgroundColor: '#F5F5F5',
    },
    imgContainer: {
        height: '40%'
    },
    img: {
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    info: {
        height: '60%',
        width: '100%',
        padding: 10,
        backgroundColor: 'transparent',
    },
    tags: {
        fontSize: 10,
        marginBottom: 3,
        color: '#ACACAC',
    }
});

export default Card;