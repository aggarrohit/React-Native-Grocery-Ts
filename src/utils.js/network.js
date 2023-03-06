import { Base_url, server_error } from "./constants"

export const getOrdersCall=async(bodyobj)=>{
    return await NetworkCallPOSTWithoutToken(bodyobj,'phps/get_orders.php')  
}
export const createOrderCall=async(bodyobj)=>{
  return await NetworkCallPOSTWithoutToken(bodyobj,'phps/create_order.php')  
}
export const getCouponDetailsCall=async(bodyobj)=>{
  return await NetworkCallPOSTWithoutToken(bodyobj,'phps/get_coupon_details.php')  
}
export const getOrderDetailsCall=async(bodyobj)=>{
  return await NetworkCallPOSTWithoutToken(bodyobj,'phps/get_order_details.php')  
}
export const getItemsCall=async(bodyobj)=>{
  return await NetworkCallPOSTWithoutToken(bodyobj,'phps/get_items.php')  
}
export const registerUserCall=async(bodyobj)=>{
  return await NetworkCallPOSTWithoutToken(bodyobj,'phps/register_user.php')  
}
export const getCustomerDetailsCall=async(bodyobj)=>{
  return await NetworkCallPOSTWithoutToken(bodyobj,'ncs/get_customer_details.php')  
}
export const sendLoginCodeCall=async(bodyobj)=>{
  return await NetworkCallPOSTWithoutToken(bodyobj,'phps/send_login_code.php')  
}

// export const SearchOnlineIngredient=async(token,bodyobj)=>{
//     return await NetworkCallPOST(token,bodyobj,'searchIngred')  
// }
export const getCategoriesCall=async()=>{
  return await NetworkCallGet('ncs/get_categories.php')  
}
export const getBannersCall=async()=>{
  return await NetworkCallGet('ncs/get_banners.php')  
}
export const getTimeslotsCall=async()=>{
  return await NetworkCallGet('ncs/get_timeslots.php')  
}
export const getCouponsCall=async()=>{
  return await NetworkCallGet('phps/get_coupons.php')  
}
export const isRestaurantOpenWeekCall=async()=>{
  return await NetworkCallGet('phps/is_restaurant_open_week.php')  
}
export const getGeoAreasCall=async()=>{
  return await NetworkCallGet('ncs/get_geo_areas.php')  
}




const NetworkCallPOST=async(token,bodyobj,urlext)=>{
    try {
      var body = JSON.stringify(bodyobj)
      const response = await fetch('https://mcontact.in/api/'+urlext, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: body
      });
     
      const json = await response.json();
      return {...json,success:true}   
    
    } catch (error) {
      alert(server_error)
      return {success:false,data:{error:"Network connection error.."}}
    } 
  
}

const NetworkCallPOSTWithoutToken=async(bodyobj,urlext)=>{
  try {
    var body = JSON.stringify(bodyobj)
    const response = await fetch(Base_url+urlext, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    });
    const json = await response.json();
    return {...json,success:true}    
  
  } catch (error) {
  //   console.error(error);
    alert(server_error)
    return {success:false,data:{error:"Network connection error.."}}
  } 

}

const NetworkCallGet=async(urlext)=>{
    try {
      const response = await fetch(Base_url+urlext, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      });
      const json = await response.json();
      return {...json,success:true}   
    
    } catch (error) {
    //   console.error(error);
      alert(server_error)
      return {success:false,data:{error:"Network connection error.."}}
    } 
  
}