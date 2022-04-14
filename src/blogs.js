import React,{useState,useEffect} from 'react'
import axios from 'axios'
import BlogContent from './blog-lists'


function blogs(){
    const [name,setName] = useState('yash')
    const[datas,setDatas] = useState(null)

  
    useEffect(() => {
        axios.get('https://particle-ae921-default-rtdb.firebaseio.com/users.json')
        .then(res=>{
            var res=res.data
            var array=[]
            for(var obj in res)
            {
                res[obj].id=obj
                array.push(res[obj])
            }
            console.log(array)
            setDatas(array)
        })
        .catch(err=>(err.message))
    },[])


    return (
        <div style={{textAlign:'center'}} >
            <h1 > Blogs</h1>

            <input placeholder="enter the name" id="name" onChange={ (e) => ( setName(e.target.value)) }/> 
            <button onClick={() => ((
                axios.post('https://particle-ae921-default-rtdb.firebaseio.com/users.json',{
                    text:name,
                })
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>console.log(err))
            ),
            document.getElementById('name').value=""

                )} > 
                submit
            </button>

            { datas && <BlogContent datas={datas}  />}
           
        </div>
    )
}

export default blogs
