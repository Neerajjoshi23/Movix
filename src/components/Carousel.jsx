import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import dayjs from "dayjs";

import ContentWrapper from "./ContentWrapper";
import Img from "./imageLoadingLazy";
import posterFallback from "../assets/Moviex-images/no-poster.png";
import "./Carousel.scss";
import dayjs from "dayjs";
import CircleRating from "./CircleRating";
import Genres from "./Genres";

function Carousel({data,loading,endPoint,title})   {
    const carouselContainer=useRef(null); 
    const {url} =useSelector((state)=>state.home); 
    const navigate=useNavigate();
    function navigation(dir){
          const container=carouselContainer.current;
          let scrollAmount=
          (dir==="left")?(container.scrollLeft-(container.offsetWidth+30)):
          (container.scrollLeft+(container.offsetWidth+30));

          container.scrollTo({
            behavior:"smooth",
            left: scrollAmount,
          })
    }
 const skItems=()=>{
   return (
    <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock skeleton"></div>
        <div className="date skeleton"></div>
    </div>
   )
 }
  return (
    <div className="carousel">

        <ContentWrapper>
        {
            title &&
            <div className="carouselTitle">{title}</div>
        }
            <BsFillArrowLeftCircleFill
                className="carouselLeftNav arrow"
                onClick={()=>{
                    navigation("left")
                }}
            />
            <BsFillArrowRightCircleFill
                className="carouselRightNav arrow"
                onClick={()=>{
                    navigation("right")
                }}
            />
            {
                !loading?
                (<div className="carouselItems"
                ref={carouselContainer }>
                   {
                    data?.map((item)=>{

                        const posterUrl=(item.poster_path)?(
                            `${url.poster}${item.poster_path}`):(posterFallback)
                        
                        return (
                            <div key={item.id}
                             className="carouselItem"
                             onClick={()=>{
                                navigate(`/${item.media_type || endPoint}/${item.id}`)
                             }}>
                                <div className="posterBlock">
                                    <Img src={posterUrl}></Img>
                                    <CircleRating rating={item.vote_average.toFixed(1)}/>
                                    <Genres data={item.genre_ids.slice(0,2)} />
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {item.name || item.title}
                                    </span> 
                                    <span>
                                        {dayjs(item.release_Date).format("MMM D, YYYY")}
                                    </span>
                                </div>
                             </div>

                        )
                    })
                   }
                </div>)
                :
                ( <div className="loadingSkeleton">
               
                    {skItems()}
                    {skItems()}
                    {skItems()}
                    {skItems()}
                    {skItems()}
                </div>)
            }
        </ContentWrapper>
    </div>
  )
}

export default Carousel