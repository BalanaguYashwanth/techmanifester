import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
import Navbar from './navbar'
import ReactPlayer from 'react-player'
import Enroll from './enroll'
import { Player } from 'video-react';
import Iframe from 'react-iframe'


export default function playcourse() {
    const { course } = useParams(); // learn/:course is there and get {course} from useParams
    const [video, setVideo] = useState('https://vimeo.com/536190164/5048a5a975')
    const [show, setShow] = useState(true)
    const [overview, setOverview] = useState(null)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [payhide, setPayhide] = useState(false)
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        // document.addEventListener('contextmenu', (e) => {
        //     e.preventDefault();
        //   });

        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + window.atob(localStorage.getItem('access-token'))
            }
        }

        axios.get('https://online-new-courses.herokuapp.com/api/overview/', axiosConfig)
            .then(res => {
                let result = res.data
                let array = []
                for (let obj in result) {
                    if (result[obj].title == course) {
                        var datas = eval(result[obj].data)
                    }
                }

                for (let data in datas) {
                    datas[data].id = parseInt(data)
                    array.push(datas[data])

                }

                //console.log(array)
                setOverview(array)
            })
            .catch(err => console.log(err.message))


        axios.get('https://online-new-courses.herokuapp.com/userdetails', axiosConfig)
            .then(res => {
                //console.log(res.data)    
                let palldatas = res.data
                for (let obj1 in palldatas) {
                    var mainEmail = palldatas[obj1].email
                    setEmail(palldatas[obj1].email)
                    coursepayments(mainEmail)
                }


            })
            .catch(err => console.log(err))


        async function coursepayments(emailid) {

            //await setPayhide(localStorage.getItem('paid'))

            await axios.get('https://online-new-courses.herokuapp.com/api/coursepayments/', axiosConfig)
                .then(res => {
                    let alldata = res.data

                    for (let obj2 in alldata) {
                        if (alldata[obj2].email == emailid) {
                            if (alldata[obj2].productinfo == course && alldata[obj2].productinfo != '') {
                                if (alldata[obj2].hash_verified && alldata[obj2].hash_verified != '') {
                                    setPayhide(true)
                                    //localStorage.setItem('paid',true)
                                }
                            }
                        }
                    }
                })
                .catch(err => console.log(err))
            console.log('loading')
            setLoading(false)
        }

    }, [])



    function contentdata(content) {
        let arr = []
        for (let obj in content) {
            arr.push(content[obj])
        }

        //console.log(arr)

        return (
            <div>
                {
                    arr.map((value, index) => (
                        <button key={index} id="select" className={value.field} onClick={() => (setVideo(value.link))}>  {value.field}  </button>
                    ))
                }
            </div>
        )
    }

    // function retrive(vdata)
    // {
    //     return decodeURIComponent(vdata)
    // }

    return (
        <div>

            <Navbar />

            <div>
                {
                    loading && <div className="spinner-grow text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                }
            </div>
            {
                payhide && <div >
                    <div className="row no-gutters" >
                        <div className="col-md-9 no-gutters " >
                            <div className="leftside ">
                                {/* <ReactPlayer
                                    config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                    id="playvideocolor"
                                    onContextMenu={e => e.preventDefault()}
                                    url={window.atob(window.btoa(video))}
                                    className="react-player "
                                    controls
                                    width="100%"
                                    height="650px"
                                /> */}
                                <div className='player-wrapper'>
                                   <ReactPlayer
                                    config={{ file: { attributes: { controlsList: 'nodownload' },  } }}
                                    id="playvideocolor"
                                    onContextMenu={e => e.preventDefault()}
                                    url={window.atob(window.btoa(video))}
                                    className="react-player "
                                    controls
                                    width="100%"
                                    height="650px"
                                    playing
                                />
                                </div>

                                {/* <Iframe src="https://player.vimeo.com/video/534781158 "  onContextMenu={e => e.preventDefault()} width="1000" height="650" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen /> */}

                                <button id="select"> About :-  </button>

                                <p style={{ textAlign: 'center', margin: 10 }} >
                                    {"Hello People! Im K P Ranjith here! Im a full-time freelance Senior Android Trainer and Developer with 8 years of experience on Android Application Training and Development. I have delivered multiple training programs on Android across the globe.Numerous Corporate trainings for top MNCs like Vodafone India, Sapient corporation, sify technologies, top government organization's like power grid, top government institutions like IITs, top private institutions like BITS Pilani. And lots of colleges across India. :flag-in:"}

                                    {"I have Trained more than 3000 students in my career, who are all currently working as Android developers in top MNCs like Uber, Google, ZOHO, etc.I have delivered training for citizen's of different countries as well USA, japan, Malaysia, Bhutan. I have great passion for teaching, huge interest on Android. That is the reason I choose my profession as Android Trainer.I love interacting and igniting young :This is the short intro aboutPlease check this out  as well My Life With Android "}

                                </p>
                            </div>
                        </div>

                        <div className="col no-gutters" >

                            <div className="rightside" >

                                <button id="select" style={{ textAlign: 'center' }}   >  Course Syllabus  </button>

                                {
                                    overview && (overview).map((data, index) => (

                                        <div key={index} >

                                            <button id="select" style={{ textAlign: 'center' }} > {data.subtitle}  <i className="fa fa-caret-down"></i> </button>
                                            { show && <div> {contentdata(data.videos)} </div>}

                                            {/* <button id="select" style={{ textAlign: 'center' }}  >      <i className="fa fa-caret-down"></i> </button> */}
                                        </div>

                                    ))
                                }

                            </div>

                        </div>


                    </div>

                </div>
            }

            { !payhide && !loading && <Enroll />}


        </div>

    )
}

