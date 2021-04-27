import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../Themed';

const BottomDetails = (props: any) => {
    return (
        <View transparent={true} style={{ height: '10%', justifyContent: 'center', alignItems: 'center' }}>
            <View transparent={true}>
                {props.children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default BottomDetails;
