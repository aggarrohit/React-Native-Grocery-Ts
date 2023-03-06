import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Text, Image, Dimensions,ScrollView} from 'react-native'
import { PackRow,AddToWishlistButton,AddItemButton, QtyEditButtons,AddedToWishlistButton } from '../comps/Elements';
import ProductsHeader from '../comps/ProductsHeader'
import { Base_url } from '../utils.js/constants';
import { whiteColor } from '../utils.js/colors';
import { LoadingView } from '../utils.js/Popups';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Cartitem } from '../interfaces/CartItem';
import { ReplaceCartItems } from '../store/features/CartItemSlice';
import { ReplaceWishlistItems } from '../store/features/WishlistSlice';

const { width } = Dimensions.get('window')

const ProductDetails = ({route,navigation}) => {
  
 
  const [cartqty, setCartqty] = useState(0)
  const [isInWishlist,setIsInWishlist] = useState(false)
  const [cartentries, setCartentries] = useState<Cartitem[]>([])
  const [wishlist, setWishlist] = useState<Cartitem[]>([])
  const redux_cart = useAppSelector(state => state.cartItems.cartItems);
  const redux_wishlist = useAppSelector(state => state.wishlistItems.wishlistItems);

  const [item,setItem] = useState(route.params.item);
 
const dispatch = useAppDispatch();

const checkWishlist = () => {

  setWishlist(redux_wishlist)
  var isTrue = false
  redux_wishlist.forEach(element => {
    if(element.itemid == item.itemid && element.packoption == "no_packs"){
      setIsInWishlist(true)
      isTrue = true
    }else 
    if(element.itemid == item.itemid && item.selected_pack == undefined){
      if(element.selected_pack == undefined && element.packs[0].packageid == item.packs[0].packageid){
        setIsInWishlist(true)
        isTrue = true
      }else if(element.selected_pack != undefined && element.selected_pack.packageid == item.packs[0].packageid){
        setIsInWishlist(true)
        isTrue = true
      }
     
    }else         
    if(element.itemid == item.itemid && item.selected_pack != undefined){
      if(element.selected_pack == undefined && element.packs[0].packageid == item.selected_pack.packageid){
        setIsInWishlist(true)
        isTrue = true
      }else if(element.selected_pack != undefined && element.selected_pack.packageid == item.selected_pack.packageid){
        setIsInWishlist(true)
        isTrue = true
      }
    }
   
})
if(!isTrue){
  setIsInWishlist(false)
}
}

const checkCartData = () => {

  setCartentries(redux_cart)
  
      var isTrue = false
      redux_cart.forEach(element => {
        if(element.itemid == item.itemid && element.packageid == 0){
          setCartqty(element.cartqty)
          isTrue = true
        }else 
        if(element.itemid == item.itemid && item.selected_pack == undefined && element.packageid == item.packs[0].packageid){
          setCartqty(element.cartqty)
          isTrue = true
        }else         
        if(element.itemid == item.itemid && item.selected_pack != undefined && element.packageid == item.selected_pack.packageid){
          setCartqty(element.cartqty)
          isTrue = true
        }
      });
      if(!isTrue){
        setCartqty(0)
      }          

};

useEffect(() => {
 
  if(item){
    checkCartData() 
    checkWishlist()
  }
  

},[item,redux_cart,redux_wishlist]);


const AddToWishlist = () => {
   dispatch(ReplaceWishlistItems({wishlistItems:[...wishlist,item]}))
};

const RemoveFromWishlist = () =>{
  
  var i=0;
  wishlist.forEach(element => {
    if(element.itemid == item.itemid  && item.packoption == "no_packs"){
    
        wishlist.splice(i,1)
   
        dispatch(ReplaceWishlistItems({wishlistItems:[...wishlist]}))
    }else 
    if(element.itemid == item.itemid && item.selected_pack == undefined){
      if(element.selected_pack == undefined &&  element.packs?(element.packs[0].packageid == item.packs[0].packageid):false){
        wishlist.splice(i,1)
     dispatch(ReplaceWishlistItems({wishlistItems:[...wishlist]}))
      }else if(element.selected_pack != undefined && element.selected_pack.packageid == item.packs[0].packageid){
        wishlist.splice(i,1)
     dispatch(ReplaceWishlistItems({wishlistItems:[...wishlist]}))
      }
     
    }else         
    if(element.itemid == item.itemid && item.selected_pack != undefined){
      if(element.selected_pack == undefined && element.packs?(element.packs[0].packageid == item.selected_pack.packageid):false){
        wishlist.splice(i,1)
    dispatch(ReplaceWishlistItems({wishlistItems:[...wishlist]}))
      }else if(element.selected_pack != undefined && element.selected_pack.packageid == item.selected_pack.packageid){
        wishlist.splice(i,1)
     dispatch(ReplaceWishlistItems({wishlistItems:[...wishlist]}))
      }
    }
    
    i++;
  });
  
};

const AddItem = () => {
  let qty = 0;
  let price = 0;
  let unit="";
  if(item.packoption == "no_packs"){
    item.packageid = 0;
    price = item.price
    qty = item.qty
    unit = item.unit;
  }else if(item.selected_pack == undefined){
    item.packageid = item.packs[0].packageid
    if(item.packoption == "pack_auto"){
      qty = item.packs[0].qty
      unit = item.unit;
      price = item.price*(item.packs[0].qty/item.qty)
    }else 
    if(item.packoption == "pack_manual"){
      qty = item.packs[0].qty
      unit = item.packs[0].unit;
      price = item.packs[0].price
    }
    
  }else if(item.selected_pack != undefined){
    item.packageid = item.selected_pack.packageid
    if(item.packoption == "pack_auto"){
      qty = item.selected_pack.qty
    unit = item.unit;
    price = item.price*(item.selected_pack.qty/item.qty)
    }else 
    if(item.packoption == "pack_manual"){
      qty = item.selected_pack.qty
      unit = item.selected_pack.unit;
      price = item.selected_pack.price
    }
  }

 

  let cartitem = {
    "itemid" : item.itemid,
    "productid" : item.itemid,
    "packageid" : item.packageid,
    "name" : item.name,
    "img":item.img,
    "qty":qty,
    "unit":unit,
    "price":price,
    "cartqty" : 1
  }
  dispatch(ReplaceCartItems({cartItems:[...cartentries,cartitem]}))
};

const PlusItem = () =>{ 
  var i=0;
  cartentries.forEach(element => {
    if(element.itemid == item.itemid && item.packoption == "no_packs"){
      element.cartqty++
      cartentries[i] = element
    }else
    if(element.itemid == item.itemid && item.selected_pack == undefined && element.packageid == item.packs[0].packageid){
      element.cartqty++
      cartentries[i] = element
    }else
    if(element.itemid == item.itemid && item.selected_pack == undefined && element.packageid == item.packs[0].packageid){
      element.cartqty++
      cartentries[i] = element
    }else
    if(element.itemid == item.itemid && item.selected_pack != undefined && element.packageid == item.selected_pack.packageid){
      element.cartqty++
      cartentries[i] = element
    }
    dispatch(ReplaceCartItems({cartItems:[...cartentries]}))
    i++;
  });
  
};

const MinusItem = () =>{
  
  var i=0;
  cartentries.forEach(element => {
    if(element.itemid == item.itemid  && item.packoption == "no_packs"){
      if(element.cartqty == 1){
        cartentries.splice(i,1)
      }else{
        element.cartqty--
        cartentries[i] = element
      }
      dispatch(ReplaceCartItems({cartItems:[...cartentries]}))
    }else
    if(element.itemid == item.itemid  && item.selected_pack == undefined && element.packageid == item.packs[0].packageid){
      if(element.cartqty == 1){
        cartentries.splice(i,1)
      }else{
        element.cartqty--
        cartentries[i] = element
      }
      dispatch(ReplaceCartItems({cartItems:[...cartentries]}))
    }else
    if(element.itemid == item.itemid  && item.selected_pack != undefined && element.packageid == item.selected_pack.packageid){
      if(element.cartqty == 1){
        cartentries.splice(i,1)
      }else{
        element.cartqty--
        cartentries[i] = element
      }
      
      dispatch(ReplaceCartItems({cartItems:[...cartentries]}))
    }
    i++;
  });
  
};

const SetSelectedPack=({ pack })=> {
  let itemnew = {...item}
  itemnew.selected_pack = pack;
  setItem(itemnew)
}

return (
  item? <View style={{flex:1,flexDirection:'column',backgroundColor:whiteColor}}>
    <ProductsHeader navigation={navigation} title="Product Details"/>
   <ScrollView style={{marginBottom:10}}>
   {item && <View >
      
     
      <Image style={styles.itemImage} source={{ uri: Base_url+"phps/Images/" + item.img }} />
      {isInWishlist && <AddedToWishlistButton AddToWishlist={RemoveFromWishlist}/>}
      {!isInWishlist && <AddToWishlistButton AddToWishlist={AddToWishlist}/>}
      <View style={styles.textView}>
        <Text style={styles.itemTitle}> {item.name}</Text>
        
        {item.packoption == "no_packs" &&  <Text style={styles.itemPriceNP}> Rs.{item.price} / {item.qty} {item.unit} </Text>}
        {item.packoption != "no_packs" &&   
          item.packs.map((pack,index)=>{
            return <PackRow item={item} index={index} key={index} SetSelectedPack={SetSelectedPack}/>
          })
        }

        {cartqty == 0 ? <AddItemButton AddItem={AddItem}/>
                      : <QtyEditButtons MinusItem={MinusItem} PlusItem={PlusItem} cartqty={cartqty}/>
        }

       
      </View>
    </View>}
   </ScrollView>
    </View> :<LoadingView/>
  )


}

const styles = StyleSheet.create({
 

  textView: {
    left: 5,
    textAlign: 'center'
  },
  itemImage: {
    width: width,
    height: width,
    backgroundColor:'#EBF0EB',
    resizeMode:'contain'
  },

  itemTitle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center'
  },
  itemPriceNP: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    marginVertical:5
  }
})

export default ProductDetails