import React,{useState,useEffect} from 'react'
import axios from 'axios'

function blogContent({datas}){

    return(
        <div>
            {
                datas.map( (data,index ) =>
                ( 
                   <div key={index} >
                       <p> {data.text} </p>
                    </div>
                )     
                )
            }
        </div>
    )
}

export default blogContent


