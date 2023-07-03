import React,{useState,useEffect} from 'react';
import "./SearchResult.scss";
import { useParams } from 'react-router-dom';
import ContentWrapper from "../components/ContentWrapper";
import InfiniteScroll from 'react-infinite-scroll-component';
import {fetchDataFromApi} from "../utlis/api";
import noResult from "../assets/Moviex-images/no-results.png";
import Spinner from '../components/Spinner';
import MovieCard from "../components/MovieCard";

const SearchResult = () => {
  const [data,setData]=useState(null);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false);
  const {query} =useParams();
  const fetchInitailData= async ()=>{
     setLoading(true);
     const result=await fetchDataFromApi(`/search/multi?query=${query}&page=${page}`);
     console.log(result);
     setData(result);
     setPage((prev)=>prev+1);
     setLoading(false);

  }
  const fetchNextPageData = async () => {
    const res=await fetchDataFromApi(`/search/multi?query=${query}&page=${page}`);
    console.log("response is",res);
    setData(()=>{
      return {
        ...data,
         results:[...data?.results,...res?.results],
      }
    })
     
}

  useEffect(()=>{
    fetchInitailData();
  },[query])
   
  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && 
      <ContentWrapper>
        {
          (data?.results.length>0)?(
            <>
            <div className="pageTitle">
              {
                `Search ${
                  data?.total_results>1
                  ? "results":"result"
                }`
              }

            </div>
            <InfiniteScroll
            className='content'
            dataLength={data?.results?.length || []}
            next={fetchNextPageData}
            hasMore={page<=data?.total_pages}
            loader={<Spinner/>}
             >
                {
                  data.results.map((item,index)=>{
                    if(item.media_type==="person" ) return;
                    return (
                      <MovieCard key={index} data={item} fromSearch={true} />
                    )
                  })
                }
            </InfiniteScroll>
            </>
          ):(
              <span className='noResultFound'>Sorry No Result Found</span>
          )
        }
      </ContentWrapper>}
    </div>
  )
}

export default SearchResult