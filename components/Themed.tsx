import React from 'react';
import {
    Text as DefaultText,
    View as DefaultView,
    TextInput as DefaultTextInput,
    TouchableOpacity as DefaultTouchable
} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { ThemeProps } from '../types';

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
    const theme = useColorScheme();
    const colorFromProps = props[theme];

    return colorFromProps ? colorFromProps : Colors[theme][colorName];
}

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type InputProps = ThemeProps & DefaultTextInput['props'];
export type TouchableProps = ThemeProps & DefaultTouchable['props'] & { text: string; };

export function Text(props: TextProps) {
    const { style, light, dark, ...otherProps } = props;
    const color = useThemeColor({ light, dark },
        otherProps.primary ? 'primary' : otherProps.secondary ? 'secondary' : 'text')

    return <DefaultText style={[{ color, fontFamily: 'Montserrat' }, style]} {...otherProps} />;
}

export function TextInput(props: InputProps) {
    const { style, light, dark, ...otherProps } = props;
    const color = useThemeColor({ light, dark }, 'text');
    const backgroundColor = useThemeColor({ light, dark }, 'background');

    return <DefaultTextInput style={[{ backgroundColor, color, fontFamily: 'Montserrat' }, style]} {...otherProps} />;
}

export function Button(props: TouchableProps) {
    const { style, light, dark, onPress, text, ...otherProps } = props;
    const backgroundColor = useThemeColor({ light, dark }, otherProps.primary ? 'primary' : 'background')

    return (
        <DefaultTouchable onPress={onPress} {...otherProps}
            style={[{ borderRadius: 15, backgroundColor, padding: 14 }, style]} >
            <Text light={otherProps.primary || otherProps.secondary ? '#FFFFFF' : ''}
                dark={otherProps.primary || otherProps.secondary ? '#383838' : ''}
                style={{ fontSize: 18, textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>
                {text}
            </Text>
        </DefaultTouchable>
    );

}

export function View(props: ViewProps) {
    const { style, light, dark, transparent, ...otherProps } = props;
    const backgroundColor = transparent ? 'transparent' : useThemeColor({ light, dark }, 'background')

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
