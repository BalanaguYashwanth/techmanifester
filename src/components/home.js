import React, {useState} from 'react'
import Navbar from './navbar'
import Courses from './courses'
 
function home(){
    return(
        <div id="full" > 
            <Navbar />
            <div   className="courses">
               <Courses />
            </div>

        </div>
    )
}

export default home