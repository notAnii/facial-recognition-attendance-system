import { NextSeo } from 'next-seo'
import React from 'react'
import Sidebar from '../../components/sidebar/hero'
import Hero from "../../components/afterLogin/notifications/hero"

type Props = {}

const Notifications = (props: Props) => {
  return (
    <>
    
    <NextSeo title="Notifications" />
    <Sidebar children={<Hero/>}/>
    
  </>
  )
}

export default Notifications