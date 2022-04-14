import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Single from './singlecourse'

export default function courses(){
    const [datas,setDatas] = useState(null)
    
    useEffect(() =>{
        let axiosConfig={
            headers:{
                Authorization : "Bearer " +window.atob(localStorage.getItem('access-token'))
            }
        }

        axios.get('https://online-new-courses.herokuapp.com/api/courses/',axiosConfig)
        .then( res => {
            let datas = res.data
            setDatas(datas)
        })
        .catch(err=>console.log(err))
    },[])

    return (
        <div>
          { datas && <Single datas={datas} /> }
        </div>
    )
}
