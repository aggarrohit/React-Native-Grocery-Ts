import React, { createContext, useContext, useState } from 'react';
import { UserData } from '../interfaces/UserData';

export interface AuthInterface {
  userData: UserData;
  isLoggedin: Boolean;
  isSearch: boolean;
  updateSearch:(isSearch:boolean)=>void;
  updateLoggedin:(isLoggedin:boolean)=>void;
  updateUserData:(userData:UserData)=>void;
}

const AuthContext = createContext<AuthInterface|undefined>(undefined)

/* custom hook to store the centralized states and perform authentication related functions */
export const AuthProvider=({children}):JSX.Element=> {

const [isSearch,setSearch] = useState(false);
const [userData,setUserData] = useState<UserData|undefined>(undefined)
const [isLoggedin,setLoggedin] = useState(false)

const updateSearch=(isSearch:boolean)=>{
  setSearch(isSearch)
}

const updateLoggedin=(isLoggedin:boolean)=>{
  setLoggedin(isLoggedin)
}

const updateUserData=(userData:UserData)=>{
  setUserData(userData)
}


return (<AuthContext.Provider value={{isSearch,updateSearch,
                                      userData,updateUserData,
                                      isLoggedin,updateLoggedin
                                    }}>
          {children}
        </AuthContext.Provider>

      )


}


export default function useAuth(){
    return useContext(AuthContext)
}

