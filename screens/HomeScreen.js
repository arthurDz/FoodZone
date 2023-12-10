import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import hotels from '../utils/data/hotels';
import Colors from '../utils/Colors';
import RestaurantCard from '../components/RestaurantCard';
import {setValueBasedOnHeight} from '../utils/deviceDimensions';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();

  const calculateDistance = (lat2, lon2) => {
    const lat1 = '12.9816';
    const lon1 = '77.5956';

    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    // dLat and dLon are differences in lat and long of 2 points
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Filters</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              console.log('User signed out!');
              AsyncStorage.clear();
              navigation.reset({index: 0, routes: [{name: 'AuthRoute'}]});
            });
        }}>
        <Text>LOG OUT!!!</Text>
      </TouchableOpacity>

      <Text style={styles.allRestaurantsTxt}>All Restaurants</Text>

      {/* List of all Restaurants */}
      <FlatList
        data={hotels}
        renderItem={({item}) => (
          <RestaurantCard
            item={item}
            calculateDistance={calculateDistance}
            navigation={navigation}
          />
        )}
        keyExtractor={(item, index) => index + item?.id}
        style={styles.restaurantList}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.bgPrimary,
  },
  allRestaurantsTxt: {
    textTransform: 'uppercase',
    fontSize: setValueBasedOnHeight(12),
    color: Colors.singletons.gray,
    alignSelf: 'center',
  },
  restaurantList: {
    flexGrow: 1,
  },
});
