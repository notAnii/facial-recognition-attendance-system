import { NextSeo } from 'next-seo'
import React from 'react'
import Sidebar from '../../components/admin/sidebar/hero'
import Hero from "../../components/admin/student/hero"

type Props = {}

const Student = (props: Props) => {
  return (
    <>
    
    <NextSeo title="Student" />
    <Sidebar children={<Hero/>}/>
    
    
  </>
  )
}

export default Student