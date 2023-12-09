import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import {
  setValueBasedOnHeight,
  setValueBasedOnWidth,
} from '../utils/deviceDimensions';

const AddItemInCart = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.btnStyle} onPress={onPress}>
      <Text style={styles.btnText}>ADD</Text>
    </TouchableOpacity>
  );
};

export default AddItemInCart;

const styles = StyleSheet.create({
  btnStyle: {
    position: 'absolute',
    borderColor: Colors.primary.pinkShade1,
    backgroundColor: Colors.primary.pinkShade2,
    borderWidth: 1,
    borderRadius: 6,
    width: setValueBasedOnWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: setValueBasedOnHeight(5),
    alignSelf: 'center',
    bottom: -15,
  },
  btnText: {
    color: Colors.primary.pinkShade1,
    fontWeight: '700',
    fontSize: setValueBasedOnHeight(12),
  },
});
