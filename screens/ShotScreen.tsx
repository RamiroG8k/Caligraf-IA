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

const ShotScreen = (props: any) => {
    const { navigation } = props;
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
                {/* TODO: Retry permissions Button */}
            </View>
        );
    }

    const takeShot = async () => {
        const photo = await ref.current.takePictureAsync({ quality: 0.8, base64: true });
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

        console.log(photo);

        let image = new Image();
        let base64Img = `data:image/jpg;base64,${photo.base64}`;
        image.src = base64Img;
        
        // navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text bold style={styles.title}>Capture Phrase</Text>
                <Text style={styles.subtitle}>Try to center the phrase in frame</Text>
            </View>
            <View style={styles.containerCamera}>
                <Camera ref={ref} style={styles.camera} />
            </View>
            <View style={styles.buttonContainer}>
                <Button text="SNAP!" onPress={takeShot} />
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
        marginTop: 10,
    },
    subtitle: {
        fontSize: 18,
    },
    containerCamera: {
        width: Layout.window.height * 0.9,
        height: Layout.window.width * 0.4,
        marginVertical: 25,
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
        borderRadius: 15,
        marginVertical: 10,
    },
});

export default ShotScreen;
