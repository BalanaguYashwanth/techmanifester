import {useState} from 'react'
import React from 'react'
import Content from './content'

function nav(){
    const [name,setName]=useState('yesh')

    const [datas,setData]=useState([
    { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
    { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
    { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
    ])
    
    function handlechange(e){
       const name =document.getElementById('name').value
       setName(name)
    }

    return(
        <div>
            <Content handlechange={handlechange} datas={datas}  name={name} />    

        </div>
    )
}

export default nav


