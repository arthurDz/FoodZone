import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  setValueBasedOnHeight,
  setValueBasedOnWidth,
} from '../utils/deviceDimensions';
import Colors from '../utils/Colors';

const HandleItemInCart = ({onPressInc, onPressDec}) => {
  return (
    <View style={styles.btnStyle}>
      <Text onPress={onPressDec} style={styles.btnTxtStyle}>
        -
      </Text>

      <Text style={styles.btnTxtStyle}>1</Text>

      <Text onPress={onPressInc} style={styles.btnTxtStyle}>
        +
      </Text>
    </View>
  );
};

export default HandleItemInCart;

const styles = StyleSheet.create({
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: setValueBasedOnWidth(100),
    paddingVertical: setValueBasedOnHeight(5),
    position: 'absolute',
    backgroundColor: Colors.primary.redShade,
    borderRadius: 6,
    alignSelf: 'center',
    bottom: -15,
  },
  btnTxtStyle: {
    fontSize: setValueBasedOnHeight(12),
    fontWeight: '600',
    color: Colors.singletons.white,
  },
});
