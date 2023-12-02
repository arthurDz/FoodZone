import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import {setValueBasedOnHeight} from '../utils/deviceDimensions';

const Header = props => {
  const {onLeftBtnClick, title, onRightBtnClick, RightIcon = <></>} = props;
  return (
    <View style={styles.container}>
      <Text>{`<`}</Text>
      <Text>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: setValueBasedOnHeight(50),
    backgroundColor: Colors.singletons.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: setValueBasedOnHeight(10),
  },
});
