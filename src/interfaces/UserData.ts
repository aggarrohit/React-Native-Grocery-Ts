export interface UserData {
    mobile:number;
    name:string;
    address:string;
    email:string;
    areaid:number;
    minbill:number;
    delcharge:number;
    dcupto:number;
    lat:number;
    lng:number;
    profile_status:string;
}

export const LoggedOutUser = {
    mobile:0,
    name:"",
    address:"",
    email:"",
    areaid:0,
    minbill:0,
    delcharge:0,
    dcupto:0,
    lat:0,
    lng:0,
    profile_status:""
}