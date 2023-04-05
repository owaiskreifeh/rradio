import React from 'react';
import {Text as RNText} from 'react-native';

export default function RText(props) {
  return <RNText {...props} style={[{fontFamily: 'Cairo'}, props.style]} />;
}
