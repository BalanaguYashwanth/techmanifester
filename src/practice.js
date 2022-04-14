import React,{useState, useEffect} from 'react'
import './App.css'
import axios from 'axios'

function practice(){

    const [login,setLogin]=useState({username:'',password:''})

    const [data,setData]=useState("")

    useEffect(() => {
        axios.get('https://particle-ae921-default-rtdb.firebaseio.com/users.json')
        .then(res=>console.log((res.data)))
        .catch(err=>console.log(err))
    },[])

    return(
        <div>
            <p id="login"> Blogs   </p>
            <input type="text" placeholder="enter the username" onChange={(e) => (setLogin({...login,username:e.target.value}))} />
            <br/>
            <input type="password" placeholder="enter the password" onChange={(e) => (setLogin({...login,password:e.target.value}))} />            
            <br/>
            <button onClick={() => (console.log(login.username,login.password))} > submit </button>
        </div>
    )
}

export default practice

