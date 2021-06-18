// Common
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// Components
import { Icon, Text, View } from '../components/shared/Themed';
import InfoCard from '../components/InfoCard';
import Layout from '../constants/Layout';
// Others
import { DummyTips } from '../util/dummy-data';
import { apiInstance } from '../services/instances';
import { getRandomObject } from '../util';

export default function AnalizeScreen(props: any) {
    const [randPhrase, setRandPhrase] = useState({ id: 0, data: 'RANDOM'});
    const [taken, setTaken] = useState({ analized: false, backward: false, data: undefined });
    const [phrases, setPhrases] = useState([]);
    const { navigation, route } = props;

    const tipsToShot: any = DummyTips.map((item: any) => {
        return (
            <InfoCard key={item.id} icon={item.icon} phrase={item.text} />
        );
    });

    useEffect(() => {
        fetchPhrases();
        setTaken(route.params);
        if (route.params.analized === true) {
            alert(route.params.data);
        }
    }, [route.params]);

    const fetchPhrases = async () => {
        await apiInstance.get('/phrase/all')
            .then((response: any) => {
                setPhrases(response.data);
                setRandPhrase(getRandomObject(response.data));
            }).catch((error: any) => {
                console.warn('ERROR: ', error);
            });
    };


    return (
        <View style={styles.container}>
            <View style={{ marginVertical: '5%' }}>
                <Text primary bold style={styles.title}>Getting Started</Text>
                <Text style={styles.info}>Before taking a shot, you must know some tips.</Text>
            </View>
            <View style={{ height: '18%' }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ overflow: 'visible' }}>
                    {tipsToShot}
                </ScrollView>
            </View>
            <View style={{ marginVertical: '5%' }}>
                <Text secondary bold style={styles.subtitle}>Let's get into it!</Text>
                <Text style={styles.info}>Now that you're ready, let's Begin Analyzing.</Text>
            </View>
            <TouchableOpacity onPress={() => setRandPhrase(getRandomObject(phrases))} style={{ marginVertical: '5%', padding: 15, borderRadius: 15 }}>
                <Text secondary style={{ textAlign: 'center' }}>Your phrase is:</Text>
                <Text bold primary style={{ textAlign: 'center' }}>{randPhrase.data}</Text>
            </TouchableOpacity>
            <View themed style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CameraScreen', {phrase: randPhrase, taken} )}>
                    <Icon secondary name="camera-outline" size={150} />
                    <Text secondary bold style={styles.subtitle}>¡Tap Here!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        paddingTop: '20%',
        paddingBottom: 0,
    },
    title: {
        marginLeft: 10,
        marginBottom: 12,
        fontSize: 32,
    },
    subtitle: {
        marginLeft: 10,
        marginBottom: 12,
        fontSize: 28,
    },
    info: {
        fontSize: 14,
        marginLeft: 10,
    },
    buttonContainer: {
        borderRadius: 25,
        // width: Layout.window.width * 0.75,
        height: Layout.window.width * 0.6,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }
});
