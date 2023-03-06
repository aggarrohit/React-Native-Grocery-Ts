import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions,  Modal , 
        Pressable,TouchableOpacity,Image,Alert,ScrollView, TextInput, Button } from 'react-native'
import CartItem from '../comps/CartItem';
import CartHeader from '../comps/CartHeader'
import RadioGroup from 'react-native-radio-buttons-group';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment'
import { createOrderCall, getCouponDetailsCall, getCouponsCall, getTimeslotsCall, isRestaurantOpenWeekCall } from '../utils.js/network';
import { LoadingView } from '../utils.js/Popups';
import { lightVioletColor, mainBlueColor, whiteColor } from '../utils.js/colors';
import useAuth, { AuthInterface } from '../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../store/store';
import { ReplaceCartItems } from '../store/features/CartItemSlice';


const { width,height } = Dimensions.get('window')


export default function Cart({ navigation }) {

  const {userData} = useAuth() as AuthInterface

  const redux_cart = useAppSelector(state => state.cartItems.cartItems);
  const user_data = userData;
  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectCouponVisible, setSelectCouponVisible] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [timeslots, setTimeslots] = useState<any>([]);
  const [timeslotsF, setTimeslotsF] = useState<any>([]);
  const [radioButtons, setRadioButtons] = useState<any>([])
  const [selectedSlot, setSelectedSlot] = useState("")
  const [selectedSlotF, setSelectedSlotF] = useState("")
  const [noOfItems, setNoOfItems] = useState(0)
  const [totalOfItems, setTotalOfItems] = useState(0)
  const [delcharge, setDelcharge] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [bill, setBill] = useState(0)
  const [couponApplied, setCouponApplied] = useState<any>(null)
  const [couponText,setCouponText]=useState("")
  const [isLoading,setLoading] = useState(false)

  var rbno = 0;

  

  const ConvertTimeSlot=(timeslot)=>{
    var time_slot = timeslot.split("-");
    var from_time = time_slot[0];
    var to_time = time_slot[1];
    var from_AMPM = "";
    var to_AMPM = "";
    switch (from_time){
        case "0": from_AMPM = "12 PM";
            break;
        case "1": from_AMPM = "1 AM";
            break;
        case "2": from_AMPM = "2 AM";
            break;
        case "3": from_AMPM = "3 AM";
            break;
        case "4": from_AMPM = "4 AM";
            break;
        case "5": from_AMPM = "5 AM";
            break;
        case "24": from_AMPM = "0 AM";
            break;
        case "6": from_AMPM = "6 AM";
            break;
        case "7": from_AMPM = "7 AM";
            break;
        case "8": from_AMPM = "8 AM";
            break;
        case "9": from_AMPM = "9 AM";
            break;
        case "10": from_AMPM = "10 AM";
            break;
        case "11": from_AMPM = "11 AM";
            break;
        case "12": from_AMPM = "12 AM";
            break;
        case "13": from_AMPM = "1 PM";
            break;
        case "14": from_AMPM = "2 PM";
            break;
        case "15": from_AMPM = "3 PM";
            break;
        case "16": from_AMPM = "4 PM";
            break;
        case "17": from_AMPM = "5 PM";
            break;
        case "18": from_AMPM = "6 PM";
            break;
        case "19": from_AMPM = "7 PM";
            break;
        case "20": from_AMPM = "8 PM";
            break;
        case "21": from_AMPM = "9 PM";
            break;
        case "22": from_AMPM = "10 PM";
            break;
        case "23": from_AMPM = "11 PM";
            break;
    }
    switch (to_time){
        case "0": to_AMPM = "12 PM";
            break;
        case "1": to_AMPM = "1 AM";
            break;
        case "2": to_AMPM = "2 AM";
            break;
        case "3": to_AMPM = "3 AM";
            break;
        case "4": to_AMPM = "4 AM";
            break;
        case "5": to_AMPM = "5 AM";
            break;
        case "24": to_AMPM  = "0 AM";
            break;
        case "6": to_AMPM = "6 AM";
            break;
        case "7": to_AMPM = "7 AM";
            break;
        case "8": to_AMPM = "8 AM";
            break;
        case "9": to_AMPM = "9 AM";
            break;
        case "10": to_AMPM = "10 AM";
            break;
        case "11": to_AMPM = "11 AM";
            break;
        case "12": to_AMPM = "12 AM";
            break;
        case "13": to_AMPM = "1 PM";
            break;
        case "14": to_AMPM = "2 PM";
            break;
        case "15": to_AMPM = "3 PM";
            break;
        case "16": to_AMPM = "4 PM";
            break;
        case "17": to_AMPM = "5 PM";
            break;
        case "18": to_AMPM = "6 PM";
            break;
        case "19": to_AMPM = "7 PM";
            break;
        case "20": to_AMPM = "8 PM";
            break;
        case "21": to_AMPM = "9 PM";
            break;
        case "22": to_AMPM = "10 PM";
            break;
        case "23": to_AMPM = "11 PM";
            break;
    }
    return (from_AMPM+"-"+to_AMPM);
}

  const ClearCart=()=>{
    dispatch(ReplaceCartItems({cartItems:[]}))
  }

  const GetTimeSlots = async () => {
    setLoading(true)
     const json = await getTimeslotsCall();
    setLoading(false)
     var times:any = []
     json.server_response.forEach(element => {
       times.push(element.timeslot)
     });

     GetIsRestaurantOpenWeek(times)
  
 }

 const GetCoupons = async () => {
  
  setLoading(true)
   const json = await getCouponsCall();
  setLoading(false)
  if(json.success){
    let p1 = {...json}
    let arr:any = []
    for (let index = 0; index < Object.keys(p1).length; index++) {
      if(p1[index]){
        arr.push(p1[index])
      }
      
    }

    setCoupons(arr)
    setSelectCouponVisible(true)
  }
 

}

