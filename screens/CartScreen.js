import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CartScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Items */}
      <View></View>

      {/* Delivery details */}
      <View></View>

      {/* Bill details */}
      <View></View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
