import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
    const location = useLocation();
  return (
    <nav className="container navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">CRUD App React </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           
            <li className="nav-item">
                <Link className={`nav-link ${location.pathname ==='/' ? 'active' : ''}`} to={'/'}> <i className='fas fa-home'></i> Home</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${location.pathname ==='/create' ? 'active' : ''}`} to={'/create'}><i className='fas fa-plus'></i>Create Task</Link>
            </li>
          
          
            </ul>
          
        </div>
        </div>
  </nav>
  )
}

export default Header
