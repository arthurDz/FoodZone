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
        .then(() => {
          console.log('User account created & signed in!');
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <Header title="" onLeftBtnClick={() => navigation.goBack()} />

          <Text style={styles.signupHeader}>Signup</Text>

          <View style={styles.signupBox}>
            <Image source={LoginImg} style={styles.signupImg} />
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
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary.bgPrimary,
  },
  signupHeader: {
    fontSize: setValueBasedOnHeight(30),
    fontWeight: '700',
    color: Colors.singletons.black,
  },
  signupBox: {
    alignItems: 'center',
    marginVertical: setValueBasedOnHeight(20),
    marginHorizontal: setValueBasedOnWidth(15),
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
});
