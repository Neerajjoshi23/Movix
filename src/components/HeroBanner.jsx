import React, { useEffect, useState } from 'react'
import "./HeroBanner.scss";
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/UseFetch';
import { useSelector } from 'react-redux';
import Img from './imageLoadingLazy';
import ContentWrapper from './ContentWrapper';
const HeroBanner = () => {
   const [background,setBackground]=useState('');
   const [query,setQuery]=useState('');
   const {url}=useSelector((state)=>state.home);
   const navigate=useNavigate();
   const {data,loading}=useFetch("/movie/upcoming");

   function queryHandler(event){
         if( event.key==='Enter') {
          setQuery(event.target.value);   
        }
        if(query.length>0) navigate(`/search/${query}`);
   }
  
   
  useEffect(()=>{
       const bg=url.backdrop+data?.results[Math.floor(Math.random()*20)]?.backdrop_path;
       setBackground(bg);

  },[data]);

  return (
     <div className='herobanner'>
     {
      !loading&& <div className='backdrop-img'>
      <Img src={background} className="img" />
     </div>
     }
     <div className='opacity-layer'></div>
     <ContentWrapper>
      
     <div className='wrapper'>
        <div className='heroBannerContent'>
          <span className='title'>Welcome,</span>
          <span className='subTitle'>Millions of movies, TV shows and people to discover. Explore now.</span>
          <div className='searchInput'>
            <input 
            type='text'
            placeholder='Search For Movie Or Tv Series....'
            onKeyUp={queryHandler}
            className='input'
></input>
            <button className='button'>Search</button>
          </div>
        </div>

      </div>
     </ContentWrapper>
    

     </div>



  )
}

export default HeroBanner