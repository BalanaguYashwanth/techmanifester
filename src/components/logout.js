import React,{useState, useEffect, } from 'react'
import axios from 'axios'
import { Redirect,useHistory } from 'react-router-dom';

export default function logout(){
    const history = useHistory();

    useEffect( () => {
        
        
        let axiosConfig={
            headers:{
                Authorization : "Bearer "+window.atob(localStorage.getItem('access-token'))
            }
        }

        axios.post('https://online-new-courses.herokuapp.com/logout',{
            token:localStorage.getItem('access-token')
        },axiosConfig)
        .then(res=>{
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh-token')
            
            console.log(res.data)
            history.push('/login')
        })
        .catch(err=>{console.log(err)})
    },[] )


    return(
        <div>
            
        </div>
    )
}