const CouponCheck = async () => {
 
   let   body= {
        coupon: couponText,
        mobile: user_data.mobile
      }
   setLoading(true)
    const json = await getCouponDetailsCall(body);
    setLoading(false)
    if(json != null && json == "not first"){
      alert("Sorry, This Coupon Applicable for first order only")
    }else if(json != null && json.server_response != null && json.server_response.length > 0){
      CouponSelected(json.server_response[0])
    }
  
}

const ApplyCouponClicked=()=>{
  if(coupons.length == 0){
    GetCoupons()
  }else{
    setSelectCouponVisible(true)
  }
}

 const GetIsRestaurantOpenWeek = async (timeslot_arr) => {
  setLoading(true)
   const json = await isRestaurantOpenWeekCall();
  setLoading(false)
   setTimeslots([])
   json.server_response.forEach(element => {
     if(element.day == "today"){
       if(element.is_open == "yes"){
        PopulateTimesArrayForToday(timeslot_arr)
       }
     }else    if(element.day == "tomorrow"){
      if(element.is_open == "yes"){
       PopulateTimesArrayForTomorrow(timeslot_arr)
      }
    }else    if(element.day == "tomorrow3"){
      if(element.is_open == "yes"){
       PopulateTimesArrayForN(timeslot_arr,2)
      }
    }else    if(element.day == "tomorrow4"){
      if(element.is_open == "yes"){
        PopulateTimesArrayForN(timeslot_arr,3)
      }
    }else    if(element.day == "tomorrow5"){
      if(element.is_open == "yes"){
        PopulateTimesArrayForN(timeslot_arr,4)
      }
    }else    if(element.day == "tomorrow6"){
      if(element.is_open == "yes"){
        PopulateTimesArrayForN(timeslot_arr,5)
      }
    }else    if(element.day == "tomorrow7"){
      if(element.is_open == "yes"){
        PopulateTimesArrayForN(timeslot_arr,6)
      }
    }
   });

  
}

const PopulateTimesArrayForToday=(arrayList_timeslot)=>{

  var hour =  new Date().getHours() //+ hrs;
  for(var i=0;i<arrayList_timeslot.length;i++){
      var time_slot = arrayList_timeslot[i].split("-");
    var from_time = time_slot[0];
      if(+hour<+from_time){
        var ts = "Today, "+ConvertTimeSlot(arrayList_timeslot[i])
          timeslots.push(ts);
          timeslotsF.push(moment().format("YYYY-MM-DD")+","+arrayList_timeslot[i])
          var selected = false
          if(rbno==0){
            selected = true
            setSelectedSlot(ts)
            setSelectedSlotF(moment().format("YYYY-MM-DD")+","+arrayList_timeslot[i])
          }
          var rb = {id:rbno,label:ts,value:ts,selected:selected};
          rbno++
          radioButtons.push(rb)
          setRadioButtons(radioButtons)
          setTimeslots(timeslots)
          setTimeslotsF(timeslotsF)
      }
  }
}

