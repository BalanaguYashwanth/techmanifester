import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect, useHistory, Link } from 'react-router-dom';
import App from '../App'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import ReCAPTCHA from "react-google-recaptcha";
import Recaptcha from 'react-google-invisible-recaptcha';


export default function login() {
    const history = useHistory();
  
    const [login, setLogin] = useState({ username: '', password: '' })
    const [feedback, setFeedback] = useState()
    const [token, setToken] = useState()

    function submit() {
        // await recaptchas.execute()

        window.grecaptcha.ready(function () {
            window.grecaptcha.execute('', { action: 'submit' }).then(function (token) {

                axios.post('https://online-new-courses.herokuapp.com/auth/token', {
                    grant_type: 'password',
                    username: login.username,
                    password: login.password,
                    client_id: '',
                    client_secret: '',
                })
                    .then(res => {
                        //console.log(res.data)
                        setToken(res.data.token)
                        history.push("/");
                        location.reload()
                        localStorage.setItem('access-token', window.btoa(res.data.access_token));
                        localStorage.setItem('refresh-token', window.btoa(res.data.refresh_token));
                    })
                    .catch(err => {
                        console.log(err.response.data.error_description)
                        setFeedback(err.response.data.error_description)
                    })
            });

        });
    }
    // function userToken(token1){
    //    localStorage.setItem('user-token',token1)
    // }

    function responseFacebook(response) {

        window.grecaptcha.ready(function () {
            window.grecaptcha.execute('', { action: 'submit' }).then(function (token) {
                axios.post('https://online-new-courses.herokuapp.com/auth/convert-token', {
                    token: response.accessToken,
                    backend: 'facebook',
                    grant_type: 'convert_token',
                    client_id: '',
                    client_secret: '',
                })
                    .then((res) => {
                        localStorage.setItem('access-token', window.btoa(res.data.access_token))
                        localStorage.setItem('refresh-token', window.btoa(res.data.refresh_token))
                        history.push("/");
                        location.reload()
                    })
                    .catch((err) => console.log(err))

            });
        });


    }

    function onChange(value) {
        console.log("Captcha value:", value);
    }


    function responseGoogle(response) {
        
        window.grecaptcha.ready(function() {
            window.grecaptcha.execute('', {action: 'submit'}).then(function(token) {
                axios.post('https://online-new-courses.herokuapp.com/auth/convert-token', {
            token: response.accessToken,
            backend: 'google-oauth2',
            grant_type: 'convert_token',
            client_id: '',
            client_secret: '',
        })
            .then((res) => {
                localStorage.setItem('access-token', window.btoa(res.data.access_token))
                localStorage.setItem('refresh-token', window.btoa(res.data.refresh_token))
                history.push("/");
                location.reload()
            })
            .catch((err) => console.log(err.response))
            });
          });

      

    }

    return (
        <div className="container">

            <p className="display-4" > Login </p>

            <input className="input" type="text" onChange={(e) => (setLogin({ ...login, username: e.target.value }))} placeholder="enter the username" />
            <br />

            <input className="input" type="password" onChange={(e) => (setLogin({ ...login, password: e.target.value }))} placeholder="enter the password" />
            <br />
            <button id="loginbutton" onClick={submit} >  submit </button>
            <br />
            <h6> {feedback} </h6>
            <p> or </p>
            <FacebookLogin
                id="loginbutton"
                appId='779887412208181'
                fields='name,email,picture'
                callback={responseFacebook}
            />
            <br />
            <GoogleLogin
                clientId="" //CLIENTID NOT CREATED YET
                buttonText="LOGIN WITH GOOGLE "
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />

            <br />

          

            <br />
            <p>{" Don't have an account ? "}<Link to='/register' > Registered </Link>   </p>
        </div>
    )
}
