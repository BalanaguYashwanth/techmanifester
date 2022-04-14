import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function navbar() {

    const [dropdown, setDropdown] = useState(false)

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <a className="navbar-brand mx-5 " href="#">Tech Manifester</a>
                <button onClick={() => setDropdown(!dropdown)} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="dropdown1"  >
                    {
                        dropdown &&    <ul className="ul">

                        <li className="li">
                            <Link to="/" className="nav-link1">Courses <span className="sr-only"></span></Link>
                        </li>
                        <li className="li">
                            <Link to="/pricing" className="nav-link1"> Pricing </Link>
                        </li>
                        <li className="li">
                            <Link className="nav-link1" to='/about' >About</Link>
                        </li>
                        <li className="li">
                            {
                                localStorage.getItem('access-token') ? (<Link to="/logout" className="nav-link1" href="#">logout</Link>) :

                                    (<Link to="/login" className="nav-link1" href="#">Login</Link>)

                            }
                        </li>
                    </ul>

                    }

                </div>
                

                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">

                        <li className="nav-item ">
                            <Link to="/" className="nav-link">Courses <span className="sr-only"></span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/pricing" className="nav-link"> Pricing </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/about' >About</Link>
                        </li>
                        <li className="nav-item">
                            {
                                localStorage.getItem('access-token') ? (<Link to="/logout" className="nav-link" href="#">logout</Link>) :

                                    (<Link to="/login" className="nav-link" href="#">Login</Link>)

                            }
                        </li>
                    </ul>
                </div>

            </nav>

        </div>
    )
}

export default navbar

