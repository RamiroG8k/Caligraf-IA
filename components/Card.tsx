import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

const Card = (props: any) => {
    const { onPress, image, time, title } = props;
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={{uri: image }} />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.tagsContainer}>
                    <View lightColor="#E0E0E0" darkColor="#474747" style={styles.tag}>
                        <Text style={{ fontSize: 10 }}>{time} %</Text>
                    </View>
                </View>
                <View>
                    <Text style={[{ fontFamily: 'Montserrat-Bold' }, { marginBottom: 5 }]}>{title}</Text>
                    <Text style={{ fontSize: 12, color: '#999999' }}>Lorem ipsum dolor sit, sed etsed do </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 25, 
        overflow: 'hidden',
        flexDirection: 'column',
    },
    imgContainer: {
        height: '40%'
    },
    img: {
        flex: 1,
    },
    infoContainer: {
        height: '60%',
        padding: 10,
    },
    tagsContainer: {
        marginBottom: 3,
    },
    tag: {
        borderRadius: 25,
        paddingVertical: 2,
        paddingHorizontal: 5,
        width: '30%',
    }
});

export default Card;