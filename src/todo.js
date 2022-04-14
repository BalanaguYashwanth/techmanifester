import React from 'react'
import Lists from './todolist'

function todo(){
    return(
        <div style={{marginLeft:"35%"}} >
            <p style={{ marginBottom:"0px",fontWeight:"bold",fontSize:44,}}> hello todos </p>
            <Lists />
        </div>
    )
}

export default todo
