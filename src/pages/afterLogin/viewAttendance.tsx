import { NextSeo } from 'next-seo'
import React from 'react'
import Sidebar from '../../components/sidebar/hero'
import Hero from "../../components/afterLogin/viewAttendance/hero"

type Props = {}

const viewAttendance = (props: Props) => {
  return (
    <>
    
    <NextSeo title="View Attendance" />
    <Sidebar children={<Hero/>}/>
    
  </>
  )
}

export default viewAttendance