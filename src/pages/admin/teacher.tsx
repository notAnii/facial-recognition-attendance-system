import { NextSeo } from 'next-seo'
import React from 'react'
import Sidebar from '../../components/admin/sidebar/hero'
import Hero from "../../components/admin/teacher/hero"

type Props = {}

const Teacher = (props: Props) => {
  return (
    <>
    
    <NextSeo title="Teacher" />
    <Sidebar children={<Hero/>}/>
    
    
  </>
  )
}

export default Teacher