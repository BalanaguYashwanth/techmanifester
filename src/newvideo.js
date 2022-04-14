import React, { Component } from 'react';
import VideoPlayer from 'react-video-js-player';
 
class VideoApp extends Component {
    player = {}
    state = {
        video: {
            src: "https://youtu.be/lVJLNsLNnWs",
        }
    }
 
    render() {
        return (
            <div>
                <VideoPlayer
                onContextMenu={e => e.preventDefault()}
                    controls={true}
                    src={this.state.video.src}
                    width="720"
                    height="420"
                />
            </div>
        );
    }
}
export default VideoApp;

