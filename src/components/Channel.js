import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import {colors} from '../lib/K';

export default function Channel({index, name, url, logo, onPress}) {
  const pressed = useCallback(() => {
    onPress(index, url);
  }, [onPress, url, index]);
  return (
    <TouchableNativeFeedback onPress={pressed}>
      <View style={styles.container}>
        {logo && <Image style={styles.logo} source={{url: logo}} />}

        <Text style={styles.name}>{name}</Text>
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
    fontSize: 32,
    color: colors.text,
  },
});
