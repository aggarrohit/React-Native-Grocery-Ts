import React,{memo} from 'react';
import {Text,StyleSheet, TouchableOpacity,Dimensions, TextInput, View, Image, Modal, Pressable, FlatList} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { blackColor, greyColor, lightGreyColor, lightVioletColor, mainBlueColor, redColor, whiteColor } from '../utils.js/colors';
import { useAppSelector } from '../store/store';

const { width,height } = Dimensions.get('window')

export const BackButton=({navigation})=>{
  return <TouchableOpacity style={{marginTop:6}} onPress={() => navigation.goBack()}>
  <AntDesign  name="left" size={18} color={whiteColor} />
</TouchableOpacity>
}

export const ProfileBackButton=({navigation})=>{
  return <TouchableOpacity style={{ position: 'absolute', top: 56, left: 16 }} onPress={() => navigation.goBack()}>
  <AntDesign name="left" size={18} color={whiteColor} />
</TouchableOpacity>
}

export const DrawerButton=({navigation})=>{
 return <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Ionicons name="menu" size={24} color={whiteColor} />
  </TouchableOpacity>
}

export const ButtonPlus=()=>{

      return(
       <Text style={styles.buttonPlus}>+</Text>
    );

}

export const ButtonMinus=()=>{

    return(
     <Text style={styles.buttonMinus}>-</Text>
  );
 
}

export  const CartButton=({navigation})=>{
  const cartqty = useAppSelector(state => state.cartItems.cartItems.length);
  return(
      <TouchableOpacity  style={styles.rightbutton} onPress={() =>  navigation.navigate('Cart')}>
      <Feather name="shopping-cart" size={24} color={whiteColor} style={styles.cart_img}/>
      <Text style={styles.cart_qty} >{cartqty}</Text>
  </TouchableOpacity>
      
  );
}

export const EnterMobile=({value,onChangeText})=>{
  return <>
          <Text style={{ marginBottom: 5, fontSize: 10 }}>Mobile Number</Text>
                <TextInput style={styles.fieldInput}
                  placeholder="Mobile No."
                  keyboardType="numeric"
                  maxLength={10}
                  onChangeText={onChangeText}
                />
          </>
}

export const EnterEmailAddress=({value,onChangeText})=>{
  return <>
          <Text style={{ marginBottom: 5, fontSize: 10 ,marginTop:15}}>Email</Text>
            <TextInput style={styles.fieldInput}
              placeholder="Email"
              keyboardType="email-address"
              maxLength={30}
              value={value}
              onChangeText={onChangeText}
            />
          </>
}

export const EnterFullName=({value,onChangeText})=>{
  return <>
          <Text style={{ marginBottom: 5, fontSize: 10 }}>Full Name</Text>
                <TextInput style={styles.fieldInput}
                  placeholder="Enter Full Name"
                  keyboardType="default"
                  maxLength={30}
                  value={value}
                  onChangeText={onChangeText}
                />
          </>
}

export const EnterAddress=({value,onChangeText})=>{
  return <>
          <Text style={{ marginBottom: 5, fontSize: 10, marginTop: 15 }}>Address</Text>
                <TextInput style={styles.addressInput}
                  placeholder="Enter Address"
                  multiline={true}
                  keyboardType="default"
                  maxLength={300}
                  value={value}
                  onChangeText={onChangeText}
                  numberOfLines={4}
                />
          </>
}

export const EnterOTP=({value,onChangeText})=>{
  return <>
          <Text style={{ marginBottom: 5, fontSize: 10 }}>Enter OTP</Text>
                <TextInput style={styles.fieldInput}
                  placeholder="OTP"
                  keyboardType="numeric"
                  maxLength={6}
                  onChangeText={onChangeText}
                />
          </>
}

