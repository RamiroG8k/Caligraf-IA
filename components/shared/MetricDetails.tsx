// Common
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, View } from '../../components/Themed';
// Others
import { apiInstance } from '../../services/instances';

const MetricDetails = ({ id }: { id: any}) => {
    const [data, setData] = useState<Object | any>({id});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData(id);
        setLoading(false);
    }, []);

    async function fetchData(id: number) {
        await apiInstance.get(`/metric/${id}`).then(
            (response: any) => {
                response.data ? setData(response.data) : setData({ data: 'NO DATA'});
            }
        ).catch((error: any) => {
            console.warn('ERROR: ', error);
        });
    };

    if (loading) {
        return (
            <View themed={true} style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#BCDCC8"></ActivityIndicator>
            </View>
        );
    }
    
    return (
        <ScrollView>
            <View themed={true} style={styles.modalContent}>
                <Text>{JSON.stringify(data)}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: '5%',
    },
});

export default MetricDetails;