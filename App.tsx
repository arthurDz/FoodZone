/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import LoginScreen from './screens/AuthScreens/LoginScreen';
import AppRoutes from './navigation';
import { Appearance } from 'react-native';
import Colors from './utils/Colors';
import { Provider } from 'react-redux';
import store from './redux/store';
// import Firebase from '@react-native-firebase/app';

// Set the app appearance to "light"
Appearance.setColorScheme('light');


function App(): JSX.Element {

  return (
    <Provider store={store}>
    <SafeAreaView style={styles.container}>
      <AppRoutes />
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.bgPrimary
  }
});

export default App;
