import React from 'react'
import "./Home.scss";
import HeroBanner from '../components/HeroBanner';
import Trending from '../components/Trending';
import Popular from '../components/Popular';
import TopRated from '../components/TopRated';
const Home = () => {
  return (
    <div className='Home'>
    <HeroBanner />
    <Trending />
    <Popular />
    <TopRated />

    </div>
  )
}

export default Home