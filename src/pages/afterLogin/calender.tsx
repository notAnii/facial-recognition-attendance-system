import { NextSeo } from 'next-seo'
import React from 'react'
import Sidebar from '../../components/sidebar/hero'
import Hero from "../../components/afterLogin/calender/hero"

type Props = {}

const Calendar = (props: Props) => {
  return (
    <>
    
    <NextSeo title="Calendar" />
    <Sidebar children={<Hero/>}/>
    
  </>
  )
}

export default Calendar