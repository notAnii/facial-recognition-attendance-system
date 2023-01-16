import { NextSeo } from 'next-seo'
import React from 'react'
import Sidebar from '../../components/sidebar/hero'
import Hero from "../../components/afterLogin/mail/hero"

type Props = {}

const Mail = (props: Props) => {
  return (
    <>
    
    <NextSeo title="Mail" />
    <Sidebar children={<Hero/>}/>
    
  </>
  )
}

export default Mail