const PopulateTimesArrayForTomorrow=(arrayList_timeslot)=>{
  for(var i=0;i<arrayList_timeslot.length;i++){

    var ts = "Tomorrow, "+ConvertTimeSlot(arrayList_timeslot[i])
    timeslotsF.push(moment().add(1,'days').format("YYYY-MM-DD")+","+arrayList_timeslot[i])
    timeslots.push(ts);
    var selected = false
    if(rbno==0){
      selected = true
      setSelectedSlot(ts)
      setSelectedSlotF(moment().add(1,'days').format("YYYY-MM-DD")+","+arrayList_timeslot[i])
    }
    var rb = {id:rbno,label:ts,value:ts,selected:selected};
    rbno++
    radioButtons.push(rb)
    setRadioButtons(radioButtons)
          setTimeslots(timeslots)
          setTimeslotsF(timeslotsF)
  }
}

const PopulateTimesArrayForN=(arrayList_timeslot,days)=>{

        


          for(var i=0;i<arrayList_timeslot.length;i++){
        var ts = moment().add(days,'days').format("Do MMM")+", "+ConvertTimeSlot(arrayList_timeslot[i])
            timeslots.push(ts);
            timeslotsF.push(moment().add(days,'days').format("YYYY-MM-DD")+","+arrayList_timeslot[i])
            var selected = false
            if(rbno==0){
              selected = true
              setSelectedSlot(ts)
              setSelectedSlotF(moment().add(days,'days').format("YYYY-MM-DD")+","+arrayList_timeslot[i])
            }
            var rb = {id:rbno,label:ts,value:ts,selected:selected};
            rbno++
            radioButtons.push(rb)
            setRadioButtons(radioButtons)
          setTimeslots(timeslots)
          setTimeslotsF(timeslotsF)
          }
}

const CouponSelected=(item)=>{
  var disc = 0;
  setSelectCouponVisible(false)
  if(totalOfItems<item.minbill){
    alert("This coupon is applicable on minimum bill of Rs."+item.minbill)
  }else{
    if(item.type == "flat"){
      disc = item.discount
      setDiscount(item.discount)
    }else if(item.type == "percentage"){
      if(totalOfItems*item.discount/100<item.maxdisc){
        disc = totalOfItems*item.discount/100
        setDiscount(totalOfItems*item.discount/100)
      }else{
        disc = item.maxdisc
        setDiscount(item.maxdisc)
      }
      
    }
  }

  if(disc>0){
    setCouponApplied(item)
    alert("Coupon Applied !! You got Rs."+disc+" discount..")
  }
}

useEffect(() => {

  setNoOfItems(redux_cart.length)

  var total=0;
  redux_cart.forEach(item => {
    total=total+(item.cartqty*item.price)
  });

  setTotalOfItems(total)

  if(total < user_data?.dcupto){
    setDelcharge(user_data.delcharge)
    setBill(+total + +user_data.delcharge - +discount)
  }else{
  setDelcharge(0)
    setBill(total - +discount)
  }
  
},[redux_cart,discount])

useEffect(() => {

  GetTimeSlots()
  
},[])

const onPressRadioButton=(data)=>{
  data.forEach(element => {
    if(element.selected){
      setSelectedSlot(element.value)
    }
  });
}

const PlaceOrderClicked=()=>{
  if(user_data?.profile_status != "profile_saved"){
    alert("Please complete and save profile")
  }else if(user_data.areaid == 0){
    alert("Sorry, Your location is not serviceable")
  }else if(totalOfItems<user_data.minbill){
    alert("Minimum sub total should be Rs."+user_data.minbill)
  }else{
    CreateOrder()
  }
}

const CreateOrder = async () => {
  
    setLoading(true)

    var deliverydate = selectedSlotF.split(",")[0]
    var timeslot = selectedSlotF.split(",")[1]

    var coupon_code = "";
    var ctype = ""
    var cdisc = 0;
    var cminbill = 0;
    var cmaxdisc = 0;

    if(couponApplied != null){
      coupon_code = couponApplied.couponcode
      ctype = couponApplied.type
      cdisc = couponApplied.discount
      cminbill = couponApplied.minbill
      cmaxdisc = couponApplied.maxdisc
    }


    var body = {
      basis: "customer",
      mobile: user_data.mobile,
      name: user_data.name,
      address: user_data.address,
      deliverydate:deliverydate,
      deliverytimeslotfrom:timeslot.split("-")[0],
      deliverytimeslotto:timeslot.split("-")[1],
      orderid:0,
      orderentries:redux_cart,
      orderstatus:"Order Placed",
      couponcode:coupon_code,
      ctype:ctype,
      cdisc:cdisc,
      cminbill:cminbill,
      cmaxdisc:cmaxdisc,
      delcharges:delcharge,
      discount:discount,
      bill:bill,
      orderType:"later"
    }
    
    
    const json = await createOrderCall(body);
    setLoading(false)

    if(json != null && json[0].response != null && json[0].response != "error" && json.success){
      alert("Order Created with Order ID : "+json[0].response)
      dispatch(ReplaceCartItems({cartItems:[]}))
      navigation.navigate("MyOrders")
    }


  
  
}

