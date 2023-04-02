import { NextSeo } from 'next-seo'
import React from 'react'
import Sidebar from '../../components/admin/sidebar/hero'
import Hero from "../../components/admin/edit/hero"

type Props = {}

const Edit = (props: Props) => {
  return (
    <>
    
    <NextSeo title="Edit" />
    <Sidebar children={<Hero/>}/>
    
    
  </>
  )
}

export default Edit