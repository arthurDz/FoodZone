import {StyleSheet, TextInput, View} from 'react-native';
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
  leftIcon,
  rightComponent,
}) => {
  return (
    <View style={[styles.input, {...inputStyles}]}>
      {leftIcon && <View>{leftIcon}</View>}
      <TextInput
        style={{flex: 1}}
        placeholder={placeholder}
        placeholderTextColor={Colors.singletons.gray}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
      {rightComponent && <View>{rightComponent}</View>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.singletons.white,
    paddingHorizontal: setValueBasedOnWidth(16),
    alignItems: 'center',
    width: '100%',
    marginVertical: setValueBasedOnHeight(10),
    borderRadius: 8,
    color: Colors.singletons.gray,
    flexDirection: 'row',
  },
});
