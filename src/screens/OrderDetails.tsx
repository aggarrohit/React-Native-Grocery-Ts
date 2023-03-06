import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity,Image,ScrollView } from 'react-native'
import CartItem from '../comps/CartItem';
import ProductsHeader from '../comps/ProductsHeader'
import { whiteColor } from '../utils.js/colors';
import { getOrderDetailsCall } from '../utils.js/network';
import { LoadingView } from '../utils.js/Popups';
import { ConvertTimeSlot, GetFormattedDate, RemoveSuccessParameter } from '../utils.js/shortFunctions';


const { width,height } = Dimensions.get('window')


export default function OrderDetails({ route,navigation }) {

  const [cartentries, setCartentries] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const orderData = route.params
  const [deliverytime,setDeliveryTime] = useState("")  
  const [isLoading,setLoading] = useState(false)

 

  const GetOrderDetails  = async () => {
   
      var body = {
        orderid: orderData.orderid,
      }
      setLoading(true)
      let json = await getOrderDetailsCall(body);
      setLoading(false)
      if(json.success){
        
          json = RemoveSuccessParameter(json)

          setCartentries(json)

          var total=0;
          json.forEach(item => {
            total=total+(item.cartqty*item.price)
          });
       
          setSubTotal(total)
      }
   
    
 
 }




  useEffect(() => {

    if(orderData.ordertype == "now"){
      setDeliveryTime("ASAP")
    }else{
      setDeliveryTime(ConvertTimeSlot(orderData.deliverytimeslotfrom+"-"+orderData.deliverytimeslotto))
    }

    GetOrderDetails()


   
  },[])


    return (
      <View style={styles.centeredView}>

        <ProductsHeader navigation={navigation} title={"Order Details"}/>
        <ScrollView style={{width:width,height:height-60}}>

            <View style={styles.deliveryDetails}>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}> 
                <Text>Order ID</Text>
               
                <Text>{orderData.orderid}</Text> 
              
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}> 
                <Text>Order Time</Text>
                <Text style={{textAlign:'right'}}>{GetFormattedDate(orderData.ordertime)}</Text>
              </View>

              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}> 
                <Text>Order Status</Text>
                <Text style={{textAlign:'right'}}>{orderData.orderstatus}</Text>
              </View>

            </View>

            <View style={styles.deliveryDetails}>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}> 
                <Text>Delivery Date/Time</Text>
              
                <Text>{deliverytime}</Text>
               
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}> 
                <Text>Delivery Address</Text>
                <Text style={{textAlign:'right'}}>{orderData.address}</Text>
              </View>
            </View>

            

  
          {orderData.couponcode != "" &&  <TouchableOpacity style={styles.applyCoupon}>
                <View style={{flexDirection:'row',marginTop:'auto',marginBottom:'auto'}}>
                <Image source={require("../assets/discount.png")}
                        style={{ height: 30, width: 30 }} />
                        <View style={{marginLeft:20}}>
                        <Text style={{fontWeight:'900',fontSize:15}}>{orderData.couponcode}</Text>
                        <Text style={{fontSize:12,color:'rgba(0,0,0,0.5)'}}>Coupon Applied in Bill</Text>
                        </View>
                  
                </View>          
                
            </TouchableOpacity>
          }
            <View style={styles.billDetails}>
              <View style={styles.billDetailsRow}>
                <Text>Sub Total</Text>
                <Text>{subTotal}</Text>
              </View>
              <View style={styles.billDetailsRow}>
                <Text>Delivery Charge</Text>
                <Text>{orderData.delcharges}</Text>
              </View>
              <View style={styles.billDetailsRow}>
                <Text>Discount</Text>
                <Text>{orderData.discount}</Text>
              </View>
              <View style={[styles.billDetailsRow,{borderBottomWidth:0}]}>
                <Text style={{fontWeight:'bold',fontSize:15}}>Total</Text>
                <Text style={{fontWeight:'bold',fontSize:15}}>{orderData.bill}</Text>
              </View>
            </View>
            {cartentries.map((item,index)=>{
              return <CartItem item={item} edit={'no'} key={index}/>
            })}
        </ScrollView>
          
         {isLoading && <LoadingView/>}
      </View>
    )
  
}



const styles = StyleSheet.create({
 
  deliveryDetails:{
    width:'90%',
    marginLeft:'5%',
    marginRight:'5%',
    marginTop:10,
    marginBottom:10,
    height:'auto',
    borderRadius:5,
    elevation:5,
    padding:5,
    backgroundColor:'#DFE1E3'
  },
  billDetails:{
    width:'90%',
    marginLeft:'5%',
    marginRight:'5%',
    marginTop:10,
    marginBottom:10,
    height:'auto',
    borderRadius:5,
    elevation:5,
    padding:5,
    backgroundColor:'#DFE1E3'
  },
  applyCoupon:{
    width:'90%',
    marginLeft:'5%',
    marginRight:'5%',
    marginTop:10,
    marginBottom:10,
    height:'auto',
    borderRadius:5,
    elevation:5,
    padding:5,
    backgroundColor:'#DFE1E3',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  billDetailsRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomColor:'grey',
    borderBottomWidth:1,
    paddingBottom:3,
    paddingTop:3,
    borderStyle:'dashed',

  },
  centeredView: {
    flex: 1,
    backgroundColor:whiteColor
  },
})
