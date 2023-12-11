import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
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
import AppConstants from '../../utils/AppConstants';
import {setValueInAsyncStorage} from '../../utils/AsyncStorageHelpers';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [err, setErr] = useState('');
  const [hidden, setHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {
    if (vaildCreds()) {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(user?.email, user?.password)
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
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }
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
        <View style={styles.signupBox}>
          <View style={styles.signupBoxHeader}>
            <Text style={styles.appName}>Food Zone</Text>
            <Text style={styles.signupHeader}>Create a free account</Text>
          </View>

          <View style={styles.signupBoxInput}>
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
            <TouchableOpacity onPress={handleSignup} style={styles.sigupBtn}>
              <Text style={styles.sigupBtnTxt}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginBox}
              onPress={() => navigation.navigate('login')}>
              <Text>Already have a account?</Text>
              <Text style={styles.loginBoxText}>LogIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Spinner visible={isLoading} textContent={'Signing In...'} />
    </SafeAreaView>
  );
};

export default SignupScreen;

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
  signupHeader: {
    fontSize: setValueBasedOnHeight(14),
    fontWeight: '700',
    color: Colors.singletons.black,
  },
  signupBox: {
    flex: 1,
    marginVertical: setValueBasedOnHeight(20),
    justifyContent: 'space-between',
  },
  signupBoxHeader: {
    flex: 1,
    alignItems: 'center',
  },
  signupBoxInput: {
    flex: 2,
  },
  signupImg: {
    height: setValueBasedOnHeight(250),
    width: setValueBasedOnHeight(250),
    resizeMode: 'contain',
  },
  sigupBtn: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.primary.bgBtnPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: setValueBasedOnHeight(10),
    borderRadius: 8,
    marginTop: setValueBasedOnHeight(20),
  },
  sigupBtnTxt: {
    color: Colors.singletons.white,
    fontSize: setValueBasedOnHeight(16),
    fontWeight: '600',
  },
  err: {
    color: Colors.primary.redShade,
  },
  loginBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: setValueBasedOnHeight(10),
  },
  loginBoxText: {
    color: Colors.primary.bgBtnPrimary,
    fontSize: setValueBasedOnHeight(12),
    fontWeight: '600',
    marginLeft: setValueBasedOnWidth(5),
  },
});
