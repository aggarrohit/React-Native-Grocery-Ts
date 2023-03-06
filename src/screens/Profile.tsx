import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, Keyboard, PermissionsAndroid, Alert } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import { LoadingView } from '../utils.js/Popups';
import { getCustomerDetailsCall, getGeoAreasCall, registerUserCall, sendLoginCodeCall } from '../utils.js/network';
import { PointIsInRegion } from '../utils.js/shortFunctions';
import { BlueButton, EnterAddress, EnterEmailAddress, EnterFullName, EnterMobile, EnterOTP, ProfileBackButton, UnderlinedTextButton } from '../comps/Elements';
import { LatLngData } from '../utils.js/classes';
import { greyColor, lightGreyColor, lightVioletColor, mainBlueColor, redColor, whiteColor } from '../utils.js/colors';
import { useAppDispatch } from '../store/store';
import useAuth, { AuthInterface } from '../hooks/useAuth';
import { LoggedOutUser, UserData } from '../interfaces/UserData';



const { width } = Dimensions.get('window')

export default function Profile({ route, navigation }) {

  const [isAreaServiceable, setIsAreaServiceable] = useState(false)
  const [mobileno, setMobileno] = useState(0)
  const [topFlex, setTopFlex] = useState(4)
  const [fcmToken, setFcmToken] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState<any>("")
  const [otp, setOtp] = useState(0)
  const [randomNumber, setRandomNumber] = useState(0)
  const scrollViewRef = useRef<any>(null);
  const {userData,updateUserData} = useAuth() as AuthInterface
  const profile_status = userData?.profile_status;
  let user_data:UserData = userData||{};
  const [isLoading, setLoading] = useState(false)



  const [areas, setAreas] = useState<any>([]);

  const GetGeoAreas = async () => {
    setLoading(true)
    const json = await getGeoAreasCall();
    setLoading(false)
    if (json.success) {
      setAreas(json.server_response);
    }


  }


  const SaveProfile = async () => {

    var body = {
      mobile: user_data.mobile,
      name: name,
      address: address,
      email: email,
      lat: user_data.lat,
      long: user_data.lng,
      areaid: user_data.areaid,
      fcmtoken: fcmToken

    }

    setLoading(true)
    const jsonPre = await registerUserCall(body);
    setLoading(false)

    if (jsonPre.success) {
      let p1 = { ...jsonPre }
      let json:any[] = []
      for (let index = 0; index < Object.keys(p1).length; index++) {
        if (p1[index]) {
          json.push(p1[index])
        }

      }




      if (json != null && json.length > 0 && json[0].response != null && json[0].response != "error") {
        user_data.profile_status = "profile_saved"
        user_data.name = name
        user_data.email = email
        user_data.address = address
        (updateUserData(user_data))
        navigation.goBack()
        alert("Profile Saved!!")
      }
    }




  }

  const GetCustomerDetails = async () => {

    var body = {
      mobile: user_data.mobile
    }

    setLoading(true)
    const json = await getCustomerDetailsCall(body);
    setLoading(false)
    if (json.response == "error") {
      alert("Some Error")
    } else
      if (json.server_response.length == 1 && json.server_response[0].mobile != null) {

        var cus_res = json.server_response[0];

        user_data.name = cus_res.name
        user_data.address = cus_res.address
        user_data.email = cus_res.email
        user_data.lat = cus_res.lat
        user_data.lng = cus_res.lng
        user_data.profile_status = "profile_saved"

        updateUserData(user_data)
      } else {
        alert(json.errors[0].message + "\nPlease Contact application owner")
      }

  }

  const SendOtp = async () => {
    var rn = Math.floor(100000 + Math.random() * 900000)
    setRandomNumber(rn)



    var body = {
      basis: "customer10",
      mobile: mobileno,
      otp: rn
    }
    setLoading(true)
    const json = await sendLoginCodeCall(body);
    setLoading(false)
    if (json.response == "error") {
      alert("Some Error")
    } else
      if (json.status == "success") {
        user_data.profile_status = "otp_sent"
        updateUserData(user_data)
      } else {
        alert(json.errors[0].message + "\nPlease Contact application owner")
      }



  }

  const GetOtpClicked = () => {
    if (mobileno <= 999999999) {
      alert('Please Enter 10 Digit Mobile Number..')
    } else {
      scrollViewRef.current?.scrollTo({
        x: width,
      });
      user_data.mobile = mobileno
      updateUserData(user_data)

      SendOtp()

    }

  }

  const ChangeMobileNumber = () => {
    user_data.profile_status = ""
    updateUserData(user_data)
    scrollViewRef.current?.scrollTo({
      x: -width,
    });
  }

  const VerifyOtpClicked = () => {
    if (randomNumber == otp) {
      user_data.profile_status = "mobile_verified"
      updateUserData(user_data)
      GetCustomerDetails()
    } else {
      alert("Wrong OTP Entered")
    }
  }

  useEffect(() => {
    if (profile_status == "mobile_verified") {
      GetCustomerDetails()
    }
  }, [user_data?.profile_status])

  const Logout = () => {
    // update_login_details(logoutUser(user_data))
    updateUserData(LoggedOutUser)
    setTopFlex(4)
    scrollViewRef.current.scrollTo({
      x: -width * 2,
    });
  }

  const SaveProfileClicked = () => {

    if (name == "") {
      alert("Please Enter Name")
    } else if (email == "") {
      alert("Please Enter Email")
    } else if (address == "") {
      alert("Please Enter Address")
    } else if (user_data.lat == 0 || user_data.lng == 0) {
      alert("Please Select Location")
    } else if (isAreaServiceable == false) {
      alert("Selected Location is Not Serviceable")
    } else {
      SaveProfile()

    }
  }

  useEffect(() => {
    if (userData && user_data?.lat != 0 && user_data?.lng != 0 && areas.length > 0) {
      CheckSelectedPointServiceability()
    }
  }
    , [user_data?.lat, user_data?.lng, areas]
  )

  useEffect(() => {

    if (profile_status == "otp_sent") {
      setTopFlex(4)
      if (scrollViewRef != null) {
        scrollViewRef.current.scrollTo({
          x: width * 1,
        });
      }
    } else if (profile_status == "profile_saved" || profile_status == "mobile_verified") {
      setTopFlex(2)
      var x = 0;
      if (otp == 0) {
        x = 2;
      } else {
        x = 1;
      }
      if (scrollViewRef != null) {
        scrollViewRef.current.scrollTo({
          x: width * 2,
        });
        if (profile_status == "profile_saved") {
          setName(user_data.name)
          setEmail(user_data.email)
          setAddress(user_data.address)
        }
      }
    }
  }, [profile_status])

  const FillFcmToken = async () => {
    var fcm = await messaging().getToken()
    setFcmToken(fcm)
  }


  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      FillFcmToken()
    }
  }



  useEffect(() => {
    GetGeoAreas()

    requestUserPermission()


  }, []);

  const MobileNumberChange = (data) => {
    if (data.length == 10) {
      setMobileno(data)
      Keyboard.dismiss()
    }
  }

  const OtpChange = (data) => {
    if (data.length == 6) {
      setOtp(data)
      Keyboard.dismiss()
    }
  }

  const CheckSelectedPointServiceability = () => {

    setIsAreaServiceable(false)

    var point = new LatLngData()
    point.lat = user_data.lat
    point.lng = user_data.lng

    areas.forEach(area => {
      var path:any = []
      area.latlongarray.forEach(latlng => {
        var xy = new LatLngData()
        xy.lat = latlng.lat
        xy.lng = latlng.lng
        path.push(xy)
      });

      if (isAreaServiceable == false) {
        if (PointIsInRegion(point.lat, point.lng, path)) {
          setIsAreaServiceable(true)
          user_data.areaid = area.areaid
          user_data.minbill = area.minbill
          user_data.delcharge = area.deliverycharge
          user_data.dcupto = area.dcupto
          updateUserData(user_data)
        }
      }

    });

  }



  const SelectLocaitonClicked = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      navigation.navigate('SelectLocation')
    }
    else {
      Alert.alert("Hey!", "Locaiton permission is required to continue..", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        {
          text: "Try Again..", onPress: () => {
            SelectLocaitonClicked()
          }
        }
      ]);
    }
  }

  return (
    <View style={{ flex: 1, alignContent: 'center' }}>

      <View style={{ backgroundColor: mainBlueColor, flex: 10 }}>
        <View style={{
          backgroundColor: mainBlueColor, flex: topFlex, flexDirection: 'column', alignContent: 'center', alignItems: 'center',
          justifyContent: 'center'
        }}>

          <ProfileBackButton navigation={navigation} />
          <Text style={styles.loginText}>Login</Text>
          <Text style={styles.welcomeText}>Welcome to Grocery Demo</Text>
        </View>
        <View style={styles.curverd}>
          <ScrollView horizontal={true} scrollEnabled={false} showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
          >
            <View style={styles.mainContainer}>
              <View style={{ marginTop: width * 0.2 }}>
                <EnterMobile value={mobileno} onChangeText={MobileNumberChange} />
                <BlueButton onClick={GetOtpClicked} title={'Get OTP'}/>
              </View>
            </View>

            <View style={styles.mainContainer}>
              <View style={{ marginTop: width * 0.2 }}>
                <EnterOTP value={otp} onChangeText={OtpChange} />
                <BlueButton title={'Verify OTP'} onClick={VerifyOtpClicked}/>
                <UnderlinedTextButton onClick={ChangeMobileNumber} title={'Change Mobile Number'} color={mainBlueColor}/>
              </View>

            </View>

            <View style={styles.mainContainer}>
              <ScrollView style={{ marginTop: width * 0.0 }} showsVerticalScrollIndicator={false}>
                <EnterFullName value={name} onChangeText={setName}/>
                <Text style={{ marginBottom: 5, fontSize: 10 }}>Mobile</Text>
                <Text style={styles.mobileDisabled}>{user_data?.mobile}</Text>

                <EnterEmailAddress value={email} onChangeText={setEmail} />

                <EnterAddress value={address} onChangeText={setAddress} />
               

                <BlueButton onClick={SaveProfileClicked} title={'Save Profile'}/>
                <UnderlinedTextButton onClick={SelectLocaitonClicked} title={'Select Location'} color={redColor}/>

                <UnderlinedTextButton onClick={Logout} title={'Logout'} color={redColor}/>

              </ScrollView>

            </View>
          </ScrollView>
        </View>
      </View>


      {isLoading && <LoadingView />}
    </View>

  )

}



const styles = StyleSheet.create({
  loginText:{ fontSize: 25, color: whiteColor, marginTop: 50 },
  welcomeText:{ fontSize: 15, color: whiteColor, marginTop: 10 },
  curverd: {
    flex: 6,
    backgroundColor: whiteColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  mainContainer: {
    flex: 6,
    alignItems: 'center',
    width: width,
    marginTop: 50,
    backgroundColor: whiteColor,
  },
  mobileDisabled: {
    width: width * 0.6,
    borderColor: lightGreyColor,
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: whiteColor,
    paddingTop: 5,
    paddingBottom: 5,
  },
  orderStyle: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    marginTop: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    marginTop: 25
  },
  container: {
    flex: 1,
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateStyle: {
    fontSize: 10,
    color: greyColor
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
    borderColor: greyColor,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    marginBottom: 10
  },

  centeredView1: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor:'rgb(5, 3, 6)',
    // opacity:0.7
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center'
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
    opacity: 1
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
    position: 'absolute',
    bottom: 5,
    right: 10,
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
