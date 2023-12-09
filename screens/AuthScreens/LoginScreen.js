import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../utils/Colors';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import LoginImg from '../../assets/images/loginImg.png';
import {
  setValueBasedOnHeight,
  setValueBasedOnWidth,
} from '../../utils/deviceDimensions';
import auth from '@react-native-firebase/auth';
import InputField from '../../components/InputField';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleSignin = () => {};

  const handleInputField = type => {
    console.log(type);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView style={styles.container}>
        <View>
          {/* <Header title="Login" onLeftBtnClick={navigation.goBack()} /> */}

          <Text style={styles.loginHeader}>Login</Text>

          <View style={styles.loginBox}>
            <Image source={LoginImg} style={styles.loginImg} />
            <InputField
              placeholder="Enter Email Id"
              value={user?.email}
              onChangeText={() => handleInputField('email')}
            />
            <InputField
              placeholder="Password"
              secureTextEntry
              value={user?.password}
              onChangeText={() => handleInputField('password')}
            />

            <TouchableOpacity onPress={handleSignin} style={styles.loginBtn}>
              <Text style={styles.loginBtnTxt}>Login</Text>
            </TouchableOpacity>
            <View style={styles.signupBox}>
              <Text>Don't have a account?</Text>
              <Text
                onPress={() => navigation.navigate('signup')}
                style={styles.signupText}>
                Signup
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary.bgPrimary,
    paddingTop: setValueBasedOnHeight(25),
    paddingHorizontal: setValueBasedOnWidth(18),
  },
  loginHeader: {
    fontSize: setValueBasedOnHeight(20),
    fontWeight: '700',
    color: Colors.singletons.black,
  },
  loginBox: {
    alignItems: 'center',
    marginVertical: setValueBasedOnHeight(20),
  },
  loginImg: {
    height: setValueBasedOnHeight(250),
    width: setValueBasedOnHeight(250),
    resizeMode: 'contain',
  },
  loginBtn: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.primary.bgBtnPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: setValueBasedOnHeight(10),
    borderRadius: 8,
  },
  loginBtnTxt: {
    color: Colors.singletons.white,
    fontSize: setValueBasedOnHeight(16),
    fontWeight: '600',
  },
  signupBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: setValueBasedOnHeight(10),
  },
  signupText: {
    color: Colors.primary.bgBtnPrimary,
    fontSize: setValueBasedOnHeight(12),
    fontWeight: '600',
    marginLeft: setValueBasedOnWidth(5),
  },
  orBox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  orText: {
    textTransform: 'uppercase',
    marginHorizontal: setValueBasedOnWidth(10),
    fontSize: 16,
    fontWeight: '700',
  },
});
