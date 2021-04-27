import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';

const BottomDetails = (props: any) => {
    return (
        <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: 10 }}>
                {props.children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        // marginTop: '30%', // This is the important style you need to set
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BottomDetails;
