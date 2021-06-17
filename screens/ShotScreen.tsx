// Common
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
// Components
import { Button, Text, View } from '../components/shared/Themed';
import { Ionicons } from '@expo/vector-icons';
// Others
import * as ScreenOrientation from 'expo-screen-orientation';
import { Camera } from 'expo-camera';
import Layout from '../constants/Layout';
import { ocrInstance } from '../services/instances';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShotScreen = (props: any) => {
    const { navigation, route } = props;

    // REQUEST PERMISSIONS FOR ACCESS TO CAMERA
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const ref = useRef<any | null>(null);

    useEffect(() => {
        (async () => {
            // navigation.setOptions({ tabBarVisible: false });
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return (
            <View themed={true} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View themed={true} style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 26, marginVertical: 14 }}>No access to camera</Text>
                    <Ionicons name="alert-circle-outline" size={74} />
                </View>
            </View>
        );
    }

    const takeShot = async () => {
        const photo = await ref.current
            .takePictureAsync({
                quality: 0.9,
            }).then((res: any) => {
                postFile(res);
            }).catch((err: any) => {
                console.log(err);
            });
        // await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        // navigation.goBack();
    }

    async function postFile(img: any) {
        let formData = new FormData();
        formData.append('image', JSON.parse(JSON.stringify({
            uri: img.uri,
            type: 'image/jpeg',
            name: 'testPhotoName'
        })));
        formData.append('phraseId', route.params.phrase._id);
        formData.append('userId', '608766008755ab00ccb2212f');
        await ocrInstance.post('/image', formData)
            .then((response: any) => {
                console.log(response.data);
            }).catch((error: any) => {
                console.warn(error);
            });
    }

    const goBack = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        navigation.navigate('AnalizeScreen', { analized: false, backward: true });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text bold primary style={styles.title}>Capture Phrase</Text>
                <Text bold secondary style={styles.subtitle}>"{route.params.phrase.data}"</Text>
            </View>
            <View style={styles.containerCamera}>
                <Camera ref={ref} style={styles.camera} />
            </View>
            <Text style={{ fontSize: 16, marginVertical: 10 }}>Try to center the phrase in frame</Text>
            <View style={styles.buttonContainer}>
                <Button text="Cancel" onPress={() => goBack()} />
                <Button primary text="SNAP!" onPress={takeShot} />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        marginTop: 15,
    },
    subtitle: {
        fontSize: 18,
    },
    containerCamera: {
        width: Layout.window.height * 0.9,
        height: Layout.window.width * 0.4,
        marginVertical: 15,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#383838',
        overflow: 'hidden',
    },
    camera: {
        width: (Layout.window.height * 0.9) - 10,
        height: (Layout.window.width * 0.4) - 10,
        borderRadius: 20,
        overflow: 'hidden',
    },
    buttonContainer: {
        width: '25%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderRadius: 15,
        // marginVertical: 10,
    },
});

export default ShotScreen;
