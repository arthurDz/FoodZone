import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthRoute from './auth_routes';
import HomeScreen from '../screens/HomeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import {getValueFromAsyncStorage} from '../utils/AsyncStorageHelpers';
import AppConstants from '../utils/AppConstants';
import {Text} from 'react-native';
import CartScreen from '../screens/CartScreen';

const AppRoutes = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    };

    checkLoginStatus();
  }, [isLoading]);

  if (isLoading) {
    return <Text>isLoading</Text>;
  }

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
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