export const InteractiveSearchBar=({CheckLength,SearchClicked,SearchCancelClicked})=>{
  return  <View style={styles.searchContrainer}>
            <TextInput placeholder="Search Products Here.." style={styles.searchBox} onChangeText={(txt) => CheckLength(txt)} />
            <TouchableOpacity onPress={() => SearchClicked()}>
              <FontAwesome style={styles.searchButton} name="search" size={14} color="grey" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => SearchCancelClicked()}>
              <MaterialIcons name="cancel" size={24} color="red" />
            </TouchableOpacity>
          </View>
}

export const PackRow=({ item, index ,SetSelectedPack})=> {
  var pack = item.packs[index]
  return (
    <TouchableOpacity onPress={() => SetSelectedPack(item,pack )}>
      {item.packoption == "pack_auto" && <Text style={[(pack == item.selected_pack || (item.selected_pack == undefined && index == 0)) ? styles.itemPriceSelected : styles.itemPrice]}> Rs.{item.price * (pack.qty / item.qty)} / {pack.qty} {item.unit} </Text>}
      {item.packoption == "pack_manual" && <Text style={[(pack == item.selected_pack || (item.selected_pack == undefined && index == 0)) ? styles.itemPriceSelected : styles.itemPrice]}> Rs.{pack.price} / {pack.qty} {pack.unit} </Text>}
    </TouchableOpacity>

  );
}

export const AddToWishlistButton=({AddToWishlist})=>{
  return <TouchableOpacity style={styles.wimage} onPress={() => AddToWishlist()}>
  <Image  style={styles.wimage1} source={require('../assets/add_to_wishlist.png')}/>
</TouchableOpacity>
}

export const AddedToWishlistButton=({AddToWishlist})=>{
  return <TouchableOpacity style={styles.wimage} onPress={() => AddToWishlist()}>
  <Image  style={styles.wimage1} source={require('../assets/added_to_wishlist.png')}/>
</TouchableOpacity>
}

export const AddItemButton=({AddItem})=>{
  return <TouchableOpacity style={styles.itemAdd} onPress={() => AddItem()}>
  <View style={{flexDirection:'row'}}>
    <Feather name="shopping-cart" size={16} color={'green'}/>
    <Text style={{color:'green',marginLeft:5}}> Add</Text>
  </View>
 
</TouchableOpacity>
}

const QtyEditButtonsMemo =({MinusItem,PlusItem,cartqty})=>{
  return <View style={styles.buttonsLayout}>
            
  <TouchableOpacity onPress={MinusItem}>
    <ButtonMinus />
  </TouchableOpacity>
  <Text style={styles.qtyStyle}>{cartqty}</Text>
  <TouchableOpacity onPress={PlusItem}> 
    <ButtonPlus />
  </TouchableOpacity>
 
</View>
}

export const QtyEditButtons = memo(QtyEditButtonsMemo);

export const BlueButton=({title,onClick})=>{
  return <TouchableOpacity style={styles.buttonStyle} onPress={onClick}>
  <Text style={{ color: whiteColor }}>{title}</Text>
</TouchableOpacity>
}

export const UnderlinedTextButton=({title,onClick,color})=>{
  return <TouchableOpacity style={styles.underlinedText} onPress={onClick}>
  <Text style={{ color: color, textDecorationLine: 'underline' }}>{title}</Text>
</TouchableOpacity>
}

export const PacksModal=({modalVisible,setModalVisible,currentItem,SetSelectedPack})=>{
  return <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
  }}
>
  <View style={styles.modalBackground}>
    <View style={styles.modalView}>
      <ListPacks currentItem={currentItem} SetSelectedPack={SetSelectedPack}/>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(false)}
      >
        <Text style={styles.textStyle}>Close X</Text>
      </Pressable>
    </View>
  </View>
</Modal>
}

const ListPacks=({currentItem,SetSelectedPack})=> {
  if (currentItem != undefined) {
    return <FlatList data={currentItem.packs}
              keyExtractor={(item, index) => 'key' + index}
              snapToAlignment="center"
              scrollEventThrottle={16}
              decelerationRate={"fast"}
              numColumns={1}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item,index }) => {
                return <PackRow item={currentItem} index={index}
                                SetSelectedPack={SetSelectedPack}/>
              }}
            />
  } else {
    return <View />
  }
}

