import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import './websitestyle.css';

export default function Common() {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  )
}
