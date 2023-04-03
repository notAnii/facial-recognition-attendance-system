import { NextSeo } from 'next-seo'
import React from 'react'
import Sidebar from '../../components/sidebar/hero'
import Hero from "../../components/afterLogin/attend/hero"

type Props = {}

const Attend = (props: Props) => {
  return (
    <>
    
    <NextSeo title="Attend" />
    <Sidebar children={<Hero/>}/>
    
  </>
  )
}

export default Attend