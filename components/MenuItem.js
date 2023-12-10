import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HandleItemInCart from './HandleItemInCart';
import AddItemInCart from './AddItemInCart';
import RatingBox from './RatingBox';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../redux/cartSlice';
import Colors from '../utils/Colors';
import {
  setValueBasedOnHeight,
  setValueBasedOnWidth,
} from '../utils/deviceDimensions';
import {useNavigation, useIsFocused} from '@react-navigation/native';

const MenuItem = ({menuItem, isCart = false}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [itemQty, setItemQty] = useState(0);
  const [selected, setSelected] = useState(false);

  const cartItems = useSelector(state => state.cart.cart);

  useEffect(() => {
    const cartItem = cartItems.find(item => item?.id === menuItem?.id);
    if (cartItem) {
      setItemQty(cartItem.quantity);
      setSelected(true);
    } else {
      setItemQty(0);
      setSelected(false);
    }
  }, [navigation, isFocused]);

  const dispatch = useDispatch();

  const addItemToCart = item => {
    setSelected(true);
    if (itemQty === 0) {
      setItemQty(i => i + 1);
    }
    dispatch(addToCart(item));
  };

  const incrementItemQtyInCart = item => {
    setItemQty(i => i + 1);
    dispatch(incrementQuantity(item));
  };

  const decrementItemQtyInCart = item => {
    const totalQty = cartItems.reduce(
      (tq, item) => tq + Number(item?.quantity),
      0,
    );
    if (itemQty === 1) {
      dispatch(removeFromCart(item));
      setItemQty(0);
      setSelected(false);
      isCart && totalQty === 1 ? navigation.goBack() : null;
      return;
    }
    setItemQty(i => i - 1);
    dispatch(decrementQuantity(item));
  };
  return (
    <>
      {isCart ? (
        <View style={styles.cartMenuItem}>
          <View>
            <Text style={styles.cartMenuItemName}>{menuItem?.name}</Text>
            <Text
              style={styles.cartMenuItemPrice}>{`₹${menuItem?.price}`}</Text>
          </View>

          <View style={{alignItems: 'flex-end'}}>
            <HandleItemInCart
              onPressInc={() => incrementItemQtyInCart(menuItem)}
              onPressDec={() => decrementItemQtyInCart(menuItem)}
              itemQty={itemQty}
              btnStyle={styles.cartMenuItemBtnStyle}
              btnTextStyle={styles.cartMenuItemBtnTextStyle}
            />
            <Text style={styles.cartMenuItemPrice}>{`₹${
              Number(menuItem?.price) * Number(itemQty)
            }`}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.menuItem}>
          <View style={styles.menuItemDescBox}>
            <Text style={styles.menuItemName}>{menuItem?.name}</Text>
            <RatingBox rating={menuItem?.rating} />
            <Text style={styles.menuItemPrice}>{`₹${menuItem?.price}`}</Text>
            <Text style={styles.menuItemDesc}>{menuItem?.description}</Text>
          </View>

          <View>
            <Image source={{uri: menuItem?.image}} style={styles.menuItemImg} />
            {selected ? (
              <HandleItemInCart
                onPressInc={() => incrementItemQtyInCart(menuItem)}
                onPressDec={() => decrementItemQtyInCart(menuItem)}
                itemQty={itemQty}
              />
            ) : (
              <AddItemInCart onPress={() => addItemToCart(menuItem)} />
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
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

  // Cart menu item styles
  cartMenuItem: {
    flexDirection: 'row',
    paddingVertical: setValueBasedOnHeight(8),
    paddingHorizontal: setValueBasedOnWidth(10),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartMenuItemName: {
    fontSize: setValueBasedOnHeight(12),
    color: Colors.singletons.black,
    fontWeight: '700',
  },
  cartMenuItemPrice: {
    fontSize: setValueBasedOnHeight(10),
    color: Colors.singletons.black,
    fontWeight: '700',
    marginTop: setValueBasedOnHeight(8),
  },
  cartMenuItemBtnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: setValueBasedOnWidth(70),
    paddingVertical: setValueBasedOnHeight(5),
    backgroundColor: Colors.primary.pinkShade2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary.pinkShade1,
    position: 'relative',
    bottom: 0,
  },
  cartMenuItemBtnTextStyle: {
    color: Colors.primary.pinkShade1,
  },
});
