import React, {useState} from 'react'
import './App.css'
import Iframe from 'react-iframe'
import ReactPlayer from 'react-player'


function video(){

return(
    <div>
    <h1> hello </h1>

    <ReactPlayer
    config={{ file: { attributes: { controlsList: 'nodownload' } } }}

    onContextMenu={e => e.preventDefault()}

    url="https://drive.google.com/uc?export=download&id=1thcw_zs5cA1Loz9SyswWQPgh5mlJw8SX"
    className="react-player"
    controls
    width="100%"
    height="100%"
    />
    </div>
)
}


export default video
