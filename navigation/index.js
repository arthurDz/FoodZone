import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthRoute from './auth_routes';
import HomeScreen from '../screens/HomeScreen';

const AppRoutes = () => {
  const [isLogin, setIsLogin] = useState(false);
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLogin ? 'AuthRoute' : 'Home'}>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
