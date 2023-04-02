import { NextSeo} from "next-seo";
import Header from "../components/header";
import Hero from '../components/home/hero'
import Image from "next/image";
import { Box, Button } from "@chakra-ui/react";

const Home = () => (
  <>
    <Header />
    <NextSeo title="Home" />
    <Hero/>
    
  </>
);

export default Home;
