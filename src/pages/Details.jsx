import React from 'react'
import "./details.scss";
import { useParams } from 'react-router-dom';
import DetailsBanner from '../components/DetailsBanner';
import useFetch from '../hooks/UseFetch';
import Cast from"../components/Cast"
import VideosSection from '../components/VideosSection';
import Similar from '../components/Similar';
import Recommendation from '../components/Recommendation';
const Details = () => {
  const {mediaType,id}=useParams();
  const {data,loading}=useFetch(`/${mediaType}/${id}/videos`);
  const {data:credits,loading:creditsLoading}=useFetch(`/${mediaType}/${id}/credits`);
 

  return (
    <div>
  
      <DetailsBanner video={data?.results?.[0]}
        crew={credits?.crew}
      />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection  data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details