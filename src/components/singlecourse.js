import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import Playcourse from './playcourse'

export default function single({datas}) {
    return(
        <div> 
            <form>
            <div>
                <div className="row" id="single" >
                {
                    datas.map( (data) => 
                    (
                        <div  className="col-md-2"  style={{margin:'50px'}}  key={data.id} > 
                            <p> <Link  to={`/learn/${data.title}`}  > {data.title}  </Link> </p>
                            <img id="individual" src={data.imgurl} height="135" width="240" />  
                        </div>
                    ) 
                    )
                }
                </div>
            </div>
            </form>
        </div>
    )
}
