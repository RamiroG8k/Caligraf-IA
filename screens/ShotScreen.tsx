import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
// import { BarCodeScanner } from 'expo-barcode-scanner';

const ShotScreen = ({ navigation }: { navigation: any }, props: any) => {
    // REQUEST PERMISSIONS FOR ACCESS TO CAMERA
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const ref = useRef<any | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return (
            <View transparent={true} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View transparent={true} style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 26, marginVertical: 14 }}>No access to camera</Text>
                    <Ionicons name="alert-circle-outline" size={74} />
                </View>
                {/* TODO: Retry permissions Button */}
            </View>
        );
    }

    // const handlePhraseScanned = async (picture: any) => {
    // };

    const takeShot = async () => {
        const photo = await ref.current.takePictureAsync()
        console.debug(photo)
    }


    return (
        <View transparent={true} style={styles.container}>
            <Text style={styles.title}>Capture Phrase</Text>
            <View style={styles.containerCamera}>
                <Camera ref={ref} style={styles.camera} />
            </View>
            <View transparent={true} style={{ alignItems: 'center' }}>
                <Text style={styles.subtitle}>
                    Try to center the phrase in frame
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={takeShot} style={styles.button}>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 18 }}>SNAP!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 26,
        marginTop: '15%',
    },
    subtitle: {
        fontFamily: 'Montserrat',
        fontSize: 18,
    },
    containerCamera: {
        width: Layout.window.width * 0.65,
        height: Layout.window.height * 0.6,
        marginVertical: '5%',
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#383838',
        overflow: 'hidden',
    },
    camera: {
        width: (Layout.window.width * 0.65) - 10,
        height: (Layout.window.height * 0.6) - 10,
        borderRadius: 20,
        overflow: 'hidden',
    },
    buttonContainer: {
        borderRadius: 15,
        marginVertical: '5%',
    },
    button : {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    }
});

export default ShotScreen;
