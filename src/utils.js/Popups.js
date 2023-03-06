
import React from 'react';
import { Dimensions,View,Text } from "react-native"
import { blackColor, whiteColor } from "./colors"

const { width,height } = Dimensions.get('window')

export const LoadingView=()=>{
    return <View style={{backgroundColor:'rgba(0,0,0,0.5)',width,height,justifyContent:'center',
                alignItems:'center',position:'absolute',zIndex:1111}}>
        <Text style={{color:blackColor,width:100,height:100,textAlign:'center',textAlignVertical:'center',
                    borderRadius:10,backgroundColor:whiteColor,zIndex:11111
                    ,fontFamily:'Poppins-Regular'}}>Loading...</Text>
    </View>
}