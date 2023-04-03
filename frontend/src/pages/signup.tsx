import { NextSeo } from 'next-seo'
import React from 'react'
import Hero from '../components/signup/hero'

type Props = {}

const Signup = (props: Props) => {
  return (
    <>
    <NextSeo title="Signup" />
    <Hero/>
  </>
  )
}

export default Signup