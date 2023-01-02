import { NextSeo } from 'next-seo'
import React from 'react'
import Hero from '../components/messi/hero'
import Header from '../components/header'

type Props = {}

const Messi = (props: Props) => {
  return (
    <>
    <NextSeo title="Messi" />
    <Hero/>
  </>
  )
}

export default Messi