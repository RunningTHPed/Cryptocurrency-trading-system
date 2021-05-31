import React from 'react'

export default function NotLoggedinButton() {
    return (
        <div>
            <li className="nav-item me-2 my-2">
                <a href="/login" className="btn btn-outline-success">LOGIN</a>
            </li>
            <li className="nav-item media my-2">
                <a href="/register" className="btn btn-outline-success">OPEN ACCOUNT</a>
            </li>
        </div>
    )
}