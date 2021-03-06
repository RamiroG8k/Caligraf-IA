import React from 'react';
import {
    Text as DefaultText,
    View as DefaultView,
    TextInput as DefaultTextInput,
    TouchableOpacity as DefaultTouchable
} from 'react-native';

import { AntDesign, Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { ThemeProps, IconProps as DefaultIconProps } from '../../types';

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
    const theme = useColorScheme();
    const colorFromProps = props[theme];

    return colorFromProps ? colorFromProps : Colors[theme][colorName];
}

export type TextProps = ThemeProps & DefaultText['props'] & { bold?: boolean };
export type ViewProps = ThemeProps & DefaultView['props'];
export type InputProps = ThemeProps & DefaultTextInput['props'];
export type TouchableProps = ThemeProps & DefaultTouchable['props'] & { text: string; };
export type IconProps = ThemeProps & DefaultIconProps;

export function Text(props: TextProps) {
    const { style, light, dark, bold, ...otherProps } = props;
    const color = useThemeColor({ light, dark },
        otherProps.primary ? 'primary' : otherProps.secondary ? 'secondary' : 'text');

    return <DefaultText style={[{ color, fontFamily: bold ? 'Montserrat-Bold' : 'Montserrat' }, style]} {...otherProps} />;
}

export function TextInput(props: InputProps) {
    const { style, light, dark, ...otherProps } = props;
    const color = useThemeColor({ light, dark }, 'text');
    const backgroundColor = useThemeColor({ light, dark }, 'background');

    return <DefaultTextInput style={[{ backgroundColor, color, fontFamily: 'Montserrat' }, style]} {...otherProps} />;
}

export function Button(props: TouchableProps) {
    const { style, light, dark, onPress, text, ...otherProps } = props;
    const backgroundColor = useThemeColor({ light, dark },
        otherProps.primary ? 'primary' : otherProps.secondary ? 'secondary' : 'background');

    return (
        <DefaultTouchable onPress={onPress} {...otherProps} activeOpacity={0.4}
            style={[{ borderRadius: 15, backgroundColor, padding: 14, justifyContent: 'center' }, style]} >
            <Text light={otherProps.primary || otherProps.secondary ? '#FFFFFF' : ''}
                dark={otherProps.primary || otherProps.secondary ? '#383838' : ''}
                style={{ fontSize: 18, textAlign: 'center', fontFamily: 'Montserrat-Bold' }}>
                {text}
            </Text>
        </DefaultTouchable>
    );
}

export function Icon(props: IconProps) {
    const { name, size, color, module, ...otherProps } = props;
    const icolor = color ? color : useThemeColor(
        {
            light: otherProps.primary || otherProps.secondary ? '' : '#383838',
            dark: otherProps.primary || otherProps.secondary ? '' : '#FFFFFF'
        },
        otherProps.primary ? 'primary' : otherProps.secondary ? 'secondary' : 'background'
    );

    switch (module) {
        case 'AntDesign':
            return <AntDesign name={name} size={size} color={icolor} {...otherProps} />
        case 'Ionicons':
            return <Ionicons name={name} size={size} color={icolor} {...otherProps} />
        default:
            return <Ionicons name={name} size={size} color={icolor} {...otherProps} />
    }
}

export function View(props: ViewProps) {
    const { style, light, dark, themed, ...otherProps } = props;
    const backgroundColor = themed ?
        useThemeColor({ light, dark }, otherProps.primary ? 'primary' :
            otherProps.secondary ? 'secondary' : 'background') : 'transparent';

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
