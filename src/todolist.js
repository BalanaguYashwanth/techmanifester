import React from 'react'
import {useState, useEffect} from 'react' 

function lists(){

    let [dummy,setName] = useState('null') 

    let [datas,setData] = useState([])

    function preview(e){
        if(e.target.value)
        {
            setName(e.target.value)
        }
        else{
            setName('please enter data')
        }
    }
    
    function add() {
       setData([ ...datas,  {
        id:datas.length,
        title:document.getElementById("name").value,
        completed:false,
       }])

       document.getElementById('name').value="";
    }

    function deleted(id,title){        
        for(let  obj in datas )
        {
            if(datas[obj].id==id)
            {
                datas[obj].completed= !datas[obj].completed
            }
        }
        setData([...datas])
    }

    function redirect(data){

        if(!data.completed)
        {
           return ( 
           <div>  
                <input type="checkbox" onClick={()=>deleted(data.id,data.title)}  />   {data.title} 
           </div>
           )
        }

        else if(data.completed) {
            return ( 
                <div style={{ textDecorationLine: 'line-through'   }}>  
                     <input type="checkbox" onClick={()=>deleted(data.id,data.title)}  />   {data.title} 
                </div>
                )
        }

    }

    useEffect(()=>{
        console.log('triggering any small action occurs only when re-renders')
    })


    return (
        <div>
          <p>  Preview : {dummy} </p>
        <input type="text" id="name" onChange={preview} />
        <button onClick={add} > submit </button>
       
        {
            datas.map((data) => (

                <div key={data.id}> 

                {redirect(data)}

                </div>
            )
            )
        }
       
        </div>
    )
}

export default lists
