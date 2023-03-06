import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, FlatList } from 'react-native'
import ProductItem from '../comps/ProductItem'
import ProductsHeader from '../comps/ProductsHeader'
import { getItemsCall } from '../utils.js/network';
import { LoadingView } from '../utils.js/Popups';
import { InteractiveSearchBar, PacksModal } from '../comps/Elements';
import { whiteColor } from '../utils.js/colors';
import useAuth, { AuthInterface } from '../hooks/useAuth';

const { width } = Dimensions.get('window')


export default function Products({route,navigation}) {

  const {updateSearch,isSearch} = useAuth() as AuthInterface

   const [products, setProducts] = useState<any>([])
  const [currentItem, setCurrentItem] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const { catid, task } = route.params;
  const [searchTxt, setSearchTxt] = useState("");
  const [isLoading,setLoading] = useState(false)

  

  const getProducts = async () => {
   
       const body= {
          task: task,
          catid: catid,
          name: searchTxt
        }
        setLoading(true)
      const json = await getItemsCall(body);
      setLoading(false)
      if(json.success){
        let p1 = {...json}
        let arr:any[] = []
        for (let index = 0; index < Object.keys(p1).length; index++) {
          if(p1[index]){
            arr.push(p1[index])
          }
          
        }

        setProducts(arr);
      }
     
   
  }

  const SearchClicked=(txt)=> {
    setSearchTxt(txt)
    getProducts()
  }

  const  CheckLength=(txt)=> {
    if (txt.length >= 3) {
      setSearchTxt(txt)
      getProducts()
    }
  }


  useEffect(() => {

    if ((products == undefined || products.length == 0) && task != "search") {
      getProducts();
    }
  
  },[])

  function SearchCancelClicked(){
    if(catid == undefined){
      navigation.goBack()
    }else{
      updateSearch(false)
    }
  }

  return (

      <View style={styles.centeredView}>
       
    
        <PacksModal modalVisible={modalVisible} 
                    setModalVisible={setModalVisible} 
                    currentItem={currentItem} 
                    SetSelectedPack={SetSelectedPack}
                    />
       

        <ProductsHeader navigation={navigation} title="Products"/>

        {isSearch && <InteractiveSearchBar CheckLength={CheckLength} SearchClicked={SearchClicked} SearchCancelClicked={SearchCancelClicked}/>}

        <FlatList data={products}
          keyExtractor={(item, index) => 'key' + index}
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <ProductItem item={item} setModalVisible={setModalVisible} width={width}
              setCurrentItem={setCurrentItem} navigation={navigation} />
          }}
        />

          {isLoading && <LoadingView/>}
      </View>
  

  )


  function SetSelectedPack(item, pack) {
    item.selected_pack = pack;
    setModalVisible(false)
  }

}



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent:'center',
    backgroundColor:whiteColor
  }
})
