import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Header from '../comps/Header';
import Carousel from '../comps/Carousel'
import CategoryItem from '../comps/CategoryItem';
import { LoadingView } from '../utils.js/Popups';
import { getBannersCall, getCategoriesCall } from '../utils.js/network';
import { whiteColor } from '../utils.js/colors';

export default function Home({ route, navigation }) {

  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading,setLoading] = useState(false)

  const getBanners = async () => {
      const json = await getBannersCall();
     
      if(json.success){
        setBanners(json.server_response);
      }else{
        setLoading(false)  
      }
  }


  const getCategories = async () => {
   
      const json = await getCategoriesCall();
      if(json.success){
        setCategories(json.server_response);
      }else{
        setLoading(false)  
      }
   
  }

  useEffect(() => {
    (async()=>{
      setLoading(true)
      await getBanners();
      await getCategories();
      setLoading(false)
    })()
  }, []);




  return (

    <View style={styles.container}>
      <Header navigation={navigation} />
      
      <FlatList     data={categories}
                    keyExtractor={(item, index) => 'key' + index}
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={banners.length > 0 ? <Carousel data={banners} />:null}
                    renderItem={({ item }) => {
                        return <CategoryItem item={item}  navigation={navigation}/>
                    }}
                />
      {isLoading && <LoadingView/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: whiteColor,

  }
});
