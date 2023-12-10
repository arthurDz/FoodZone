import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../utils/Colors';
import {
  setValueBasedOnHeight,
  setValueBasedOnWidth,
} from '../utils/deviceDimensions';
import RatingBox from '../components/RatingBox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuItem from '../components/MenuItem';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';

const RestaurantScreen = props => {
  const restaurantDetails = props.route.params?.data;
  const restDistance = props.route.params?.distance;
  const navigation = useNavigation();

  const cart = useSelector(state => state.cart.cart);

  const [collapsed, setCollapsed] = useState({});

  const toggleCollapse = category => {
    setCollapsed(prevCollapsed => ({
      ...prevCollapsed,
      [category]: !prevCollapsed[category],
    }));
  };

  const totalQty = cart.reduce((tq, item) => tq + Number(item?.quantity), 0);

  const renderCategory = ({item}) => (
    <View style={styles.categoryCont}>
      <TouchableOpacity
        onPress={() => toggleCollapse(item.category)}
        style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{item.category}</Text>
        <AntDesign
          name={collapsed[item.category] ? 'caretdown' : 'caretup'}
          size={setValueBasedOnHeight(12)}
          color={Colors.singletons.black}
        />
      </TouchableOpacity>
      {!collapsed[item.category] && (
        <FlatList
          style={{flexGrow: 1}}
          data={item.items}
          keyExtractor={menuItem => menuItem.id}
          renderItem={({item: menuItem}) => <MenuItem menuItem={menuItem} />}
        />
      )}
    </View>
  );

  return (
    <>
      <Header onIconPress={() => navigation.goBack()} />
      <ScrollView style={styles.container}>
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantName}>{restaurantDetails?.name}</Text>
          <Text style={styles.restaurantCuisines}>
            {restaurantDetails?.cuisines}
          </Text>
          <RatingBox rating={restaurantDetails?.aggregate_rating} />
          <View style={styles.restaurantTimeDist}>
            <AntDesign
              name="clockcircle"
              color={Colors.primary.greenShade1}
              size={setValueBasedOnHeight(10)}
            />
            <Text
              style={
                styles.restaurantTimeDistText
              }>{`${restaurantDetails?.time} | ${restDistance} km | ${restaurantDetails?.smalladress}`}</Text>
          </View>
        </View>

        {/* Menu */}
        <FlatList
          data={restaurantDetails?.menu}
          keyExtractor={category => category.id}
          renderItem={renderCategory}
          style={{flexGrow: 1}}
        />
      </ScrollView>

      {cart.length > 0 && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.goToCartBtn}
          onPress={() =>
            navigation.navigate('Cart', {name: restaurantDetails?.name})
          }>
          <View style={styles.goToCartBtnText}>
            <Text style={styles.goToCartBtnMainText}>
              {totalQty > 1
                ? `${totalQty} items added`
                : `${totalQty} item added`}
            </Text>
            <Ionicons
              name="arrow-forward-circle"
              color={Colors.singletons.white}
              size={setValueBasedOnHeight(14)}
            />
          </View>
          <Text style={styles.goToCartBtnSubText}>
            {totalQty >= 3
              ? `Yay! You have unlocked free delivery`
              : `Add ${3 - totalQty} more item to get free delivery`}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.primary.bgPrimary,
  },
  restaurantDetails: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: setValueBasedOnHeight(110),
    backgroundColor: Colors.singletons.white,
    width: '100%',
  },
  restaurantName: {
    fontSize: setValueBasedOnHeight(20),
    fontWeight: '700',
    textTransform: 'capitalize',
    color: Colors.singletons.black,
  },
  restaurantCuisines: {
    fontSize: setValueBasedOnHeight(10),
    textTransform: 'capitalize',
    color: Colors.singletons.gray,
  },
  categoryCont: {
    backgroundColor: Colors.singletons.white,
    marginVertical: setValueBasedOnHeight(4),
    paddingHorizontal: setValueBasedOnWidth(10),
    paddingVertical: setValueBasedOnHeight(10),
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryName: {
    fontWeight: '700',
    fontSize: setValueBasedOnHeight(16),
    maxWidth: '60%',
    color: Colors.singletons.black,
  },
  restaurantTimeDist: {
    borderRadius: 14,
    backgroundColor: Colors.singletons.white,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: setValueBasedOnWidth(8),
    paddingVertical: setValueBasedOnHeight(5),
  },
  restaurantTimeDistText: {
    color: Colors.singletons.black,
    fontSize: setValueBasedOnHeight(10),
    marginLeft: setValueBasedOnWidth(5),
  },
  goToCartBtn: {
    backgroundColor: Colors.primary.redShade1,
    alignItems: 'center',
    paddingHorizontal: setValueBasedOnWidth(12),
    paddingVertical: setValueBasedOnHeight(10),
  },
  goToCartBtnText: {flexDirection: 'row', alignItems: 'center'},
  goToCartBtnMainText: {
    textAlign: 'center',
    fontSize: setValueBasedOnHeight(14),
    color: Colors.singletons.white,
    fontWeight: '600',
    marginRight: setValueBasedOnWidth(5),
  },
  goToCartBtnSubText: {
    textAlign: 'center',
    fontSize: setValueBasedOnHeight(12),
    color: Colors.singletons.white,
    fontWeight: '400',
  },
});
