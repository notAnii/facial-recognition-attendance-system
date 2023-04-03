import { NextSeo } from 'next-seo'
import React from 'react'
import Sidebar from '../../components/sidebar/hero'
import Hero from "../../components/afterLogin/home/hero"

type Props = {}

const Home = (props: Props) => {
  return (
    <>
    
    <NextSeo title="Home" />
    <Sidebar children={<Hero/>}/>
    
    
  </>
  )
}

export default Home