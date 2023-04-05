import useAxios from 'axios-hooks';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import parser from 'iptv-playlist-parser';

import t from '../translate/translate';
import {colors} from '../lib/K';

import Channel from '../components/Channel';
import Player from '../components/Player';

import LogoBlack from '../assets/logo/rr-logo_black.png';

export default function Radio() {
  const [{data, loading, error}, refetch] = useAxios(
    'https://raw.githubusercontent.com/klarman/combust_media_playlists/b571c96e77b68dde1dc9147ae2792093fd510915/radio_stations/json/jo.json',
  );
  const [channels, setChannels] = useState(null);
  const [currentChannel, setCurrentChannel] = useState(null);

  const onChannelPress = useCallback(
    index => {
      setCurrentChannel(index);
    },
    [setCurrentChannel],
  );

  useEffect(() => {
    if (data) {
      const rawChannels = parser.parse(data);
      setChannels(
        rawChannels.items.map((item, index) => {
          return {
            index,
            name: item.name,
            url: item.url,
            onPress: onChannelPress,
          };
        }),
      );
    }
  }, [data, onChannelPress]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LogoBlack} style={styles.logo} />
        <Text style={styles.brand}>Rahmeh Radio</Text>
      </View>
      {!!loading && (
        <View style={styles.loading}>
          <Text>{t('loading')}</Text>
          <ActivityIndicator animating />
        </View>
      )}

      {!!error && (
        <View style={styles.error}>
          <Text>{t('Something went wrong')}</Text>
        </View>
      )}

      {!!channels && (
        <ScrollView>
          <View style={styles.stationsGrid}>
            {channels.map(channel => {
              return <Channel key={'CHNL_KEY_' + channel.name} {...channel} />;
            })}
          </View>
        </ScrollView>
      )}

      {!!currentChannel && (
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
    height: '30%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.accent2,
  },
});
