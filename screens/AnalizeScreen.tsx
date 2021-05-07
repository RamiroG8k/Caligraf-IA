// Common
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
// Components
import { Text, View } from '../components/Themed';
import InfoCard from '../components/InfoCard';
import Layout from '../constants/Layout';
// Others
import { DummyTips } from '../utils/dummy-data';

export default function AnalizeScreen({ navigation }: { navigation: any }, props: any) {

    const tipsToShot: any = DummyTips.map((item: any) => {
        return (
            <InfoCard key={item.id} icon={item.icon} phrase={item.text} />
        );
    });

    return (
        <View transparent={true} style={styles.container}>
            <View transparent={true} style={{ marginVertical: '5%' }}>
                <Text style={[styles.strongText, styles.title]}>Getting Started</Text>
                <Text style={styles.info}>Before taking a shot, you must know some tips.</Text>
            </View>
            <View transparent={true} style={styles.tipsContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {tipsToShot}
                </ScrollView>
            </View>
            <View transparent={true} style={{ marginVertical: '5%' }}>
                <Text style={[styles.strongText, styles.subtitle]}>Let's get into it!</Text>
                <Text style={styles.info}>Now that you're ready, let's Begin Analyzing.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CameraScreen')}>
                    <Ionicons size={150} name="camera-outline" color="#CFA9DB" />
                    <Text style={[styles.strongText, styles.subtitle]}>¡Tap Here!</Text>
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
    tipsContainer: {
        marginHorizontal: '-7%',
        height: '20%',
    },
    strongText: {
        marginLeft: 10,
        marginBottom: 12,
        fontFamily: 'Montserrat-Bold',
    },
    title: {
        fontSize: 32,
        color: '#B981CC',
    },
    subtitle: {
        fontSize: 28,
        color: '#CFA9DB',
    },
    info: {
        fontSize: 14,
        marginLeft: 10,
    },
    buttonContainer: {
        borderRadius: 25,
        // width: Layout.window.width * 0.75,
        height: Layout.window.width * 0.75,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    }
});
