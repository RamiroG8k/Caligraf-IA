import * as React from 'react';

import { StyleSheet } from 'react-native';
import { View, Text, TextInput, InputProps } from './Themed';
import { FieldError } from 'react-hook-form';

interface Props extends InputProps {
    label?: string;
    change?: any;
    error?: FieldError | undefined;
}

export function InputField(props: Props): any {
    const { label, error, ...inputProps } = props;

    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput onChangeText={props.change} autoCapitalize="none" style={styles.input} {...inputProps}/>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 10,
    },
    input: {
        height: 55,
        borderRadius: 15,
        paddingHorizontal: 15,
    },
});