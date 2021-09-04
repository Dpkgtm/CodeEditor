import React, { useContext, useEffect, useState } from 'react'
import {useHistory } from "react-router-dom";
import { auth } from '../firebase';
const AuthContext=React.createContext();
    export function useAuth(){
     return   useContext(AuthContext);
    }
export function AuthContextProvider({children}) {
    console.log("children",children)
    const[loading,setLoading]=useState(true);
    const[user,setUser]=useState(null);
    const history=useHistory();

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    } 
    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
    }

    useEffect(()=>{
      let unmount=  auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);
            if(user){
                history.push('/chatPage');
            }
        })
        return unmount;
    },[user,history]);
    const value={
        user,
        login,
        signup

    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

