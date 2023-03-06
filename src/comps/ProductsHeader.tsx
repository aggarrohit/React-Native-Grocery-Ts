import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { mainBlueColor } from '../utils.js/colors';
import { BackButton, CartButton } from './Elements';
import useAuth, { AuthInterface } from '../hooks/useAuth';

export default function ProductsHeader({navigation,title}){

    const {isSearch,updateSearch} = useAuth() as AuthInterface

    const SearchButton=()=>{

        return(
            <TouchableOpacity  style={styles.searchbutton} onPress={() =>  updateSearch(true)}>
            <Feather name="search" size={24} color="white" style={styles.search_img}/>
        </TouchableOpacity>
            
        );
    }
    
   
    return(
        <View style={styles.fullHeader}>
           <View style={styles.container1}>
                <BackButton navigation={navigation}/>
                <Text style={styles.title}>{title}</Text>
                {title=="Products" && !isSearch && <SearchButton/>}
                {title!="My Orders" && title!="Subscription Orders" && title!="Profile" && title!="Order Details"
                 && title!="Subscribe Product" && <CartButton navigation={navigation}/>}
            </View>
          
        </View>
        
    );
}



const styles = StyleSheet.create({
   
    searchbutton:{
        height:'100%',
        width:40,
        position: 'absolute',
        right:50,
    },
    search_img:{
        position:'absolute',
        left:0,
        bottom:15
    },
    title:{
        color:'white',
        fontSize:20,
        fontWeight:"500",
        marginLeft:20,
    },

    fullHeader:{
        width:'100%',
        backgroundColor:mainBlueColor,
        height:50,
        paddingTop:'auto',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:'auto',
        flexDirection:'column',
        justifyContent:'center'
    },

    container1:{
        flex:1,
        flexDirection:'row',
        backgroundColor:mainBlueColor,
        alignItems:'center'
    },
    searchButton:{
        marginLeft:-35,
    }
  });