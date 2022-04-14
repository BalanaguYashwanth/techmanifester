import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function AdminNavbar() {

    const [adropdown, setADropdown] = useState(false)

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <a className="navbar-brand mx-5 " href="#">Tech Manifester-Admin</a>
                <button onClick={() => setADropdown(!adropdown)} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="dropdown1"  >
                    {
                        adropdown &&  <ul className="ul">

                        <li className="li ">
                            <Link to="/updatelist" className="nav-link1"> Lists <span className="sr-only"></span></Link>
                        </li>
                        <li className="li">
                            <Link to="/secretadmin" className="nav-link1"> Overview </Link>
                        </li>

                        <li className="li">
                            {
                                localStorage.getItem('admin-token') ? (<Link to="/adminlogout" className="nav-link1" href="#">logout</Link>) :

                                    (<Link to="/adminlogin" className="nav-link1" href="#">Login</Link>)

                            }
                        </li>
                    </ul>
                    }

                </div>


                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">

                        <li className="nav-item ">
                            <Link to="/updatelist" className="nav-link"> Lists <span className="sr-only"></span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/secretadmin" className="nav-link"> Overview </Link>
                        </li>

                        <li className="nav-item">
                            {
                                localStorage.getItem('admin-token') ? (<Link to="/adminlogout" className="nav-link" href="#">logout</Link>) :

                                    (<Link to="/adminlogin" className="nav-link" href="#">Login</Link>)

                            }
                        </li>
                    </ul>
                </div>

            </nav>

        </div>
    )
}

export default AdminNavbar

