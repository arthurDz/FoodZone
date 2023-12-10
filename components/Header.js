import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import {
  setValueBasedOnHeight,
  setValueBasedOnWidth,
} from '../utils/deviceDimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = ({
  onIconPress,
  title,
  icon,
  children,
  titleStyle,
  headerStyles,
}) => {
  return (
    <View style={[styles.header, {...headerStyles}]}>
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
    backgroundColor: Colors.singletons.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: setValueBasedOnWidth(10),
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: setValueBasedOnHeight(14),
    fontWeight: '700',
    color: Colors.singletons.black,
  },
  customContentContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
