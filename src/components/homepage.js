import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai'
import './styles/homepage.css'


function Homepage() {

  const[search,setSearch]=useState("");
  const[submit,setSubmit]=useState(false);
  const[data,setData] = useState([]);
  const[multiSearch,setMulti] = useState("multi");
  const[error,setError]=useState("");;
  const[loading,setLoading]=useState(true);
  const handleSubmit =(e)=>{
    e.preventDefault();
  }

  const handleChanges =(e)=>{
    setSearch(e.target.value);
  }
const handleSelect=(e)=>{
  setMulti(e.target.value);
}

useEffect(()=>{

  const getPopularMovies= async()=>{
    try {
      const response = await fetch('https://moviesapi-fwxb.onrender.com');
      const data = await response.json();
      setData(data.results);
      setMulti("movie");
      setLoading(false);
    } catch (error) {
      console.log("error");
      setError("404 please try later");
    }
  }
  getPopularMovies();
},[]);

  useEffect(()=>{

    const fetchData =async ()=>{
        try {
            const response = await fetch(`https://moviesapi-fwxb.onrender.com/search/${multiSearch}/${search}`);
            const data = await response.json();
            setData(data.results);
            setLoading(false);
        } catch (error) {
            console.log("error");
        }
    }
    submit && fetchData();
  },[submit,search,multiSearch]);


  return (
    <div className="App">
      <div className='headers'>
        <h2>ShowScore</h2>
        <div className='formData'>
        <form onSubmit={handleSubmit}>
          <select value={multiSearch} onChange={handleSelect}>
            <option value='multi'>All</option>
            <option valye='movie'>movie</option>
            <option value='tv'>tv shows</option>
          </select>
            <input type='text' className='input' value={search} onChange={handleChanges}/>
            <button type='submit' onClick={()=>setSubmit(true)}><AiOutlineSearch/></button>
        </form>
      </div>
      </div>
      <div>
        {loading && <h1 style={{color:"red" ,margin:"60px"}}>...Loading</h1>}
      {!data.length && <h2 style={{color:"red" ,margin:"60px"}}>please enter movie name correctly</h2>  }
        {error && <h2 style={{color:"red"}}>error</h2>}
      </div>
        <div className='homeMain'>
            {data && data.map((eachMovie)=>{
                const{id,poster_path,title,vote_average,name,media_type}=eachMovie;
                return<Link to={`/searchdetails/${media_type ? (media_type === "movie" ? "movie" :"tv"): multiSearch}/${id}`}><article key={id} className='mainImg'>
                  {!poster_path && !vote_average && <h1>Details not updated</h1>}
                    {poster_path ?< img src={`https://image.tmdb.org/t/p/w185/${poster_path}` } alt={title} />: ""}
                        {title ? <p>{title}</p> : <p>{name}</p>}
                        <p>{vote_average && vote_average.toFixed(1)+"⭐"}</p>
                </article></Link>
            })}
        </div>
    </div>

  )
}

export default Homepage;