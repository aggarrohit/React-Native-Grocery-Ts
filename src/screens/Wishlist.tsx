import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, FlatList } from 'react-native'
import ProductItem from '../comps/ProductItem'
import ProductsHeader from '../comps/ProductsHeader'
import { whiteColor } from '../utils.js/colors'
import { PacksModal } from '../comps/Elements'
import { useAppSelector } from '../store/store'
import { Cartitem } from '../interfaces/CartItem'


const { width } = Dimensions.get('window')


export default function Wishlist({route,navigation}) {

  const [products, setProducts] = useState<Cartitem[]>([])
  const [currentItem, setCurrentItem] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const redux_wishlist = useAppSelector(state => state.wishlistItems.wishlistItems);



  useEffect(() => {


    if ((products == undefined || products.length == 0)) {
     setProducts(redux_wishlist)
    }
  
  })

  return (
    <View style={styles.centeredView}>



      <View style={styles.centeredView}>
       
      <PacksModal modalVisible={modalVisible} 
                    setModalVisible={setModalVisible} 
                    currentItem={currentItem} 
                    SetSelectedPack={SetSelectedPack}
                    />
    

        <ProductsHeader navigation={navigation} title="Wishlist"/>

        <FlatList data={products}
          keyExtractor={(item, index) => 'key' + index}
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <ProductItem item={item} setModalVisible={setModalVisible}  width={width}
              setCurrentItem={setCurrentItem} navigation={navigation} />
          }}
        />


      </View>
    </View>

  )


  function SetSelectedPack({ item, pack }) {
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
