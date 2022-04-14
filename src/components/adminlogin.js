import React,{useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect,useHistory,Link } from 'react-router-dom';
import App from '../App'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


export default function adminlogin(){
    const history = useHistory();

    const [login,setLogin] = useState({username:'',password:''})
    const[feedback,setFeedback] = useState()
    const [token,setToken] = useState()

    function submit() {
       axios.post("https://online-new-courses.herokuapp.com/login",{
           username:login.username,
           password:login.password
       })
       .then(res=>{
           //console.log(res.data)
            if(res.data.admin)
            {
                localStorage.setItem('admin-token',window.btoa(res.data.token))
                history.push('/secretadmin')
                location.reload()
            }
            else{
                setFeedback('User not allowed')
            }
        })
       .catch(err=>console.log(err.response))
    }

   
    return (
        <div className="container"> 
            
            <p className="display-4" > Admin Login </p>
            
            <input  className="input" type="text"  onChange={ (e) => (setLogin({...login,username:e.target.value} ))} placeholder="enter the username" />
            <br />
           
            <input  className="input" type="password"  onChange={ (e) => (setLogin({...login,password:e.target.value}))} placeholder="enter the password" />
            <br  />
            <button id="loginbutton" onClick={submit} >  submit </button>
            <br  />
            <h6> {feedback} </h6>
          
            {/* <p>{" Don't have an account ? "}<Link to='/adminregister' > Registered </Link>   </p> */}
        </div>
    )

}
