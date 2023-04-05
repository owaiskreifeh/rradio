import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';

import {colors} from '../lib/K';
import t from '../translate/translate';

export default function Player({channel}) {
  const player = useRef(null);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState('loading');
  const playPause = useCallback(() => {
    setPaused(!paused);
  }, [paused]);

  useEffect(() => {
    setStatus('loading');
  }, [channel]);

  const loaded = useCallback(() => {
    setStatus('playing');
  }, []);

  const errored = useCallback((error) => {
    setStatus('error');
    console.error('player err', error);
  }, []);

  const buffering = useCallback(() => {
    setStatus('loading');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.playing}>{t(status)}</Text>
      <Text style={styles.name}>{channel.name.trim()}</Text>
      <Video
        ref={player}
        paused={paused}
        source={{uri: channel.url}}
        style={styles.player}
        onBuffer={buffering}
        onLoad={loaded}
        onError={errored}
      />
      <TouchableOpacity onPress={playPause}>
        <View style={styles.btn}>
          <Text style={styles.btnTxt}>{t(paused ? 'PLAY' : 'PAUSE')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    borderRadius: 5,
    backgroundColor: colors.accent2,
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  playing: {
    color: colors.text,
  },
  btn: {
    borderRadius: 500,
    backgroundColor: colors.primary,
    width: 120,
    height: 120,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: colors.text,
    fontSize: 32,
  },
});
