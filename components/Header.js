import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import {setValueBasedOnHeight} from '../utils/deviceDimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = ({onIconPress, title, icon, children, titleStyle}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
        {icon ? (
          icon
        ) : (
          <AntDesign
            name="left"
            size={setValueBasedOnHeight(14)}
            color={Colors.singletons.black}
          />
        )}
      </TouchableOpacity>

      {title && (
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, titleStyle]}>{title}</Text>
        </View>
      )}

      {children && (
        <View style={styles.customContentContainer}>{children}</View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: setValueBasedOnHeight(40),
    backgroundColor: Colors.primary.bgPrimary,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    marginBottom: setValueBasedOnHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: setValueBasedOnHeight(18),
    fontWeight: '700',
  },
  customContentContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
