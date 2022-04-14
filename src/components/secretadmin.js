import axios from 'axios'
import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar'

export default function admin() {

    const [admin,setAdmin] = useState()

    const [subfields, setSubfields] = useState(
        [
            {
                id: 1,
                subtitle: 'enter subfields',
                videos: [{ id: 1, field: "enter field", link: "enter the link" }]
            },
          
        ]
    )

    const [title, setTitle] = useState()
    const [result, setResult] = useState()
    const [options, setOptions] = useState()

    useEffect(() => {

        let axiosConfig={
            headers:{
                Authorization:"Token "+window.atob(localStorage.getItem('admin-token'))
            }
        }

        axios.get('https://online-new-courses.herokuapp.com/api/courses/',axiosConfig)
        .then(res=>{
            console.log(res.data)
            setOptions(res.data)
        })
        .catch(err=>console.log(err))

        axios.get('https://online-new-courses.herokuapp.com/usergroups',axiosConfig)
        .then(res=>{
            setAdmin(res.data.admin)
        })
        .catch(err=>console.log(err))


        axios.get('https://online-new-courses.herokuapp.com/api/overview/',axiosConfig)
            .then(res => {
                //console.log(res.data)
                setResult(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    function add(field) {
        let svideo = field.videos.length

        field.videos.push(
            {
                id: svideo + 1,
                field: "enter field",
                link: "enter the links",
            }
        )

        setSubfields([...subfields])
        //console.log(subfields)           //required
        // setFields([...fields, { fields: '' }])
    }

    function addsubfields() {
        let obj = {
            id: subfields.length + 1,
            subtitle: 'enter subfields',
            videos: [{ id: 1, field: "enter field", link: "enter the link" }]
        }
        setSubfields([...subfields, obj])
        console.log(subfields)
    }


    function handlesubtitle(text, index) {
        subfields[index].subtitle = text
    }

    function handlevideos(text, index, mainindex) {
        subfields[mainindex].videos[index].field = text
        //console.log(subfields)
    }

    function handlevideoslink(link, index, mainindex) {
        subfields[mainindex].videos[index].link = link
        // console.log(subfields)
    }

    function posting() {
        console.log(title)
        let axiosConfig={
            headers:{
                Authorization:"Token "+window.atob(localStorage.getItem('admin-token'))
            }
        }

        axios.post('https://online-new-courses.herokuapp.com/api/overview/', {
            title: title,
            data: subfields,
        },axiosConfig)
            .then(res => {
                console.log(res)
                location.reload()
            })
            .catch(err => console.log(err))
    }


    function videoslist(valvideo, mainindex) {

        return (
            <div>
                {
                    valvideo.map((val, index) => (
                        <div key={index}>
                            <li>  <input placeholder={val.field} onChange={(e) => handlevideos(e.target.value, index, mainindex)} />   </li>
                            <li>  <input placeholder={val.link} onChange={(e) => handlevideoslink(e.target.value, index, mainindex)} />    </li>
                        </div>
                    ))
                }
            </div>
        )
    }

    function deleting(id,title){

        let axiosConfig={
            headers:{
                Authorization:"Token "+window.atob(localStorage.getItem('admin-token'))
            }
        }
        
        axios.delete('https://online-new-courses.herokuapp.com/api/overview/'+id+'/',axiosConfig)
        .then(res=>{
            alert( 'Successfully deleted course link :- '+title)
            location.reload()
        })
        .catch(err=>err)
    }

    return (
        <div>
            <div>
            <AdminNavbar />
            <div className="row no-gutters" >
                <div className="col-md-6 no-gutters" >
                    <div className="leftside" >
                        <div className="container" style={{ margin: 'auto', paddingTop: '15%' }} >
                            <h3>  Course Links </h3>
                            <ul>
                                <li>
                                    Title <select  onChange={(e)=> setTitle(e.target.value)} >
                                    <option  value=""> -- select an option -- </option>
                                        {
                                            options && options.map((option)=>(
                                                <option key={option.id} value={option.title} > {option.title} </option>
                                            ))
                                        }    
                                        </select> 
                                   
                                    {/* Title <input placeholder="enter the title" onChange={(e) => setTitle(e.target.value)} /> */}
                                    <ul>
                                        {
                                            subfields.map((field, index) => (
                                                <li key={index} >
                                                    subtitle <input placeholder={field.subtitle} onChange={(e) => (handlesubtitle(e.target.value, index))} />
                                                    <ul>
                                                        <li>
                                                            videos
                                           <ul> {videoslist(field.videos, index)} </ul>
                                                            <button onClick={() => (add(field))} > + </button>
                                                        </li>

                                                    </ul>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <button onClick={addsubfields} > + </button>
                                </li>
                                <br />
                                <button onClick={posting}> submit </button>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col no-gutters" >
                    <div className="rightside">
                        <div className="container" style={{ margin: 'auto', paddingTop: '15%' }} >
                            <h3>  Updated Course Links </h3>

                            {
                                result && result.map((res, index) => (
                                    <div key={index}>
                                    <div className="card bg-light mb-3" style={{ width: '18rem' }} >
                                        <div className="card-body px-5 ">
                                            <p className="card-title "> {index+1})   {res.title}  <button style={{float:'right',border:'None'}} onClick={() => deleting(res.id,res.title) } > <i className="far fa-trash-alt"></i></button> </p>
                                        </div>
                                    </div>
                                </div>
                                       
                                ))
                            }

                        </div>
                    </div>
                </div>

            </div>


            </div>
        </div>

    )
}

