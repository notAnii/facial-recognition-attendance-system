import { NextSeo } from 'next-seo'
import React from 'react'
import Sidebar from '../../components/sidebar/hero'
import Hero from "../../components/afterLogin/classes/hero"

type Props = {}

const Classes = (props: Props) => {
  return (
    <>
    
    <NextSeo title="Classes" />
    <Sidebar children={<Hero/>}/>
    
  </>
  )
}

export default Classes