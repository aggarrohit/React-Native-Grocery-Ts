import React, { useEffect } from 'react';
import HomeStack from './src/routes/HomeStack';
import { StyleSheet,StatusBar } from 'react-native'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawer from './src/routes/CustomDrawer';
import { AuthProvider } from './src/hooks/useAuth';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { mainBlueColor } from './src/utils.js/colors';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const Drawer = createDrawerNavigator();

export default function App():JSX.Element {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New Notification!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);


  return (
       /* Wrapped whole app inside AuthProvider to access centralized data in all elements */
    <>
     <StatusBar  backgroundColor={mainBlueColor} barStyle='light-content'/>
     <Provider store={store}>
      <AuthProvider>
       
        <NavigationContainer >
       
          <Drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props} />} 
            initialRouteName="Home"
            screenOptions={{
              headerShown: false
            }}>
            <Drawer.Screen name="InitialHome" component={HomeStack} />
          </Drawer.Navigator>
         
        </NavigationContainer>
        
      </AuthProvider>
    </Provider>
        </>
  );
}

const styles = StyleSheet.create({


})


