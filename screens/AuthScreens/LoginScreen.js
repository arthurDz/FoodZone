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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [err, setErr] = useState('');
  const [hidden, setHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = () => {
    if (vaildCreds()) {
      setIsLoading(true);
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
          setIsLoading(false);
          navigation.reset({index: 0, routes: [{name: 'Home'}]});
        })
        .catch(error => {
          Alert.alert('Provided credentials are invalid!');
          setIsLoading(false);
          console.error(error);
        });
    }
  };

  const vaildCreds = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (
      user?.email !== '' &&
      emailRegex.test(user?.email) &&
      user?.password !== ''
    ) {
      setErr('');
      return true;
    } else {
      setErr('Please input valid email and/or password');
      return false;
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
              leftIcon={
                <AntDesign
                  name="mail"
                  size={setValueBasedOnHeight(12)}
                  color={Colors.singletons.gray}
                />
              }
            />
            <InputField
              placeholder="Password"
              secureTextEntry={hidden}
              value={user?.password}
              onChangeText={val => handleInputField('password', val)}
              leftIcon={
                <AntDesign
                  name="lock1"
                  size={setValueBasedOnHeight(12)}
                  color={Colors.singletons.gray}
                />
              }
              rightComponent={
                <TouchableOpacity
                  onPress={() => setHidden(!hidden)}
                  activeOpacity={0.5}>
                  <Feather
                    name={hidden ? 'eye' : 'eye-off'}
                    size={setValueBasedOnHeight(12)}
                    color={Colors.singletons.gray}
                  />
                </TouchableOpacity>
              }
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
      <Spinner visible={isLoading} textContent={'Signing In...'} />
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
    marginTop: setValueBasedOnHeight(20),
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
  err: {
    color: Colors.primary.redShade,
  },
});
