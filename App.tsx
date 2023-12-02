/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import LoginScreen from './screens/AuthScreens/LoginScreen';
import AppRoutes from './navigation';
import { Appearance } from 'react-native';
import Colors from './utils/Colors';
// import Firebase from '@react-native-firebase/app';

// Set the app appearance to "light"
Appearance.setColorScheme('light');

// const firebaseConfig = {
//   apiKey: 'AIzaSyBPGoNmpOVi-DDV9tC9fMpNriGww77nR8k',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// Firebase.initializeApp(firebaseConfig);


function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
      <AppRoutes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.bgPrimary
  }
});

export default App;
