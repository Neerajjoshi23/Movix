import { useEffect, useState } from 'react'
import { fetchDataFromApi } from './utlis/api'
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './slice/HomepageSlice';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import PageNotFound from "./pages/PageNotFound";
import Details from './pages/Details';
import Explore from './pages/Explore';
import Footer from './components/Footer';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';

function App() {

     const dispatch=useDispatch();
     const {url}=useSelector((state)=>{
      return state.home;
     });
   

  const getConfig=()=>{
    fetchDataFromApi("/configuration").then((res)=>{
      
         
         const url={
              backdrop:res.images.secure_base_url+"original",
              poster:res.images.secure_base_url+"original",
              profile:res.images.secure_base_url+"original",

         }
         dispatch(getApiConfiguration(url));
        
    });}
useEffect(()=>{
  
    getConfig();
    genresCall();
},[])

const genresCall= async ()=>{
  let promise=[];
  let endPoint=["tv","movie"];
  let allGenres={};
  endPoint.forEach((genre)=>{
    promise.push(fetchDataFromApi(`/genre/${genre}/list`));
  })
  const data=await Promise.all(promise);
  
  data.forEach((genre)=>{
    
    genre.genres.map((item)=>{
    
      allGenres[item.id]=item.name;
    })
  })
  dispatch(getGenres(allGenres));
  
}


  

  return (
  <div>
  <Header />

    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/:mediaType/:id" element={<Details />}/>
      <Route path="/search/:query" element={<SearchResult />}/>
      <Route path="/explore/:mediaType" element={<Explore />}/>
      <Route path="*" element={<PageNotFound />}/>  
    </Routes>
    
    <Footer />
  </div>
  )
}

export default App
