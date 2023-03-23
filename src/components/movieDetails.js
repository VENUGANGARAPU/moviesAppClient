import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import './styles/movieDetails.css';

const MovieDetails = () => {

  const [movieData,setMoviedata]=useState({});
  const [loading,setLoading]=useState(true);


  const search = window.location.pathname.split("/")[2];
  const id =window.location.pathname.split("/")[3];
  console.log(search,id);

  useEffect(()=>{
    const getDetails = async()=>{
        const response =await fetch(`https://moviesapi-fwxb.onrender.com/byusingId/${search}/${id}`);
        const data = await response.json();
        console.log(data); 
        setMoviedata(data);
        setLoading(false);
    }
    getDetails();
  },[id,search]);


  const{title,overview,homepage,poster_path,status,tagline,vote_average,release_date,genres,status_message} = movieData;

  if(loading){
    return <h1>...Loading</h1>
  }

  return (
    <div>
       <div className='headers'>
        <h2>ShowScore</h2></div>
    <div className='movieDetails'>
      <Link to='/'><button >Homepage</button></Link>
      {status_message ? <h1 style={{color:'red'}}>{status_message}</h1> :
      <div>
      <h1 style={{marginTop:'10px'}}>{title}</h1><p style={{color:'#ECF9FF',marginBottom:'5px'}}>{release_date && release_date.split("-")[0]}</p>
      <div className='img-movieDetails'>
      <div>
      <a href={homepage && homepage }>
      <img className='mainImg' src= {`https://image.tmdb.org/t/p/w185/${poster_path}`} alt={title} /></a></div>
      <div className='img-movieDetails1'>
        <h3>{tagline}</h3>
        <p style={{fontSize:'20px'}}>{Number(vote_average).toFixed(1)}/10⭐</p>
        <div className='spans'>
        {genres && genres.map((each)=>{
         return <span>{each.name}</span>
        })}</div>
        <p style={{color:"#D6E4E5"}}>status : {status}</p>
        <h3 style={{color:"#FFF8EA"}}>Storyline :</h3>
        <p>{overview}</p>
      </div>
      </div>
      </div>}
    </div>
    </div>
  )
}

export default MovieDetails;