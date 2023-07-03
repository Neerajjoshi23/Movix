import React from 'react'
import "./Genres.scss";
import { useSelector } from 'react-redux';

const Genres = ({data}) => {
    const {genres}=useSelector((state)=> state.home);
   
  return (
    <div className='genres'>
   {  data?.map((id)=>{
      return  <div  key={id} className="genre">{genres[id]}</div>
   })
   }
    </div>
  )
}

export default Genres