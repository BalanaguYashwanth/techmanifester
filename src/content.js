import React from 'react'

function blogsdata({handlechange,datas,name}){
    return(
        <div> 
            hello datas
            <p>  doing good {name}</p>
            <input type="text" id="name" onChange={handlechange} />
           { 
                datas.map(function(data){
                    return(
                            <div key={data.id}> 
                            {data.title} 
                            <h2> {data.author} </h2> 
                            </div>
                     )
                })    
           }
         
        </div>
    )

}

export default blogsdata

