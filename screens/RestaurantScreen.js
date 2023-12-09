import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../utils/Colors';
import {
  setValueBasedOnHeight,
  setValueBasedOnWidth,
} from '../utils/deviceDimensions';
import AddItemInCart from '../components/AddItemInCart';
import HandleItemInCart from '../components/HandleItemInCart';
import RatingBox from '../components/RatingBox';
import AntDesign from 'react-native-vector-icons/AntDesign';

const RestaurantScreen = props => {
  const restaurantDetails = props.route.params?.data;
  const restDistance = props.route.params?.distance;

  const [collapsed, setCollapsed] = useState({});

  const isItemInCart = itemId => {
    return true;
  };

  const toggleCollapse = category => {
    setCollapsed(prevCollapsed => ({
      ...prevCollapsed,
      [category]: !prevCollapsed[category],
    }));
  };

  const renderMenuItem = menuItem => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemDescBox}>
        <Text style={styles.menuItemName}>{menuItem?.name}</Text>
        <RatingBox rating={menuItem?.rating} />
        <Text style={styles.menuItemPrice}>{`₹${menuItem?.price}`}</Text>
        <Text style={styles.menuItemDesc}>{menuItem?.description}</Text>
      </View>

      <View>
        <Image source={{uri: menuItem?.image}} style={styles.menuItemImg} />
        {!isItemInCart(menuItem?.id) ? (
          <AddItemInCart onPress={() => console.log('AddItemInCart pressed')} />
        ) : (
          <HandleItemInCart
            onPressDec={() => console.log('dec')}
            onPressInc={() => console.log('inc')}
          />
        )}
      </View>
    </View>
  );

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
          renderItem={({item: menuItem}) => renderMenuItem(menuItem)}
        />
      )}
    </View>
  );

  return (
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
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.primary.bgPrimary,
  },
  restaurantDetails: {
    marginVertical: setValueBasedOnHeight(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: setValueBasedOnHeight(100),
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
    fontSize: setValueBasedOnHeight(14),
    maxWidth: '60%',
    color: Colors.singletons.black,
  },
  menuItem: {
    borderBottomColor: Colors.singletons.gray,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    paddingTop: setValueBasedOnHeight(14),
    paddingBottom: setValueBasedOnHeight(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemDescBox: {
    flex: 0.7,
  },
  menuItemImg: {
    position: 'relative',
    borderRadius: 8,
    width: 140,
    height: 140,
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
  menuItemName: {
    fontSize: setValueBasedOnHeight(14),
    color: Colors.singletons.black,
    fontWeight: '700',
    marginBottom: setValueBasedOnHeight(8),
  },
  menuItemDesc: {
    fontSize: setValueBasedOnHeight(10),
    color: Colors.singletons.gray,
  },
  menuItemPrice: {
    fontSize: setValueBasedOnHeight(12),
    color: Colors.singletons.black,
    fontWeight: '700',
    marginTop: setValueBasedOnHeight(8),
  },
});