const RemoveCoupon=()=>{
  setDiscount(0)
  setCouponApplied(null)
}

return (
  <View style={styles.centeredView}>

  {/* below modal is for coupon selection */}
  <Modal
      animationType="slide"
      transparent={true}
      visible={selectCouponVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setSelectCouponVisible(false);
      }}
    >
      <View style={styles.modalViewParent}>
      <View style={styles.fullHeader}>
            <TouchableOpacity style={{marginTop:'auto',marginBottom:'auto'}} onPress={() => setSelectCouponVisible(false)}>
                <AntDesign  name="left" size={18} color="white" />
            </TouchableOpacity>
            <Text style={{color:'#fff',marginTop:'auto',marginBottom:'auto',marginLeft:10}} >Apply Coupon</Text>
    </View>
      <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setSelectCouponVisible(false)}
          >
            <Text style={styles.timeslotSubmit}>Close</Text>
          </Pressable>
        <View style={styles.cModalView}>
          <View  style={{height:height - 90,width:width}}>
            
            <View style={{width:'90%',height:50,marginLeft:'5%',marginRight:'5%',borderRadius:3,borderWidth:1,paddingLeft:10,paddingRight:10,
                flexDirection:'row',justifyContent:'space-between',borderColor:'rgba(0,0,0,0.25)'}}>
              <TextInput style={{}}
                placeholder="Enter Coupon Code"
                keyboardType="default"
                maxLength={20}
                onChangeText={setCouponText}
              />
            
            {couponText.length==0 && <TouchableOpacity >
              <Text style={{color:'#F2B272',fontWeight:'900',marginTop:'auto',marginBottom:'auto'}}>Apply</Text>
            </TouchableOpacity>}
            {couponText.length>0 && <TouchableOpacity onPress={()=>CouponCheck()}>
              <Text style={{color:'#D57D0C',fontWeight:'900',marginTop:'auto',marginBottom:'auto'}}>Apply</Text>
            </TouchableOpacity>}
            
            </View>
            {coupons.map((item:any,index)=>{
                return  <View key={index} style={{borderBottomColor:'rgba(0,0,0,0.25)',borderBottomWidth:1,padding:15}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{borderColor:'#C5C3C1',borderWidth:1,paddingTop:5,paddingBottom:5,
                  paddingLeft:15,paddingRight:15,
                  fontSize:12,elevation:5,
                  backgroundColor:'#E3AB64',marginBottom:5}}
                    >{item.couponcode}</Text>
                    <TouchableOpacity onPress={()=>CouponSelected(item)}>
                    <Text style={{color:'#D57D0C',fontWeight:'900'}}>Apply</Text>
                    </TouchableOpacity>
                  
                </View>
              {item.type == "percentage" && <Text>Get {item.discount}% off</Text>}
              {item.type == "flat" && <Text>Get flat {item.discount} off</Text>}
              <Text style={{borderTopColor:'rgba(0,0,0,0.1)',borderTopWidth:1}}>{item.details}</Text>
              </View>
            })}
          
        </View>
        
        
        </View>
      </View>
    </Modal>

    {/* below modal is for timeslot selection */}
  <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(false);
      }}
    >
      <View style={styles.modalViewParent}>
        <TouchableOpacity style={{height:height*0.6,width:width}} onPress={()=>setModalVisible(false)}></TouchableOpacity>
        <View style={styles.modalView}>
          <View  style={{height:height*0.4 - 90}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
        
        />
        </ScrollView>
        </View>
        
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.timeslotSubmit}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    


    <CartHeader navigation={navigation}/>
    <ScrollView style={{width:width,height:height-120}}>
        <View style={styles.deliveryDetails}>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}> 
            <Text>Delivery Date/Time</Text>
            <TouchableOpacity onPress={()=>setModalVisible(true)}>
            <Text>{selectedSlot}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}> 
            <Text>Delivery Address</Text>
            <Text style={{textAlign:'right'}}>{user_data?.address}</Text>
          </View>
        </View>

      {couponApplied == null &&  <TouchableOpacity style={styles.applyCoupon} onPress={()=>ApplyCouponClicked()}>
            <View style={{flexDirection:'row',marginTop:'auto',marginBottom:'auto'}}>
            <Image source={require("../assets/discount.png")}
                    style={{ height: 30, width: 30 }} />
              <Text style={{marginLeft:20}}>Apply Coupon</Text>
            </View>

            <Feather name="chevron-right" size={30} color="grey" />
            
        </TouchableOpacity>
      }
      {couponApplied != null &&  <TouchableOpacity style={styles.applyCoupon}>
            <View style={{flexDirection:'row',marginTop:'auto',marginBottom:'auto'}}>
            <Image source={require("../assets/discount.png")}
                    style={{ height: 30, width: 30 }} />
                    <View style={{marginLeft:20}}>
                    <Text style={{fontWeight:'900',fontSize:15}}>{couponApplied.couponcode}</Text>
                    <Text style={{fontSize:12,color:'rgba(0,0,0,0.5)'}}>Coupon Applied in Bill</Text>
                    </View>
              
            </View>

            <TouchableOpacity onPress={()=>RemoveCoupon()}>
              <Feather style={{marginTop:'auto',marginBottom:'auto'}} name="x-circle" size={20} color="grey" />
            </TouchableOpacity>
          
            
        </TouchableOpacity>
      }
        <View style={styles.billDetails}>
          <View style={styles.billDetailsRow}>
            <Text>Total of items</Text>
            <Text>{totalOfItems}</Text>
          </View>
          <View style={styles.billDetailsRow}>
            <Text>Delivery Charge</Text>
            <Text>{delcharge}</Text>
          </View>
          <View style={styles.billDetailsRow}>
            <Text>Discount</Text>
            <Text>{discount}</Text>
          </View>
        </View>
        <Pressable 
                onPress={ClearCart} 
                style={styles.clearCart}>
                  <Text>Clear Cart</Text>
                </Pressable>
        {redux_cart.map((item,index)=>{
            return <CartItem key={index} item={item} edit="no"/>
          })}
    </ScrollView>
    <View style={{width:width,height:60,flexDirection:'row'}}>
      <View style={{width:width/2,height:60,backgroundColor:'#fff',borderTopColor:'rgba(0,0,0,0.05)',borderTopWidth:1}}>
        <View style={{height:40,marginTop:10,marginLeft:'auto',marginRight:'auto',flexDirection:'row'}}>
        <Feather name="shopping-cart" size={30} color="grey" style={{marginTop:5,marginRight:10}}/>
        <View>
        <Text style={{fontWeight:'900',color:'#47A421'}}>Rs.{bill} </Text>
        <Text style={{fontSize:10}}>{noOfItems} Items</Text>
        </View>
        </View>
      
      </View>
      <TouchableOpacity style={styles.placeOrderButton} onPress={()=>PlaceOrderClicked()}>
        <Text style={{color:'#fff',fontSize:18,fontWeight:'700'}}>Place Order</Text>
      </TouchableOpacity>
  
      
    </View>
      
    {isLoading && <LoadingView/>}
  </View>
)
  
}


