// Common
import React from 'react';
import { Image, StyleSheet, FlatList } from 'react-native';
import { Text, View, Button } from '../components/shared/Themed';

interface Info {
    imgPath: any,
    title: string,
    info: string
};

const pages: Array<Info> = [
    { imgPath: require('../assets/images/illustrations/1.png'), title: 'Caligraf IA analysis Assessment.', info: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { imgPath: require('../assets/images/illustrations/2.png'), title: 'Parenting helper.', info: 'Lorem ipsum dolor sit amet, sed do ut labore et dolore magna aliqua.' },
    { imgPath: require('../assets/images/illustrations/3.png'), title: 'Analysis Assessment.', info: 'Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
];

const WelcomeScreen: React.FunctionComponent = (props: any) => {
    const { navigation: go } = props;

    function InfoCard({ data }: { data: Info }) {
        return (
            <View style={{ width: 300, alignItems: 'center' }}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={data.imgPath} />
                </View>
                <View>
                    <Text secondary bold style={styles.title}>{data.title}</Text>
                    <Text style={styles.subtitle}>{data.info}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={{ height: '90%' }}>
                <FlatList pagingEnabled horizontal data={pages} style={{ overflow: 'visible' }}
                    renderItem={({ item }) => <InfoCard data={item} />} keyExtractor={(_, index) => index.toString()} />
            </View>
            <View>
                <View style={styles.buttonGroup}>
                    <Button text="Sign Up" onPress={() => go.navigate('Register')} style={styles.button} />
                    <Button primary text="Log In" onPress={() => go.navigate('Login')} style={styles.button} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '10%',
        alignItems: 'center',
    },
    imgContainer: {
        marginVertical: '15%',
        aspectRatio: 1,
        height: '45%',
    },
    img: {
        flex: 1,
        width: '100%',
    },
    title: {
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 30,
    },
    subtitle: {
        textAlign: 'center',
        lineHeight: 24,
        fontSize: 16,
    },
    buttonGroup: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    button: {
        width: '45%'
    }
});

export default WelcomeScreen;
