import React, { useState } from 'react';

import { Pressable, StyleSheet } from 'react-native';
import { View, Text, TextInput, InputProps } from './Themed';
import { FieldError } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends InputProps {
    label?: string;
    change?: any;
    error?: FieldError | undefined;
}

export function InputField(props: Props): any {
    const [visibility, setVisibility] = useState(false);
    const [icon, setIcon] = useState<string | any>('eye-outline');
    const { label, error, secureTextEntry, ...inputProps } = props;

    const toggleVisibility = () => {
        setIcon(icon === 'eye-outline' ? 'eye-off-outline' : 'eye-outline');
        setVisibility(!visibility);
    };

    return (
        <View transparent={true}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput onChangeText={props.change} secureTextEntry={visibility} autoCapitalize="none" style={styles.input} {...inputProps} />
            {secureTextEntry && <TouchableOpacity onPress={() => toggleVisibility()} style={styles.icon}>
                <Ionicons size={30} name={icon} />
            </TouchableOpacity>}
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
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    }
});