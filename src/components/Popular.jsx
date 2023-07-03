import React from 'react'
import ContentWrapper from "./ContentWrapper"
import SwitchTabs from "./SwitchTab";
import { useState } from 'react';
import useFetch from "../hooks/UseFetch"
 import Carousel   from "./Carousel.jsx";
function Popular() {
    const [endPoint,setEndPoint]=useState("movie");
    const {loading,data}=useFetch(`/${endPoint}/popular`);

function onTabChange(tab,index){
    
    if(tab=="Movies") setEndPoint("movie");
    else setEndPoint("tv");
}
  return (
    <div className='
    carouselSection'>
      
          <ContentWrapper>
          <div className='carouselTitle'>What's Popular
              </div>

            <SwitchTabs data={["Movies", "Tv Shows"]}
    onTabChange={onTabChange}
      />
            
          </ContentWrapper>
    
       <Carousel 
       data={data?.results}
        loading={loading}
          endPoint={endPoint}
        />


    </div>
  )
}

export default Popular; 