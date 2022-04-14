import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import renderHTML from 'react-render-html';
import parse from 'html-react-parser'


export default function enroll() {

    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [course, setCourse] = useState()
    const [phonenumber, setPhonenumber] = useState('')
    const [template, setTemplate] = useState({ 'name': 'yash' })
    const [feedback, setFeedback] = useState()
    const [action, setAction] = useState()
    const [courseslist, setCourseslist] = useState()

    useEffect(() => {
        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + window.atob(localStorage.getItem('access-token'))
            }
        }

        axios.get('https://online-new-courses.herokuapp.com/userdetails', axiosConfig)
            .then(res => {
                let result = res.data

                for (let obj in result) {
                    setUsername(result[obj].username)
                    setFirstname(result[obj].first_name)
                    setLastname(result[obj].last_name)
                    setEmail(result[obj].email)
                }

            })
            .catch(err => console.log(err))

        axios.get('https://online-new-courses.herokuapp.com/api/courses/', axiosConfig)
            .then(res => {
                setCourseslist(res.data)
            })
            .catch(err => console.log(err))

    }, [])


    function press() {
        //console.log('phone',(phonenumber.length))

        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + window.atob(localStorage.getItem('access-token'))
            }
        }

        if (course != '' && phonenumber != '') {
            if (phonenumber.length == 10) {
                axios.post('https://online-new-courses.herokuapp.com/payment', {
                    firstname: firstname,
                    lastname: lastname,
                    phone: phonenumber,
                    email: email,
                    course: course,
                    udf1: window.atob(localStorage.getItem('access-token')),
                }, axiosConfig)
                    .then(async res => {
                        let alldetails = {}

                        let paydetail = res.data

                        for (let obj in paydetail) {
                            alldetails[obj] = paydetail[obj]
                        }

                        await setTemplate(alldetails)

                    })
                    .catch(err => console.log(err.message))

                setFeedback('please wait...')

                setTimeout(() => {
                    document.payuForm.submit()
                }, 3000);

            }
            else {
                console.log('please enter 10 digit phonenumber')
                setFeedback('please enter 10 digit phonenumber')
            }
        }

        else {
            console.log('please enter correct details')
            setFeedback('please enter correct details')
        }

    }


    return (
        <div className="container" >

            <h3>  Please confirm us again </h3>


            <input className="input" type="number" placeholder="Enter the phonenumber" onChange={(e) => setPhonenumber(e.target.value)} />

            <br />

            <select onChange={(e) => setCourse(e.target.value)}  >
                <option value="" > select the course  </option>
                {
                    courseslist && courseslist.map((course, index) => (
                        <option value={course.title} key={index} > {course.title} </option>
                    ))
                }

            </select>

            <br />


            <form action="https://secure.payu.in/_payment" method="post" name="payuForm">

                <input type="hidden" name="key" value={template['key'] || ''} />
                <input type="hidden" name="hash_string" value={template['hash_string'] || ''} />
                <input type="hidden" name="hash" value={template['hashh'] || ''} />
                <input type="hidden" name="posted" value={template['posted'] || ''} />
                <input type="hidden" name="txnid" value={template['txnid'] || ''} />
                <input type="hidden" name="amount" value={template['amount'] || ''} />
                <input type="hidden" name="firstname" id="firstname" value={template['firstname'] || ''} />
                <input type="hidden" name="email" id="email" value={template['email'] || ''} />
                <input type="hidden" name="phone" value={template['phone'] || ''} />
                <textarea type="hidden" name="productinfo" style={{ display: 'none' }} value={template['productinfo'] || ''} ></textarea>

                <input type="hidden" name="surl" value={template['surl'] || ''} size="64" />
                <input type="hidden" name="furl" value={template['furl'] || ''} size="64" />
                <input type="hidden" name="service_provider" value={template['service_provider'] || ''} size="64" />
                <input type="hidden" name="lastname" id="lastname" value={template['lastname'] || ''} />
                <input type="hidden" name="address1" value={template['address1'] || ''} />
                <input type="hidden" name="address2" value={template['address2'] || ''} />
                <input type="hidden" name="city" value={template['city'] || ''} />
                <input type="hidden" name="state" value={template['state'] || ''} />
                <input type="hidden" name="country" value={template['country'] || ''} />
                <input type="hidden" name="zipcode" value={template['zipcode'] || ''} />
                <input type="hidden" name="udf1" value={template['udf1'] || ''} />
                <input type="hidden" name="udf2" value={template['udf2'] || ''} />
                <input type="hidden" name="udf3" value={template['udf3'] || ''} />
                <input type="hidden" name="udf4" value={template['udf4'] || ''} />
                <input type="hidden" name="udf5" value={template['udf5'] || ''} />

            </form>

            {feedback}

            <button onClick={() => (press())} >  Enroll    </button>

        </div>
    )

}
