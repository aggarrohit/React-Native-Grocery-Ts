import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Cartitem } from '../interfaces/CartItem';
import { ReplaceCartItems } from '../store/features/CartItemSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Base_url } from '../utils.js/constants';
import { ButtonPlus,ButtonMinus } from './Elements';

const imgWidth = 75;

const CartItem = ({ item,edit }) => {

  const [cartqty, setCartqty] = useState(item.cartqty)
  const [cartentries, setCartentries] = useState<Cartitem[]|[]>([]);
  const redux_cart = useAppSelector(state => state.cartItems.cartItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCartentries(redux_cart)
  });

  const PlusItem = () => {
    var i = 0;
    cartentries.forEach(element => {
      if (element.itemid == item.itemid && element.packageid == item.packageid) {
        element.cartqty++
        cartentries[i] = element
        setCartqty(element.cartqty)
      } 
      dispatch(ReplaceCartItems({cartItems:[...cartentries]}))
      i++;
    });

  };

  const MinusItem = () => {

    var i = 0;
    cartentries.forEach(element => {
      if (element.itemid == item.itemid && element.packageid == item.packageid) {
        if (element.cartqty == 1) {
          cartentries.splice(i, 1)
        } else {
          element.cartqty--
          cartentries[i] = element
          setCartqty(element.cartqty)
        }
        dispatch(ReplaceCartItems({cartItems:[...cartentries]}))

      } 
     
      i++;
    });

  };

  const RemoveItem = () => {

    var i = 0;
    cartentries.forEach(element => {
      if (element.itemid == item.itemid && element.packageid == item.packageid) {
          cartentries.splice(i, 1)    
        dispatch(ReplaceCartItems({cartItems:[...cartentries]}))

      } 
     
      i++;
    });

  };


  return (
    <View style={styles.cartItemMain}>

      <View style={styles.oneRow}>
        <Image style={styles.image} source={{ uri: Base_url+"phps/Images/" + item.img }} />

        <View style={{flex:1, flexDirection:'column',marginLeft:5}}>
          <View style={{flex:1, flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={styles.itemTitle}> {item.name}</Text>
            {edit != "no" &&     <TouchableOpacity style={styles.deleteButton} onPress={() => RemoveItem()}>
              <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>}
          </View>
          <Text style={styles.itemQty}> ({item.qty} {item.unit}) </Text>
        
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={styles.itemPrice}> Rs.{item.price*item.cartqty} </Text>
           {edit != "no" &&  <View style={styles.buttonsLayout}>

           <TouchableOpacity onPress={()=>MinusItem()}>
              <ButtonMinus />
            </TouchableOpacity>
            <Text style={styles.qtyStyle}>{cartqty}</Text>
            <TouchableOpacity onPress={()=>PlusItem()}>
              <ButtonPlus />
            </TouchableOpacity>
            
            </View>
            }
          </View>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  deleteButton: {
    top: 10
  },
  cartItemMain: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    padding:10,
    backgroundColor:'white',
    borderRadius:5
  },
  oneRow: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonsLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemQty: {
    fontSize: 15,
    marginTop:10,
    color:'grey'
  },
  qtyStyle: {
    width: 30,
    textAlign: 'center'
  },

  image: {
    width: imgWidth,
    height: imgWidth,
    borderRadius: 10,
  },
  itemTitle: {
    color: 'black',
    fontSize: 16,
  },
  itemPrice: {
    color: 'black',
    fontSize: 16,
  },
})

export default CartItem