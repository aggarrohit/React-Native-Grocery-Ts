import { LatLngData } from "./classes";
import { monthNames } from "./constants";

export const ConvertTimeSlot=(timeslot)=>{
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

export  const GetFormattedDate=(orderDate)=>{
    var date = new Date(orderDate.replace(" ","T"))
    var hrs = 0;
    var ampm = " AM"
    if(date.getHours()<12){
      hrs = date.getHours()
    }else if (date.getHours()==12){
      ampm = " PM"
      hrs = date.getHours()
    }else if (date.getHours()>12){
      ampm = " PM"
      hrs = date.getHours()-12
    }
    return date.getDate()+" "+monthNames[(+date.getMonth() + +1)]+" "+
          date.getFullYear() + " ("+hrs+":"+date.getMinutes()+ampm+")" 
}

export const GetFormattedDate1=(orderDate)=>{
    var date = new Date(orderDate.replace(" ","T"))
    return date.getDate()+" "+monthNames[(+date.getMonth() + +1)]+" "+date.getFullYear()  
  }

export const GetDateAfterNdays=(days_to_add)=>{
    var today = new Date();
    var dd = today.getDate()+days_to_add;
    var mm = today.getMonth() + 1;
    var y = today.getFullYear();
    return dd+"-"+mm+"-"+y
}

export  const PointIsInRegion=(x, y,thePath)=>
{
    var crossings = 0;

    var point = new LatLngData()
    point.lat = x;
    point.lng = y;

    var count = thePath.length;
    var i = 0
    thePath.forEach(a => {
      
      var j = i+1
      if (j >= count)
      {
          j = 0;
      }

     var b = thePath[j]
     if (RayCrossesSegment(point, a, b))
     {
         crossings++;
     }
      i = i+1
    });

   
    return (crossings % 2 == 1);
}

const RayCrossesSegment=(point,a,b)=>
{
    var px = point.lng;
    var py = point.lat;
    var ax = a.lng;
    var ay = a.lat;
    var bx = b.lng;
    var by = b.lat;
    if (ay > by)
    {
        ax = b.lng;
        ay = b.lat;
        bx = a.lng;
        by = a.lat;
    }
    // alter longitude to cater for 180 degree crossings
    if (px < 0) { px += 360; };
    if (ax < 0) { ax += 360; };
    if (bx < 0) { bx += 360; };

    if (py == ay || py == by) py += 0.00000001;
    if ((py > by || py < ay) || (px > Math.max(ax, bx))) return false;
    if (px < Math.min(ax, bx)) return true;

    var red = (ax != bx) ? ((by - ay) / (bx - ax)) : Number.MAX_VALUE;
    var blue = (ax != px) ? ((py - ay) / (px - ax)) : Number.MAX_VALUE;
    return (blue >= red);
}

export const RemoveSuccessParameter=(jsonPre)=>{
    let p1 = {...jsonPre}
        let json = []
        for (let index = 0; index < Object.keys(p1).length; index++) {
          if(p1[index]){
            json.push(p1[index])
          }
          
        }
    return json
}