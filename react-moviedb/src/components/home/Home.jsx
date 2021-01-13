import React, { useEffect, useState } from 'react';
import { fetchMovies, fetchGenre } from "../../service";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
//import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css"

export function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect (() =>{
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());
        };

        fetchAPI()
    }, []);

const movies = nowPlaying.slice(0, 5).map((item, index) => {
    return (
        <div style={ {height: 500, width: "100%"}} key={index} >
            <div className="carousel-center">
                <img style={{height:600}} src={item.backPoster} alt={item.title}/>
            </div>
            <div className="carousel-center">
                <i className="far- fa-play-circle" style={{fontSize: 95, color: '#f4c10f'}}></i>
            </div>
            <div className="carousel-caption"
            style={{ textAlign: "center", fontSize: 35}} 
            > {item.title}
            </div>
        </div>
    );
 });

 const genreList = genres.map((item, index)=> {
     return (
         <li className="list-inline-item" key={index}>
             <button type="button" className="btn btn-outline-info">
                {item.name}
             </button>
         </li>
     )
 })

  return (
      <div className="container">
          <div className="row">
            <div className="col">
            <Carousel
                autoPlay={true}
                pauseOnvisibility={true}
                slidesshowSpeed={5000}
                version={4}
                indicators={false}
            >{movies}</Carousel>
            </div>
          </div>
          <div className="row mt-3">
              <div className="col">
                    <ul className="list-inline">
                    {genreList}
                    </ul>
              </div>
          </div>
      </div>
  );
    
}