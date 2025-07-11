import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Bloglist from '../components/Bloglist'
import Newletter from '../components/Newletter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <Navbar />
    <Header />
    <Bloglist/>
    <Newletter/>
    <Footer />
    </>
  )
}

export default Home