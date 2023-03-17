import { NextSeo } from 'next-seo'
import React from 'react'
import Sidebar from '../../components/admin/sidebar/hero'
import Hero from "../../components/admin/home/hero"

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