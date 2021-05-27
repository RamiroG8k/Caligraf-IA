// Common
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Icon, TextInput, InputProps } from './Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
// Util
import { FieldError } from 'react-hook-form';

interface Props extends InputProps {
    label?: string;
    change?: any;
    error?: FieldError | undefined;
}

export function InputField(props: Props): any {
    const { label, change, error, secureTextEntry, ...otherProps } = props;
    const [secret, setSecret] = useState<boolean>(secureTextEntry ? true : false);
    const [icon, setIcon] = useState<string | any>('eye-outline');

    const toggleVisibility = (): void => {
        setIcon(icon === 'eye-outline' ? 'eye-off-outline' : 'eye-outline');
        setSecret(!secret);
    };

    return (
        <View style={{ zIndex: 0 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                {label && <Text style={styles.label}>{label}</Text>}
                {secureTextEntry && <TouchableOpacity onPress={toggleVisibility} style={styles.touchable}>
                    <Text>{ secret ? 'show ' : 'hide ' }</Text>
                    <Icon module="Ionicons" size={20} name={icon} />
                </TouchableOpacity>}
            </View>
            <TextInput onChangeText={change} autoCapitalize="none" secureTextEntry={secret} style={styles.input} {...otherProps} />
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 5,
    },
    input: {
        paddingHorizontal: 15,
        borderRadius: 15,
        height: 55,
    },
    touchable: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});