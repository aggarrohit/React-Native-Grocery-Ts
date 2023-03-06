import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { mainBlueColor } from '../utils.js/colors';
import useAuth, { AuthInterface } from '../hooks/useAuth';


export default function CustomDrawer(props) :JSX.Element{

    const {userData} = useAuth() as AuthInterface
    
    const name:string = userData?.name;

    const MyOrdersClicked=()=>{

        if(userData?.profile_status == "profile_saved"){
            props.navigation.navigate('MyOrders')
        }else{
            alert("Please Complete Profile")
        }
       
    }

   

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={styles.fullHeader}>
              {name == '' &&   <Text style={{ position: 'absolute', bottom: 10, color: 'white', left: 15, fontSize: 20 }}>Hello, Guest</Text>}
              {name != '' &&   <Text style={{ position: 'absolute', bottom: 10, color: 'white', left: 15, fontSize: 20 }}>Hello, {name}</Text>}
                <Image source={require("../assets/icon.png")}
                    style={{ position: 'absolute', bottom: 10, right: 15, height: 50, width: 50 }} />
            </View>
            <DrawerContentScrollView {...props}>

                <DrawerItem icon={({ color, size }) =>(
                    <Entypo name="home" size={24} color="black" />
                )}  label="Home"  onPress={()=>{props.navigation.navigate('home')}}/>


                <DrawerItem icon={({ color, size }) =>(
                   <Feather name="shopping-cart" size={24} color="black" />
                )}  label="Cart" onPress={()=>{props.navigation.navigate('Cart')}} />

                <DrawerItem icon={({ color, size }) =>(
                   <Feather name="heart" size={24} color="green" />
                )}  label="Wishlist" onPress={()=>{props.navigation.navigate('Wishlist')}} />

                <DrawerItem icon={({ color, size }) =>(
                   <Feather name="list" size={24} color="grey" />
                )}  label="My Orders" onPress={()=>MyOrdersClicked()} />

               

                <DrawerItem icon={({ color, size }) =>(
                   <Feather name="user" size={24} color="grey" />
                )}  label="Profile" onPress={()=>{props.navigation.navigate('Profile')}} />




            </DrawerContentScrollView>
        </View>

    );
}

const styles = StyleSheet.create({

    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 20
    },

    fullHeader: {

        width: '100%',
        backgroundColor: mainBlueColor,
        height: 80,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },

    container1: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: mainBlueColor,
        alignItems: 'center'
    },
    container2: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: mainBlueColor,
        alignItems: 'center',
        marginTop: 10
    },
    searchBox: {
        width: '100%',
        height: 30,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderRadius: 10

    },
    searchButton: {
        marginLeft: -35,
    }
});