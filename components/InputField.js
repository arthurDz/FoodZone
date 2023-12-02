import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import {
  setValueBasedOnHeight,
  setValueBasedOnWidth,
} from '../utils/deviceDimensions';

const InputField = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  inputStyles,
}) => {
  return (
    <TextInput
      style={[styles.input, {...inputStyles}]}
      placeholder={placeholder}
      placeholderTextColor={Colors.singletons.gray}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.primary.inputBackground,
    paddingHorizontal: setValueBasedOnWidth(16),
    paddingVertical: setValueBasedOnHeight(12),
    alignItems: 'center',
    width: '100%',
    marginVertical: setValueBasedOnHeight(10),
    borderRadius: 8,
    color: Colors.singletons.gray,
  },
});
