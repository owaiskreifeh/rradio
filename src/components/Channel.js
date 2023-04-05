import React, {useCallback} from 'react';
import {View, Image, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {colors} from '../lib/K';
import RText from './Text';

export default function Channel({index, name, url, logo, onPress}) {
  const pressed = useCallback(() => {
    onPress(index, url);
  }, [onPress, url, index]);
  return (
    <TouchableNativeFeedback onPress={pressed}>
      <View style={styles.container}>
        {logo && <Image style={styles.logo} source={{url: logo}} />}

        <RText style={styles.name}>{name}</RText>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    width: '40%',
    backgroundColor: colors.accent1,
    borderTopLeftRadius: 5,
  },
  logo: {},
  name: {
    textAlign: 'center',
    fontSize: 24,
    color: colors.text,
  },
});
