import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity,Image } from 'react-native'
import ProductsHeader from '../comps/ProductsHeader'
import { greyColor, lightGreyColor, lightVioletColor, whiteColor } from '../utils.js/colors'
import { getOrdersCall } from '../utils.js/network'
import { LoadingView } from '../utils.js/Popups'
import { GetFormattedDate1 } from '../utils.js/shortFunctions'

const { width } = Dimensions.get('window')


export default function MyOrders({route,navigation}) {

   const [orders, setOrders] = useState<any>([])
   const [isDataFinished, setIsDataFinished] = useState(false)
   const [isLoading,setLoading] = useState(false)

 

  const getOrders = async () => {
      setLoading(true)
      var body = {
        basis: "customer10",
        mobile: "8149850510",
        from:orders.length
      }
      
      const jsonPre = await getOrdersCall(body);
      setLoading(false)
      if(jsonPre.success){

        let p1 = {...jsonPre}
        let json:any = []
        for (let index = 0; index < Object.keys(p1).length; index++) {
          if(p1[index]){
            json.push(p1[index])
          }
          
        }

        if(json.length == 0){
          setIsDataFinished(true)
        }

        if(orders.length == 0){
          setOrders(json);
        }else{
          setOrders([...orders,...json]);
        }
      }
    
   
  }

  const loadMore = (()=>{
    if(!isDataFinished){
      getOrders();
    }
  })

  useEffect(() => {

      getOrders();

  
  },[])

  return (
    <View style={styles.centeredView}>



      <View style={styles.centeredView}>

        <ProductsHeader navigation={navigation} title="My Orders" />

        <FlatList data={orders}
          keyExtractor={(item, index) => 'key' + index}
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          numColumns={1}
          onEndReached={loadMore}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
          return <View style={styles.orderStyle}>
          <TouchableOpacity style={{flex:1,flexDirection:'row'}} onPress={()=> navigation.navigate('OrderDetails', item)}>
        
        
          {item.orderstatus == "Delivered" && <Image style={styles.statusImage} source={require("../assets/delivered.png")}/>}
          {item.orderstatus == "Canceled" && <Image style={styles.statusImage} source={require("../assets/canceled.png")}/>}
          {item.orderstatus != "Delivered" && item.orderstatus != "Canceled" 
              && <Image style={styles.statusImage} source={require("../assets/pending.png")}/>}


          <View style={styles.mainContainer}>
            <View style={styles.container}>
             <Text style={{}}>Order ID : {item.orderid}</Text>
             <Text style={{}}>{item.orderstatus}</Text>
             </View>
             <Text style={styles.dateStyle}>{GetFormattedDate1(item.ordertime)}</Text>
             <Text style={{fontWeight:'700'}}>Rs. {item.bill}</Text>
           </View>
           </TouchableOpacity>
           </View>
          }}
        />


      </View>
      {isLoading && <LoadingView/>}
    </View>

  )

}



const styles = StyleSheet.create({
  mainContainer: {
     width: width-70,
    backgroundColor: lightGreyColor,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:5,
    shadowColor:'#000',
    shadowOpacity:0.5,
    marginLeft:'5%',
    marginRight:'5%',
  },
  orderStyle:{
    position:'relative',
    width:'100%',
    height:'auto',
    marginTop:20,
  },
  statusImage:{
    width:30,
    height:30,
    marginTop:15,
    marginLeft:10
  },
  container: {
    flex:1,
    height: 'auto',
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  dateStyle:{
    fontSize:10,
    color:greyColor
  },
  searchBox: {
    width: width - 70,
    height: 30,
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
  itemPrice: {
    color: whiteColor,
    fontSize: 16,
    textAlign: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    marginBottom: 10
  },

  centeredView1: {
    flex: 1,
    justifyContent:'center'
  },
  centeredView: {
    flex: 1,
    justifyContent:'center',
    backgroundColor:whiteColor
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
    backgroundColor: "red",
  },
  textStyle: {
    color: whiteColor,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})
