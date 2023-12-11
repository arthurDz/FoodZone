import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import {
  setValueBasedOnHeight,
  setValueBasedOnWidth,
} from '../utils/deviceDimensions';
import RatingBox from './RatingBox';
import AntDesign from 'react-native-vector-icons/AntDesign';

const RestaurantCard = ({item, calculateDistance, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('Restaurant', {
          data: item,
          distance: calculateDistance(item?.latitude, item?.longitude),
        })
      }>
      <Image source={{uri: item?.featured_image}} style={styles.cardImg} />

      <View style={styles.restaurantDetails}>
        <View style={styles.restaurantNameCont}>
          <Text style={styles.restaurantName}>{item?.name}</Text>
          <RatingBox rating={item?.aggregate_rating} />
        </View>

        <Text
          style={
            styles.restaurantCuisineDetails
          }>{`${item?.cuisines} | ₹${item?.average_cost_for_two} for two`}</Text>

        <View style={styles.timeDistDetails}>
          <AntDesign
            name="clockcircle"
            color={Colors.primary.greenShade1}
            size={setValueBasedOnHeight(10)}
          />
          <Text style={styles.timeDistDetailsText}>{`${
            item?.time
          } | ${calculateDistance(item?.latitude, item?.longitude)} km`}</Text>
        </View>

        {item?.offer ? (
          <Text style={styles.offerText}>{item?.offer}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.singletons.white,
    borderRadius: 8,
    marginHorizontal: setValueBasedOnWidth(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    height: setValueBasedOnHeight(200),
    marginVertical: setValueBasedOnHeight(8),
  },
  restaurantDetails: {
    paddingHorizontal: setValueBasedOnWidth(10),
  },
  restaurantNameCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardImg: {
    width: '100%',
    height: '60%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    marginBottom: setValueBasedOnHeight(5),
  },
  restaurantName: {
    fontSize: setValueBasedOnHeight(16),
    fontWeight: '700',
    textTransform: 'capitalize',
    color: Colors.singletons.black,
  },
  ratingBox: {
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: setValueBasedOnWidth(5),
    paddingVertical: setValueBasedOnHeight(4),
  },
  restaurantCuisineDetails: {
    fontSize: setValueBasedOnHeight(10),
    color: Colors.singletons.gray,
    marginBottom: setValueBasedOnHeight(4),
  },
  timeDistDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: setValueBasedOnHeight(4),
  },
  timeDistDetailsText: {
    fontSize: setValueBasedOnHeight(10),
    color: Colors.singletons.gray,
    marginLeft: setValueBasedOnWidth(4),
  },
  offerText: {
    fontSize: setValueBasedOnHeight(10),
    color: Colors.primary.blueShade1,
  },
});
