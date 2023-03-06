import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import useAuth, { AuthInterface } from '../hooks/useAuth';
import { mainBlueColor } from '../utils.js/colors';
import { CartButton, DrawerButton } from './Elements';


export default function Header({ navigation }) {

    const {updateSearch} = useAuth() as AuthInterface
    

      const NavigateToSearch=()=>{
        updateSearch(true)
        navigation.navigate('Products', { catid: 0, task: "search" })
      }

    

    return (
      <View style={styles.fullHeader}>
          <StatusBar backgroundColor={mainBlueColor}/>
            <>
                <View style={styles.container1}>
                    <DrawerButton navigation={navigation}/>
                    <Text style={styles.title}>Grocery Demo</Text>
                    <CartButton  navigation={navigation}/>
                </View>
                <View style={styles.container2}>
                    <TouchableOpacity onPress={NavigateToSearch}
                        style={{width:'100%',height:'auto'}}>
                        <Text style={styles.searchBox}>Search Products Here..</Text>
                    </TouchableOpacity>
                </View>
            </>
            
        </View>
    
    );
}

const styles = StyleSheet.create({
   
    
   
    title: {
        color: 'white',
        fontSize: 20,
        marginLeft: 20,
    },

    fullHeader: {

        width: '100%',
        backgroundColor: mainBlueColor,
        height: 'auto',
        paddingTop: 10,
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
        borderRadius: 10,
        color:'grey',
        paddingTop:3
    },
  
});