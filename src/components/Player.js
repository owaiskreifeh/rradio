import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';

import {colors} from '../lib/K';
import t from '../translate/translate';
import RText from './Text';

export default function Player({channel}) {
  const player = useRef(null);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState('loading');
  const playPause = useCallback(() => {
    setPaused(!paused);
  }, [paused]);

  useEffect(() => {
    setStatus('loading');
    setPaused(false);
  }, [channel]);

  const loaded = useCallback(() => {
    setStatus('playing');
  }, []);

  const errored = useCallback(error => {
    setStatus('error');
    console.error('player err', error);
  }, []);

  const buffering = useCallback(() => {
    setStatus('loading');
  }, []);

  return (
    <View style={styles.container}>
      <RText style={styles.playing}>
        {t(status === 'playing' ? 'current_channel' : status)}
      </RText>
      <RText style={styles.name}>{channel.name.trim()}</RText>
      <Video
        ref={player}
        paused={paused}
        source={{uri: channel.url}}
        style={styles.player}
        onBuffer={buffering}
        onLoad={loaded}
        onError={errored}
        playInBackground={true}
        playWhenInactive={true}
        ignoreSilentSwitch="ignore"
      />
      <TouchableOpacity onPress={playPause}>
        <View style={styles.btn}>
          <RText style={styles.btnTxt}>{t(paused ? 'PLAY' : 'PAUSE')}</RText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: colors.accent2,
  },
  name: {
    color: colors.text,
    fontSize: 32,
  },
  playing: {
    color: colors.text,
    fontSize: 24,
  },
  btn: {
    borderRadius: 500,
    backgroundColor: colors.primary,
    width: 120,
    height: 120,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  btnTxt: {
    color: colors.text,
    fontSize: 32,
  },
});
