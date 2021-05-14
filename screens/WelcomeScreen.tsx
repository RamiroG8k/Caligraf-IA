import * as React from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';
import { Text, View, Button } from '../components/Themed';

const arrayInfo: Array<Object> = [
    {
        title: 'Caligraf IA analysis Assessment.',
        img: '../assets/images/illustrations/1.png',
        description: 'Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
];

const WelcomeScreen: React.FunctionComponent = (props: any) => {
    const { navigation } = props;

    const panel = (item: any): any => {
        return (
            <View transparent={true}>
                <View transparent={true} style={styles.imgContainer}>
                    <Image style={styles.img} source={{ uri: item.img }} />
                </View>
                <Text>{item.img}</Text>
                <View transparent={true} style={{ height: '30%' }}>
                    <Text secondary bold style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.description}</Text>
                </View>
            </View>
        );
    }

    return (
        <View transparent={true} style={styles.container}>
            {/* <View transparent={true} style={styles.imgContainer}>
                <Image style={styles.img}
                    source={require('../assets/images/illustrations/1.png')} />
            </View>
            <View transparent={true} style={{ height: '30%' }}>
                <Text secondary bold style={styles.title}>Caligraf IA analysis Assessment.</Text>
                <Text style={styles.subtitle}>Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            </View> */}

            <FlatList data={arrayInfo} keyExtractor={(_, index) => index.toString()} renderItem={({item}) => panel(item)}/>
            <View transparent={true}>
                <View transparent={true} style={styles.buttonGroup}>
                    <Button text="Sign Up" onPress={() => navigation.navigate('Register')} style={{ width: '45%' }} />
                    <Button primary text="Log In" onPress={() => navigation.navigate('Login')} style={{ width: '45%' }} />
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
        height: '45%',
        aspectRatio: 1,
        marginVertical: '15%',
    },
    img: {
        flex: 1,
        width: '100%',
        height: '100%',
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
});

export default WelcomeScreen;
