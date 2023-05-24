import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem';
import { Link } from 'react-router-dom';


export default function Movies() {
  const [movies, setMovies] = useState([]);
  let mediaType = 'movie'
  let nums = new Array(10).fill(1).map((elem ,index)=>index+1);
  // console.log(nums);

  async function getTrending(page){
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`);
    setMovies(data.results);
    // console.log(data.results)
  }

  useEffect(()=>{
    getTrending(1);
  } ,[])

  return <>
  <div className="row">
    {movies.map((item,index)=>
    <div key={index} className="col-md-3">
    <Link className='text-decoration-none text-white' to={`/ItemDetails/${item.id}/${mediaType}`}>
      <div className='position-relative'>
      <img src={'https://image.tmdb.org/t/p/w500'+item.poster_path} className='w-100' alt="" />
      <h4 className='h6 my-2'>{item.title}</h4>
     <div className='vote p-1 position-absolute top-0 end-0'>{item.vote_average}</div>
      </div>
      
      </Link>
  
    </div>

    
    )}
  
  </div>
  <nav className='py-5'>
    <ul className='pagination pagination-sm d-flex justify-content-center'>
      {nums.map((page)=>
      <li key={page} onClick={()=>getTrending(page)} className='page-item p-1'>
      <Link className='page-link bg-transparent text-white'>{page}</Link>
    </li>
    )}
      
    </ul>
  </nav>
  </>
}
