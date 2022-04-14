import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom';

export default function adminlogout() {
    const history = useHistory();

  
    useEffect( () => {
        
        let axiosConfig={
            headers:{
                Authorization :"Token " +window.atob(localStorage.getItem('admin-token'))
            }
        }

        axios.post('https://online-new-courses.herokuapp.com/logout',{
            token:window.atob(localStorage.getItem('admin-token'))
        },axiosConfig)
        .then(res=>{
            localStorage.removeItem('admin-token')
            console.log(res.data)
            history.push('/adminlogin')
        })
        .catch(err=>{console.log(err)})

    },[] )



    return (
        <div>
           
        </div>
    )
}