const styles = StyleSheet.create({
  

  modalBackground: {
    justifyContent:'center',
    backgroundColor:'rgba(0, 0, 0,0.5)',
    height:height,
    width:width
  },
  modalView: {
    margin: 20,
    backgroundColor: whiteColor,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    opacity:1
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: lightVioletColor,
  },
  buttonClose: {
    position:'absolute',
    bottom:5,
    right:10,
    backgroundColor: redColor,
  },
  textStyle: {
    color: whiteColor,
    fontWeight: "bold",
    textAlign: "center"
  },
  underlinedText: {
    position: 'relative',
    width: width * 0.6,
    backgroundColor: whiteColor,
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonStyle: {
    position: 'relative',
    width: width * 0.6,
    backgroundColor: mainBlueColor,
    borderRadius: 5,
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  qtyStyle:{
    height:30,
    width:30,
    paddingTop:5,
    textAlign:'center'
  },
  buttonsLayout: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    margin:5
  },
  itemAdd: {
    width: 150,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    color: blackColor,
    fontSize: 16,
    height: 'auto',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 5,
    borderColor:'green',
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
  },
  wimage: {
    position:'absolute',
    right:5,
    top:5,
    width: 30,
    height: 30,
  },
  wimage1: {
    width: 30,
    height: 30,
  },
  itemPrice: {
    color: blackColor,
    fontSize: 12,
    textAlign: 'center',
    borderColor:greyColor,
    borderWidth:1,
    marginRight:10,
    borderRadius:5,
    paddingLeft:5,
    paddingRight:5,
    paddingVertical:5,
    marginVertical:5
  
  },
  itemPriceSelected: {
    color: whiteColor,
    backgroundColor:'green',
    fontSize: 12,
    textAlign: 'center',
    borderColor:greyColor,
    borderWidth:1,
    marginRight:10,
    borderRadius:5,
    paddingLeft:5,
    paddingRight:5,
    paddingVertical:5,
    marginVertical:5
  
  },
  searchContrainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    backgroundColor: mainBlueColor,
    alignItems: 'center'
  },
  searchBox: {
    width: width - 70,
    height: 40,
    paddingLeft: 10,
    paddingRight: 50,
    backgroundColor: whiteColor,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10
  },
  searchButton: {
    marginLeft: -35,
  },
  fieldInput: {
    height: 40,
    width: width * 0.6,
    borderColor: lightGreyColor,
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: whiteColor
  },
  cart_qty:{
    height:20,
    width:20,
    borderRadius:10,
    color:whiteColor,
    backgroundColor:"orange",
    fontSize:10,
    position:"absolute",
    right:0,
    top:0,
    paddingTop:2,
    textAlign:"center"
},
cart_img:{
    position:'absolute',
    left:0,
    bottom:15
},
  rightbutton:{
    height:'100%',
    width:40,
    position: 'absolute',
    right:10,
    top:10
  },
  
  addressInput: {
    height: 100,
    width: width * 0.6,
    borderColor: lightGreyColor,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    backgroundColor: whiteColor,
    textAlignVertical: 'top',

  },
    buttonPlus:{
      height:30,
      width:30,
      color:'green',
      backgroundColor:whiteColor,
      textAlign:'center',
      borderColor:'green',
      borderTopRightRadius:15,
      borderBottomRightRadius:15,
      borderWidth:1,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      paddingTop:3
    },
    
    buttonMinus:{
      height:30,
      width:30,
      color:greyColor,
      backgroundColor:whiteColor,
      textAlign:'center',
      borderColor:greyColor,
      borderTopLeftRadius:15,
      borderBottomLeftRadius:15,
      borderWidth:1,
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      paddingTop:3
    },
  });