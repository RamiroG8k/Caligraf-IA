import { decode, encode } from 'base-64';
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

    function dataURItoBlob(dataURI: any) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = decode(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        let ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString });
    }

    const takeShot = async () => {
        const photo = await ref.current
            .takePictureAsync({
                quality: 0.8,
                base64: true
            }).then((res: any) => {
                // console.log(res);
                let base64Img = `data:image/jpg;base64,${res.base64}`;
                getFile(base64Img);
                // getFile(res.base64);
            }).catch((err: any) => {
                console.log(err);
            });
        // console.log(photo);

        // let image = new Image(photo.width, photo.height);
        // image.src = base64Img;

        // console.log(typeof image);
        // console.log(image);

        // await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        // navigation.goBack();
    }

    function b64toBlob(b64Data: string, contentType: string = 'image/jpg', sliceSize?: any) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = decode(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    const getFile = async (base64: string) => {
        let blob = dataURItoBlob(base64);
        // let blob = b64toBlob(base64);
        let IMG = new File([blob], 'imagen_try.jpg', { type: 'image/jpg' });

        postFile();

        async function postFile() {

            let user: any;
            AsyncStorage.getItem('info').then(
                (response: any) => {
                    if (response !== null) {
                        user = (JSON.parse(response)._id);
                        console.log(user);
                        
                        return;
                    }
                }
            ).catch(
                (error: any) => {
                    console.warn('ERROR IN ASYNC STORAGE: ', error);
                }
            );


            let formData = new FormData();
            formData.append('image', IMG);
            formData.append('phraseId', route.params.phrase._id);
            // formData.append('userId', user);
            // console.log(formData);
            
            await ocrInstance.post('/image', formData)
                .then((response: any) => {
                    console.log(response);
                }).catch((error: any) => {
                    console.warn(error);
                });
        }

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
