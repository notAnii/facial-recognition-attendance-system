import { NextSeo } from 'next-seo'
import React from 'react'
import Hero from '../components/user_home/hero'
import Header from '../components/header'

type Props = {}

const User_Home = (props: Props) => {
  return (
    <>
    <NextSeo title="User_Home" />
    <Hero children={undefined}/>
  </>
  )
}

export default User_Home