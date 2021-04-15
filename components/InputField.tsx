import * as React from 'react';

import { StyleSheet } from 'react-native';
import { Text, TextInput, View, InputProps } from './Themed';

export function InputField(props: any): any {
    return (
        <View style={styles.formGroup}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput style={styles.input} secureTextEntry={props.secure} placeholder={props.placeholder ? props.placeholder : null}/>
        </View>
    );
}

const styles = StyleSheet.create({
    formGroup: {
        
    },
    label: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 10,
    },
    input: {
        height: 55,
        borderRadius: 15,
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
});