import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthRoute from './auth_routes';
import HomeScreen from '../screens/HomeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import {getValueFromAsyncStorage} from '../utils/AsyncStorageHelpers';
import AppConstants from '../utils/AppConstants';

const AppRoutes = () => {
  const [isLogin, setIsLogin] = useState(false);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginStatus = await getValueFromAsyncStorage(
          AppConstants.ASYNC_STORAGE_KEYS.IS_LOGIN,
        );
        if (loginStatus) setIsLogin(loginStatus);
      } catch (error) {
        console.log('Error retrieving login status: ', error);
      }
    };

    checkLoginStatus();
  }, [isLogin]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={!isLogin ? 'AuthRoute' : 'Home'}>
        <Stack.Screen
          name="AuthRoute"
          component={AuthRoute}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Restaurant"
          component={RestaurantScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
