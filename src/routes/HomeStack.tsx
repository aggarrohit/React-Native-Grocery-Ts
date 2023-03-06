
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../screens/Cart';
import Wishlist from '../screens/Wishlist';
import Home from '../screens/Home';
import Products from '../screens/Products';
import MyOrders from '../screens/MyOrders';
import React from 'react';
import Profile from '../screens/Profile';
import SelectLocation from '../comps/SelectLocation';
import OrderDetails from '../screens/OrderDetails';
import ProductDetails from '../screens/ProductDetails';



function HomeStack () :JSX.Element{

  return(
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Group  screenOptions={{presentation:'transparentModal'}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Wishlist" component={Wishlist} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const Stack = createNativeStackNavigator();

export default HomeStack;

