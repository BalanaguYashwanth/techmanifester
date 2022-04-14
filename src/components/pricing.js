import React, { useState } from 'react'
import Navbar from './navbar'
import '../main.css'

export default function pricing() {
    return (
        <div >
            <Navbar />

            <div id="mainbody" >
               

                <div className="columns">   
                    <ul className="price">
                        <li className="header">Basic</li>
                        <li className="grey"> ₹ 1,000  / year</li>
                        <li> 16+ lessons </li>
                        <li>Recorded Session</li>
                        <li> Limited Personal Instructor Assistance</li>
                        <li> No Certificate </li>
                        
                    </ul>
                </div>



                <div className="columns">
                    <ul className="price">
                        <li className="header">Premium</li>
                        <li className="grey">₹ 15,000 / year</li>
                        <li> 30+ lessons </li>
                        <li>Live Session</li>
                        <li>Personal Instructor Assistance</li>
                        <li>Certificate</li>
                       
                    </ul>
                </div>
            </div>


        </div>
    )
} 