import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect,useHistory,Link } from 'react-router-dom';


export default function adminlogin() {
    const history = useHistory();

    const [first_name, setFirstname] = useState()
    const [last_name, setLastname] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    function posting() {
        axios.post('https://online-new-courses.herokuapp.com/adminregister', {
            username:username,
            password:password,
            email:email,
            first_name:first_name,
            last_name:last_name,
        })
            .then(res => {
                history.push('/adminlogin')
            })
            .catch(err => console.log(err.response))
        }

    return (
        <div className="container">
            <h3 className="display-4">  Admin Register </h3>
            <input className="input" type="text" placeholder="enter the firstname" onChange={(e) => setFirstname(e.target.value)} />
            <br />
            <input className="input" type="text" placeholder="enter the lastname" onChange={(e) => setLastname(e.target.value)} />
            <br />
            <input className="input" type="email" placeholder="enter the email" onChange={(e) => setEmail(e.target.value)} />
            <br />
            <input className="input" type="text" placeholder="enter the username"  onChange={(e) => setUsername(e.target.value)} />
            <br />
            <input className="input" type="password" placeholder="enter the password" onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button id="loginbutton" onClick={posting} > submit </button>
            <br  />
            <p> Already have an account ? <Link to='/adminlogin' > Login </Link>   </p>
        </div>
    )

}
