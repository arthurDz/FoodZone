import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';

const HorizontalLine = ({width = '40%'}) => {
  return (
    <View
      style={{
        width: width,
        backgroundColor: Colors.singletons.black,
        height: 1,
      }}
    />
  );
};

export default HorizontalLine;
