import React from 'react'
import ContentWrapper from "./ContentWrapper"
import SwitchTabs from "./SwitchTab";
import { useState } from 'react';
import useFetch from "../hooks/UseFetch"
 import Carousel   from "./Carousel.jsx";
function Trending() {
    const [endPoint,setEndPoint]=useState("day");
    const {loading,data}=useFetch(`/trending/all/${endPoint}`);

function onTabChange(tab,index){
    
    if(tab=="Day") setEndPoint("day");
    else setEndPoint("week");
}
  return (
    <div className='
    carouselSection'>
      
          <ContentWrapper>
          <div className='carouselTitle'>Trending
              </div>

            <SwitchTabs data={["Day", "Week"]}
    onTabChange={onTabChange}
      />
            
          </ContentWrapper>
    
       <Carousel 
       data={data?.results}
        loading={loading}/>


    </div>
  )
}

export default Trending; 