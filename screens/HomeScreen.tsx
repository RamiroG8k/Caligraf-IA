import * as React from 'react';
import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Week Info</Text>
      <Text style={styles.subtitle}>General stats, Tips & Tricks</Text>
      <View style={styles.separator} lightColor="#707070" darkColor="#5C5C5C" />
      <Text style={[styles.title, { color: '#508CA4'}, {fontSize: 26}]}>Reminder</Text>
      <View style={styles.infoCard}>
        <View style={styles.info}>
          <Text style={[{fontWeight: 'bold' }, {marginBottom: 5}, {color: '#172A3A'}]}>Title Example</Text>
          <Text style={[{fontSize: 12}, {color: '#ACACAC'}]}>Lorem ipsum dolor sit, sed do eiusmod tempor etsed do </Text>
          <Text style={[{fontSize: 10 }, {marginTop: 10}, {color: '#ACACAC'}]}>5 minutes session</Text>
        </View>
        <View style={styles.img}>
          <Image style= {{flex: 1, width: '100%', borderBottomRightRadius: 25, borderTopRightRadius: 25}}    
            source={require('../assets/images/example.jpeg')}
          />
        </View>
      </View>
      <Text style={[styles.title, { color: '#707070'}, {fontSize: 26}]}>Last anlyses</Text>
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginLeft: 10,
    marginBottom: 15,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  subtitle: {
    fontSize: 14,
    marginLeft: 10,
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  infoCard: {
    height: '20%',
    borderRadius: 25,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
  },
  info: {
    padding: 15,
    width: '40%',
    color: 'black',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0)',
  },
  img: {
    width: '60%',
    backgroundColor: 'rgba(52, 52, 52, 0)',
  }
});
