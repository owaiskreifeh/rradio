import React, {useCallback, useState} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {colors} from '../lib/K';

import Channel from '../components/Channel';
import Player from '../components/Player';

import LogoBlack from '../assets/logo/rr-logo_black.png';
import ChannelList from './playlist';
import RText from '../components/Text';

export default function Radio() {
  const onChannelPress = useCallback(
    index => {
      setCurrentChannel(index);
    },
    [setCurrentChannel],
  );

  const [channels] = useState(
    ChannelList.map((ch, i) => ({
      name: ch.ar,
      index: i,
      url: ch.url,
      onPress: onChannelPress,
    })),
  );
  const [currentChannel, setCurrentChannel] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LogoBlack} style={styles.logo} />
        <RText style={styles.brand}>Rahmeh Radio</RText>
      </View>

      {!!channels && (
        <ScrollView>
          <View style={styles.stationsGrid}>
            {channels.map(channel => {
              return <Channel key={'CHNL_KEY_' + channel.name} {...channel} />;
            })}
          </View>
        </ScrollView>
      )}

      {currentChannel >= 0 && (
        <View style={styles.playerContainer}>
          <Player channel={channels[currentChannel]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    height: '100%',
  },
  loading: {},
  error: {},
  brand: {
    textAlign: 'center',
    fontSize: 32,
    color: colors.primary,
  },
  stationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 46,
    height: 46,
  },
  header: {
    flexDirection: 'row',
    margin: 12,
    justifyContent: 'center',
  },
  playerContainer: {
    height: '35%',
    padding: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.accent2,
  },
});
