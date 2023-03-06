import React from 'react';
import {Text,View,StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { mainBlueColor } from '../utils.js/colors';

export default function CartHeader({navigation}){
    return(
        <View style={styles.fullHeader}>
            <View style={styles.container1}>
                <TouchableOpacity style={{marginTop:2}} onPress={() => navigation.goBack()}>
                    <AntDesign  name="left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Cart</Text>
                {false && <CartButton navigation={navigation}/>}
            </View>
           
        </View>
        
    );
}

const CartButton=({navigation})=>{
    return(
        <TouchableOpacity  style={styles.rightbutton} onPress={() =>  navigation.navigate('Cart')}>
        <Feather name="shopping-cart" size={24} color="white" />
    </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    rightbutton:{
        position: 'absolute',
        right:10
    },
    title:{
        color:'white',
        fontSize:20,
        fontWeight:"700",
        marginLeft:20
    },

    fullHeader:{
      
        width:'100%',
        backgroundColor:mainBlueColor,
        height:50,
        paddingTop:10,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10
    },

    container1:{
        flex:1,
        flexDirection:'row',
        backgroundColor:mainBlueColor,
    },
    container2:{
        width:'100%',
        flexDirection:'row',
        backgroundColor:mainBlueColor,
        alignItems:'center',
        marginTop:10
    },
    searchBox:{
        width:'100%',
        height:30,
        paddingLeft:10,
        backgroundColor:'white',
        borderRadius:10
        
    },
    searchButton:{
        marginLeft:-35,
    }
  });