import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {
  setValueBasedOnHeight,
  setValueBasedOnWidth,
} from '../../utils/deviceDimensions';
import auth from '@react-native-firebase/auth';
import InputField from '../../components/InputField';
import {setValueInAsyncStorage} from '../../utils/AsyncStorageHelpers';
import AppConstants from '../../utils/AppConstants';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [err, setErr] = useState('');

  const handleSignin = () => {
    if (vaildCreds()) {
      auth()
        .signInWithEmailAndPassword(user?.email, user?.password)
        .then(res => {
          setValueInAsyncStorage(
            AppConstants.ASYNC_STORAGE_KEYS.IS_LOGIN,
            true,
          );
          setValueInAsyncStorage(
            AppConstants.ASYNC_STORAGE_KEYS.AUTH_TOKEN,
            res?.user?.uid,
          );
          setValueInAsyncStorage(
            AppConstants.ASYNC_STORAGE_KEYS.USER,
            res?.user,
          );
          navigation.reset({index: 0, routes: [{name: 'Home'}]});
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };

  const vaildCreds = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (
      user?.email === '' ||
      (emailRegex.test(user?.email) && user?.password === '')
    ) {
      setErr('Please input valid email and/or password');
      return false;
    } else {
      setErr('');
      return true;
    }
  };

  const handleInputField = (type, value) => {
    switch (type) {
      case 'email':
        setErr('');
        setUser({...user, [type]: value});
        break;
      case 'password':
        setErr('');
        setUser({...user, [type]: value});
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.loginBox}>
          <View style={styles.loginBoxHeader}>
            <Text style={styles.appName}>Food Zone</Text>
            <Text style={styles.loginHeader}>Login to your account</Text>
          </View>

          <View style={styles.loginBoxInput}>
            <InputField
              placeholder="Enter Email Id"
              value={user?.email}
              onChangeText={val => handleInputField('email', val)}
            />
            <InputField
              placeholder="Password"
              secureTextEntry
              value={user?.password}
              onChangeText={val => handleInputField('password', val)}
            />
            {err ? <Text style={styles.err}>{err}</Text> : null}

            <TouchableOpacity onPress={handleSignin} style={styles.loginBtn}>
              <Text style={styles.loginBtnTxt}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupBox}
              onPress={() => navigation.navigate('signup')}>
              <Text>Don't have a account?</Text>
              <Text style={styles.signupText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.bgPrimary,
    paddingTop: setValueBasedOnHeight(25),
    paddingHorizontal: setValueBasedOnWidth(18),
  },
  appName: {
    fontSize: setValueBasedOnHeight(20),
    color: Colors.primary.redShade,
  },
  loginHeader: {
    fontSize: setValueBasedOnHeight(14),
    fontWeight: '700',
    color: Colors.singletons.black,
  },
  loginBox: {
    flex: 1,
    marginVertical: setValueBasedOnHeight(20),
    justifyContent: 'space-between',
  },
  loginBoxHeader: {
    flex: 1,
    alignItems: 'center',
  },
  loginBoxInput: {
    flex: 2,
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
    alignSelf: 'center',
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