const styles = StyleSheet.create({
  placeOrderButton:{
    width:width/2,
    height:60,
    backgroundColor:'#47A421',
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center'
},
  fullHeader:{
    flexDirection:'row',
    width:'100%',
    backgroundColor:mainBlueColor,
    height:50,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:'auto',
    paddingBottom:'auto'
},
  deliveryDetails:{
    width:'90%',
    marginLeft:'5%',
    marginRight:'5%',
    marginTop:10,
    marginBottom:10,
    height:50,
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
  clearCart:{
    position:'absolute',
    bottom:5
  },
  itemPrice: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    borderColor:'grey',
    borderWidth:1,
    marginRight:10,
    borderRadius:5,
    backgroundColor:'blue',
    marginBottom:10
  },
  modalViewParent:{
    width:width,
    height:height,
    position:'relative',
    backgroundColor:'rgba(0,0,0,0.35)'
  },

  centeredView: {
    flex: 1,
    backgroundColor:whiteColor
  },
  modalView: {
    width:width,
    height:height*0.4,
    position:'absolute',
    top:height*0.6,
    marginBottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  cModalView: {
    width:width,
    height:height-50,
    position:'absolute',
    top:50,
    marginBottom: 0,
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    width:'80%',
    marginLeft:'10%',
    marginRight:'10%',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:5,
  },
  buttonOpen: {
    backgroundColor: lightVioletColor,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  timeslotSubmit: {
    width:'80%',
    marginLeft:'10%',
    marginRight:'10%',
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})
