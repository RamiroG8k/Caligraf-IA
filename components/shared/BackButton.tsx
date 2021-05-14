// Common
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// Components
import { Icon, View } from '../Themed';
// Others
import Layout from '../../constants/Layout';

const BackButton = ({ onPress }: { onPress: any }): any => {
    return (
        <View themed style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.icon}>
                <Icon name="back" module="AntDesign" size={30}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        width: Layout.window.width * 0.15,
        height: Layout.window.width * 0.15,
        marginVertical: 20,
    },
    icon: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BackButton;
