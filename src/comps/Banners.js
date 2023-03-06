import React, { useEffect, useState } from 'react';
import {Text,View,FlatList} from 'react-native';
import { getBannersCall } from '../utils.js/network';
import { LoadingView } from '../utils.js/Popups';

export default function Banners(){

    const [banners, setBanners] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getBanners = async () => {
        setLoading(true)
         const json = await getBannersCall();
         setLoading(false)
         setBanners(json.server_response);
       
     }
   
     useEffect(() => {
        getBanners();
     }, []);

    return(
        <View>
            <FlatList
          data={banners}
          keyExtractor={({ bannerid }, index) => bannerid}
          renderItem={({ item }) => (
            <Text>{item.seq}, {item.img}</Text>
          )}
        />
        {isLoading && <LoadingView/>}
        </View>
       
        
    );

   
}
