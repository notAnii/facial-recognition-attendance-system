import { NextSeo } from 'next-seo'
import React from 'react'
import Sidebar from '../components/sidebar/hero'
import Header from '../components/header'

type Props = {}

const User_Home = (props: Props) => {
  return (
    <>
    <NextSeo title="User_Home" />
    <Sidebar children={undefined}/>
  </>
  )
}

export default User_Home