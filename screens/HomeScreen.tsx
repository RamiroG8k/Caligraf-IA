import * as React from 'react';
import { StyleSheet, ScrollView, FlatList, Image, TouchableHighlight } from 'react-native';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import Banner from '../components/Banner';
import BottomDetails from '../components/shared/BottomDetails';

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

export default function HomeScreen({ navigation }: { navigation: any }, props: any) {

    const formatData = (data: Array<any>, columns: number): Array<any> => {
        while (data.length % columns) {
            data.push({ empty: true });
        }
        return data;
    };

    const emptyCard = (): any => {
        return (
            <TouchableHighlight underlayColor="#CCCCCC" onPress={() => navigation.navigate('Analyze')} style={{ flex: 1, margin: 10, aspectRatio: 1, borderRadius: 25 }}>
                <Image style={{ flex: 1, width: '100%', borderRadius: 25, opacity: 0.5 }}
                    source={require('../assets/images/Plus2.jpg')} />
            </TouchableHighlight>
        );
    };

    const renderCard = (item: any) => {
        return item.empty ? emptyCard() : <Card {...item} />
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View transparent={true}>
                <View transparent={true} style={{ marginVertical: '5%' }}>
                    <Text style={styles.title}>Week Info</Text>
                    <Text style={styles.info}>General stats, Tips & Tricks</Text>
                </View>
                <View style={styles.separator} lightColor="#E6E6E6" darkColor="#5C5C5C" />
            </View>
            <View transparent={true}>
                <View transparent={true} style={{ marginVertical: '5%' }}>
                    <Text style={styles.subtitle}>Reminder</Text>
                    <Text style={styles.info}>General stats, Tips & Tricks</Text>
                </View>
                <Banner />
            </View>
            <View transparent={true}>
                <View transparent={true} style={{ marginVertical: '5%' }}>
                    <Text style={styles.subtitle}>Last Analyses</Text>
                    <Text style={styles.info}>General stats, Tips & Tricks</Text>
                </View>
                <FlatList scrollEnabled={false} data={formatData(DATA, columns)}
                    keyExtractor={item => item.id} numColumns={columns}
                    style={{ margin: -10 }} renderItem={({ item }) => renderCard(item)} />
            </View>
            <BottomDetails visible={false}>
                <View transparent={true} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>INFO</Text>
                </View>
            </BottomDetails>
            <View transparent={true} style={{ alignItems: 'center', marginTop: '10%', marginBottom: '30%' }}>
                <Text>Coming Soon...</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        paddingTop: '20%',
        paddingBottom: 0,
    },
    title: {
        fontSize: 32,
        marginLeft: 10,
        marginBottom: 12,
        fontFamily: 'Montserrat-Bold',
        color: Colors.light.primary,
    },
    subtitle: {
        fontSize: 26,
        marginLeft: 10,
        marginBottom: 12,
        fontFamily: 'Montserrat-Bold',
        color: Colors.light.secondary,
    },
    info: {
        fontSize: 14,
        marginLeft: 10,
    },
    separator: {
        marginLeft: 10,
        width: '80%',
        height: 1,
    },
});
