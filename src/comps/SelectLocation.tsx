import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text ,TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Feather from 'react-native-vector-icons/Feather';
import { updateUserData } from '../store/actions/LoginActions';
import { LoadingView } from '../utils.js/Popups';
import useAuth, { AuthInterface } from '../hooks/useAuth';

const { width, height } = Dimensions.get('window')

export default function SelectLocation({ route, navigation }) {

  const [location, setLocation] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [newLocation, setNewLocation] = useState<any>(null);
  const {userData,updateUserData} = useAuth() as AuthInterface

  const user_data = userData;



  useEffect(() => {
    setLoading(true)
    Geolocation.getCurrentPosition(
      (location) => {
        setLoading(false)
        setLocation({
              latitude: location.coords.latitude, longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            });
            setNewLocation({
              latitude: location.coords.latitude, longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            });
      },
      (error) => {
        setLoading(false)
        console.error(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  }, []);

 
  const LocationSelected = () => {
    user_data.lat = newLocation?.latitude
    user_data.lng = newLocation.longitude
    updateUserData(user_data)

    navigation.goBack()
  }

  return (

    <View style={styles.container}>
      <TouchableOpacity style={styles.locationSelectedButton} onPress={() => LocationSelected()}>
        <Text style={{ color: '#fff', marginTop:'auto',marginBottom:'auto' }}>Location Selected</Text>
      </TouchableOpacity>
      
      <Feather name="map-pin" size={30} color="red" style={styles.marker} />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Feather name="chevron-left" style={{marginTop:'auto',marginBottom:'auto'}} size={24} color="white"  />
      </TouchableOpacity>
      {location != null && <MapView style={{ width: '100%', height: '100%', position: 'absolute' }}
        initialRegion={location}
        onRegionChange={setNewLocation}
      >
      </MapView>
      }
    {isLoading && <LoadingView/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    position: 'relative'
  },
  marker: {
    position: 'absolute',
    top: (height / 2) - 24,
    left: (width - 24) / 2,
    zIndex: 1
  },
  backButton:{
    backgroundColor: '#0659A4',
    height:40,
    width:40,
    zIndex:1,
    alignItems:'center',
    alignContent:'center',
    textAlignVertical:'center',
    textAlign:'center',
    position:'absolute',
    top:60,
    left:16,
    borderRadius:10,
    elevation:10,
    opacity:0.5
  },
  locationSelectedButton: {
    position: 'absolute',
    bottom: '5%',
    width: '80%',
    height:40,
    borderRadius:5,
    left: '10%',
    right: '10%',
    backgroundColor: '#0659A4',
    alignItems:'center',
    zIndex:1,
    elevation:5
  }
});
