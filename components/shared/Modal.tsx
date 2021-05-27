// Common
import React from 'react';
import { StyleSheet } from 'react-native';
// Others
import { useThemeColor } from '../../components/shared/Themed';
import { Modalize } from 'react-native-modalize';
import Layout from '../../constants/Layout';

const Modal = (props: any) => {
    const { children, reference } = props;
    const backgroundColor = useThemeColor({ light: '#FFF', dark: '#1F1F1F' }, 'background');

    return (
        <Modalize ref={reference} modalStyle={[styles.modal, { backgroundColor }]}
            modalHeight={Layout.window.height * 0.6} overlayStyle={styles.overlay}>
            {children}
        </Modalize>
    );
};

const styles = StyleSheet.create({
    modal: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.55)'
    }
});

export default Modal;
