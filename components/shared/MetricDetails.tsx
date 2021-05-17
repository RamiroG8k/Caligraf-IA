// Common
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
// Others
import { apiInstance } from '../../services/instances';
import * as Util from '../../utils/util-functions';
import { GRADING } from '../../utils/dummy-data';
import Stat from '../Stat';

const MetricDetails = ({ id }: { id: any }) => {
    const [data, setData] = useState<Object | any>({ id });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData(id);
    }, []);

    async function fetchData(id: number) {
        await apiInstance.get(`/metric/${id}`)
            .then((response: any) => {
                response.data ? setData(response.data) : setData({ data: 'NO DATA' });
            }).catch((error: any) => {
                setData({ data: 'NO DATA' });
                console.warn('ERROR: ', error);
            });
        setLoading(false);
    };

    if (loading) {
        return (
            <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#FFAA49"></ActivityIndicator>
            </View>
        );
    }

    const details = data.metrics_data.map(
        (item: any, index: number): any => {
            return (
                <Stat key={index} average={item.average} letter={item.letter} />
            );
        }
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={styles.header}>
                <View style={{ width: '80%', }}>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>{Util.toLocalDate(data.date)}</Text>
                    <Text bold style={{ fontSize: 22 }}>{JSON.stringify(data.phrase.data)}</Text>
                </View>
                <TouchableOpacity style={styles.icon}>
                    <View themed style={styles.icon}>
                        <Text style={{ fontSize: 16 }}>{Math.round(data.general_average)}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View themed style={styles.content}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ overflow: 'hidden' }}>
                    {details}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
        height: Layout.window.height * 0.8
    },
    header: {
        flex: 1,
        paddingVertical: 15,
        marginBottom: 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    content: {
        height: 190,
        width: '100%',
        padding: 10,
        borderRadius: 15
    },
    icon: {
        borderRadius: Math.round(Layout.window.width + Layout.window.height) / 2,
        width: Layout.window.width * 0.15,
        height: Layout.window.width * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default MetricDetails;