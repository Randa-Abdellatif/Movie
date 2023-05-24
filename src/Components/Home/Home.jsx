import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem';


export default function Home() {

  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [people, setPeople] = useState([]);

  async function getTrending(mediaItem , callback){
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaItem}/week?api_key=f597813c136fdbe4ff8e3e2976da14ad`);
    callback(data.results);
    // console.log(data.results)
  }

  useEffect(()=>{
    getTrending('movie', setMovies);
    getTrending('tv', setTv);
    getTrending('person', setPeople);
  } ,[])


  return (
    <>
    {movies[0]? <>
     <div className="row py-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-3"></div>
        <h2 className='h4'>Trending <br />Movies <br />Right Now</h2>
        <p className='text-muted'>Top Trending Movies By Week</p>
        <div className="brdr w-100 mb-3"></div>
        </div>
        
      </div>
      {movies.slice(0,10).map((item , index)=> <MediaItem key={index} item ={item}/>)}
    </div>

    <div className="row py-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-3"></div>
        <h2 className='h4'>Trending <br />tv <br />Right Now</h2>
        <p className='text-muted'>Top Trending tv By Week</p>
        <div className="brdr w-100 mb-3"></div>
        </div>
        
      </div>
      {tv.slice(0,10).map((item , index)=> <MediaItem key={index} item ={item}/>)}
    </div>

    <div className="row py-5">
      <div className="col-md-4 d-flex align-items-center">
        <div>
        <div className="brdr w-25 mb-3"></div>
        <h2 className='h4'>Trending <br />people <br />Right Now</h2>
        <p className='text-muted'>Top Trending people By Week</p>
        <div className="brdr w-100 mb-3"></div>
        </div>
        
      </div>
      {people.slice(0,10).map((item , index)=> <MediaItem key={index} item ={item}/>)}
    </div>
    </>:<div className='d-flex vh-100 align-items-center justify-content-center'>
      <i className='fas fa-spinner fa-spin fa-8x' ></i>
      </div>}
   
   
    </>
    )
}
