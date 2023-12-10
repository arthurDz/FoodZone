import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
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
import AppConstants from '../../utils/AppConstants';
import {setValueInAsyncStorage} from '../../utils/AsyncStorageHelpers';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [err, setErr] = useState('');

  const handleSignup = () => {
    if (vaildCreds()) {
      auth()
        .createUserWithEmailAndPassword(user?.email, user?.password)
        .then(res => {
          console.log('User account created & signed in!', res);
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
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
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
            />
            <InputField
              placeholder="Password"
              secureTextEntry
              value={user?.password}
              onChangeText={val => handleInputField('password', val)}
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
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.bgPrimary,
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
    paddingHorizontal: setValueBasedOnWidth(18),
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
    marginTop: setValueBasedOnHeight(15),
  },
  sigupBtnTxt: {
    color: Colors.singletons.white,
    fontSize: setValueBasedOnHeight(16),
    fontWeight: '600',
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
