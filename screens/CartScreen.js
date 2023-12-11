import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Colors from '../utils/Colors';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  setValueBasedOnHeight,
  setValueBasedOnWidth,
} from '../utils/deviceDimensions';
import {useNavigation} from '@react-navigation/native';
import MenuItem from '../components/MenuItem';

const CartScreen = props => {
  const navigation = useNavigation();

  const cartItems = useSelector(state => state.cart.cart);
  const totalPrice = cartItems
    ?.map(item => item?.quantity * Number(item?.price))
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      <Header
        title={props.route.params.name}
        onIconPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        {/* Delivery time */}
        <View
          style={[
            styles.blockStyle,
            {flexDirection: 'row', alignItems: 'center'},
          ]}>
          <AntDesign
            name="clockcircle"
            color={Colors.primary.greenShade1}
            size={setValueBasedOnHeight(10)}
          />
          <Text
            style={{
              fontSize: setValueBasedOnHeight(12),
              color: Colors.singletons.black,
              marginLeft: setValueBasedOnWidth(5),
            }}>
            Delivery in <Text style={{fontWeight: '700'}}>30-35 mins</Text>
          </Text>
        </View>

        {/* Cart Items */}
        <Text style={styles.heading}>ITEM(S) ADDED</Text>
        <View style={styles.blockStyle}>
          {cartItems.map(item => (
            <MenuItem isCart={true} menuItem={item} key={item?.id} />
          ))}
        </View>

        {/* Billing details */}
        <Text style={styles.heading}>Billing details</Text>
        <View style={styles.blockStyle}>
          <View style={styles.billRow}>
            <Text style={styles.billRowLeftTxt}>Item Total</Text>
            <Text style={styles.billRowRightTxt}>{`₹ ${totalPrice}`}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billRowLeftTxt}>
              GST and restaurant charges
            </Text>
            <Text style={styles.billRowRightTxt}>{`₹ 50`}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billRowLeftTxt}>Delivery partner fee</Text>
            <Text style={styles.billRowRightTxt}>{`₹ 10`}</Text>
          </View>
          <View
            style={[
              styles.billRow,
              {
                borderTopWidth: 1,
                borderTopColor: Colors.singletons.gray,
                borderStyle: 'dashed',
                paddingTop: setValueBasedOnHeight(5),
              },
            ]}>
            <Text
              style={[
                styles.billRowLeftTxt,
                {fontSize: setValueBasedOnHeight(14)},
              ]}>
              Grand Total
            </Text>
            <Text
              style={[
                styles.billRowRightTxt,
                {fontSize: setValueBasedOnHeight(14)},
              ]}>{`₹ ${totalPrice + 50 + 10}`}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Payment */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.payUsing}>PAY USING</Text>
          <Text style={styles.paymentMethod}>Cash on Delivery</Text>
        </View>

        <TouchableOpacity style={styles.payBtn} activeOpacity={0.7}>
          <View>
            <Text style={styles.totalText}>TOTAL</Text>
            <Text style={styles.totalPrice}>{`₹ ${totalPrice + 50 + 10}`}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.placeOrder}>Place Order</Text>
            <AntDesign
              name="caretright"
              color={Colors.singletons.white}
              size={setValueBasedOnHeight(12)}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.primary.bgPrimary,
  },
  blockStyle: {
    backgroundColor: Colors.singletons.white,
    borderRadius: 8,
    paddingHorizontal: setValueBasedOnWidth(10),
    paddingVertical: setValueBasedOnHeight(5),
    marginHorizontal: setValueBasedOnWidth(10),
    marginVertical: setValueBasedOnHeight(10),
  },
  heading: {
    color: Colors.singletons.gray,
    letterSpacing: 3,
    fontSize: setValueBasedOnHeight(12),
    textAlign: 'center',
    marginVertical: setValueBasedOnHeight(5),
    textTransform: 'uppercase',
  },
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: setValueBasedOnHeight(8),
  },
  billRowLeftTxt: {
    fontSize: setValueBasedOnHeight(11),
    color: Colors.singletons.black,
  },
  billRowRightTxt: {
    fontSize: setValueBasedOnHeight(11),
    color: Colors.singletons.black,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: Colors.singletons.white,
    borderTopColor: Colors.singletons.gray,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: setValueBasedOnWidth(8),
    paddingVertical: setValueBasedOnHeight(8),
  },
  payBtn: {
    backgroundColor: Colors.primary.redShade1,
    borderRadius: 8,
    width: setValueBasedOnWidth(200),
    paddingVertical: setValueBasedOnHeight(8),
    paddingHorizontal: setValueBasedOnWidth(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  payUsing: {
    fontSize: setValueBasedOnHeight(10),
    color: Colors.singletons.gray,
  },
  paymentMethod: {
    fontSize: setValueBasedOnHeight(10),
    color: Colors.singletons.black,
    fontWeight: '600',
  },
  totalText: {
    fontSize: setValueBasedOnHeight(10),
    color: Colors.singletons.white,
  },
  totalPrice: {
    fontSize: setValueBasedOnHeight(12),
    color: Colors.singletons.white,
    fontWeight: '600',
  },
  placeOrder: {
    fontSize: setValueBasedOnHeight(14),
    color: Colors.singletons.white,
    fontWeight: '600',
  },
});
