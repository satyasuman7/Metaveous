import React from 'react'
import { Link } from 'react-router-dom'

export default function BreadCrumb({ title }) {
  return (
    <div className="container-fluid breadcrumb_card text-center text-white">
      <h1 className="fw-bold mb-3 text-uppercase">{title}</h1>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb justify-content-center">  
          <li className="breadcrumb-item">
            <Link to="/" className="text-white text-decoration-none">Home</Link>
          </li>
          <li className="breadcrumb-item active text-white" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
    </div>
  );
}
