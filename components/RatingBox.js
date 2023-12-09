import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  setValueBasedOnHeight,
  setValueBasedOnWidth,
} from '../utils/deviceDimensions';
import Colors from '../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RatingBox = ({rating, ratingStyle}) => {
  const backgroundColor =
    Number(rating) >= 3
      ? Colors.primary.greenShade1
      : Number(rating) >= 2
      ? Colors.primary.redShade
      : Colors.primary.yellowShade1;
  return (
    <View
      style={[
        styles.ratingStyle,
        ratingStyle,
        {backgroundColor: backgroundColor},
      ]}>
      <Text style={styles.ratingText}>{rating}</Text>
      <FontAwesome name="star" color={Colors.singletons.white} />
    </View>
  );
};

export default RatingBox;

const styles = StyleSheet.create({
  ratingStyle: {
    paddingVertical: setValueBasedOnHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: setValueBasedOnWidth(40),
    flexDirection: 'row',
  },
  ratingText: {
    color: Colors.singletons.white,
    fontSize: setValueBasedOnHeight(10),
    marginRight: setValueBasedOnWidth(4),
    fontWeight: '700',
  },
});
