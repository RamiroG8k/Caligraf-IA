import * as React from 'react';
import { StyleSheet, ScrollView, FlatList, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import { Banner } from '../components/Banner';

const DATA = [
    {
        id: "6",
        title: "SABOR MORENO",
        time: 5,
        image: "https://images.pexels.com/photos/7260632/pexels-photo-7260632.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
        id: "7",
        title: "0 MESTRE PUB",
        time: 6,
        image:
            "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
        id: "8",
        title: "GRILL 54 CHEF",
        time: 10,
        image:
            "https://images.pexels.com/photos/760709/pexels-photo-760709.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    }
];

const columns: number = 2;

export default function HomeScreen() {
    const formatData = (data: Array<any>, columns: number): Array<any> => {
        while (data.length % columns) {
            data.push({ empty: true });
        }
        return data;
    };

    const emptyCard = (): any => {
        return (
            <View style={{ flex: 1, margin: 10, aspectRatio: 1, borderRadius: 25 }}>
                <Image style={{ flex: 1, width: '100%', borderRadius: 25, opacity: 0.5 }}
                    source={require('../assets/images/Plus.jpg')} />
            </View>
        );
    };

    const renderCard = (item: any) => {
        if (item.empty) {
            return(emptyCard());
        }
        return (
            <Card {...item} />
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.strongText, styles.title]}>Week Info</Text>
            <Text style={styles.info}>General stats, Tips & Tricks</Text>
            <View style={styles.separator} lightColor="#E6E6E6" darkColor="#5C5C5C" />
            <View style={{ marginBottom: 20, backgroundColor: 'transparent' }}>
                <Text style={[styles.strongText, styles.subtitle]}>Reminder</Text>
                <Banner />
            </View>
            <Text style={[styles.strongText, styles.subtitle]}>Last Analyses</Text>
            <FlatList scrollEnabled={false} data={formatData(DATA, columns)}
                keyExtractor={item => item.id} numColumns={columns}
                style={{ margin: -10 }} renderItem={({ item }) => renderCard(item)} />
            <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 60, backgroundColor: 'transparent' }}>
                <Text>Coming Soon...</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 0,
        backgroundColor: 'white'
    },
    strongText: {
        marginLeft: 10,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 30,
        color: Colors.light.primary,
    },
    subtitle: {
        fontSize: 26,
        color: Colors.light.secondary,
    },
    info: {
        fontSize: 14,
        marginLeft: 10,
    },
    separator: {
        marginVertical: 15,
        marginLeft: 10,
        height: 1,
        width: '80%',
    },
});
