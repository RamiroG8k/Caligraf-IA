// Common
import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Text, View, Button } from '../components/shared/Themed';

interface Info {
    imgPath: any,
    title: string,
    info: string
};

const pages: Array<Info> = [
    { imgPath: require('../assets/images/illustrations/1.png'), title: 'Caligraf IA analysis Assessment.', info: 'Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { imgPath: require('../assets/images/illustrations/2.png'), title: 'Parenting helper.', info: 'Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { imgPath: require('../assets/images/illustrations/3.png'), title: 'Caligraf IA analysis Assessment.', info: 'Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
];

const WelcomeScreen: React.FunctionComponent = (props: any) => {
    const { navigation: go } = props;

    const infoCards = pages.map((e: Info, i: number, { length }: { length: number }) => {
        return (
            <View key={i} style={{ width: 300, alignItems: 'center' }}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={e.imgPath} />
                </View>
                <View>
                    <Text secondary bold style={styles.title}>{e.title}</Text>
                    <Text style={styles.subtitle}>{e.info}</Text>
                </View>
            </View>
        );
    });

    return (
        <View style={styles.container}>
            <View style={{ height: '90%' }}>
                <ScrollView horizontal decelerationRate={0} pagingEnabled
                    showsHorizontalScrollIndicator={false} style={{ overflow: 'visible' }}>
                    {infoCards}
                </ScrollView>
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
