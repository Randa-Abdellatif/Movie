import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";


export default function ItemDetails() {
    let{id , media_type} = useParams();
    // console.log(id,media_type)
    const [itemDetails, setitemDetails] = useState({});
    const [itemSimilar, setitemSimilar] = useState(null)
    async function getDetails(id,media_type){
        let{data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=17b298ae0059cae92c44d098e175fc1f&language=en-US`)
        setitemDetails(data);
        // console.log(data)
    }

    async function getSimilar(movie_id,media_type){
      let {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${movie_id}/similar?api_key=17b298ae0059cae92c44d098e175fc1f&language=en-US&page=1`)
      setitemSimilar(data.results);
      // console.log(data.results);
    }

    useEffect(()=>{
        getDetails(id,media_type);
        getSimilar(id,media_type);
    },[])

    useEffect(() => {
      //Runs on every render
      getDetails(id,media_type);
      getSimilar(id,media_type);
    });

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };


  return <>
  <div className="row">
  <div className="col-md-4">
  {itemDetails.poster_path?<img src={'https://image.tmdb.org/t/p/w500'+itemDetails.poster_path} className='w-100' alt="" />
    :<img src={'https://image.tmdb.org/t/p/w500'+itemDetails.profile_path} className='w-100' alt="" />}
  </div>
  <div className="col-md-8">
  <h1  className='mt-5'>{itemDetails.title}{itemDetails.name}</h1>
  <h4>{itemDetails.place_of_birth}{itemDetails.original_language}</h4>
  {itemDetails?.production_countries?.map((name ,index)=><p key={index} className='h5'>{name.name}</p>)}
  {itemDetails.birthday?<h6>birthday: {itemDetails.birthday}</h6>:''}
  <p className='text-muted my-2 py-2'>{itemDetails.overview}{itemDetails.biography}</p>
  {itemDetails.vote_average?    <div className=''>Vote: {itemDetails.vote_average}</div>
:''}
{itemDetails.vote_count? <div className=''>Vote Count: {itemDetails.vote_count}</div>:''}
{itemDetails.release_date?<div className=''>Release Date: {itemDetails.release_date}</div>:""}

  </div>
  </div>

{itemSimilar? <div className='mt-5'>
        <h2>Similar</h2>
        <Slider {...settings}>
          {itemSimilar.map((item,index)=>
           <div key={index}>
            <Link className='text-decoration-none text-white' to={`/ItemDetails/${item.id}/${media_type}`}>
            <h6 className='mt-5'>{item.title}{item.name}</h6>
             {item.poster_path?<img src={'https://image.tmdb.org/t/p/w500'+item.poster_path} className='w-100' alt="" />
             :<img src={'https://image.tmdb.org/t/p/w500'+item.profile_path} className='w-100' alt="" />}
            </Link>
             
          
         </div>)}
        </Slider>
      </div>:''}
 
  
  </>
}
