import React from "react";
//import './Moviewatch.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

const Movie = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    text-align: center;
    background-color: #5a0b0bb0;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 55%);

    transition: background-color 0.3s ease-in-out;
    &:hover {
        cursor: pointer;
        background-color: #6f1c1c;
    }

    .image {
        flex-shrink: 0;
        margin-right: 20px;
    }

    .details {
        flex-grow: 1;
    }

    .extra-info {
        margin-bottom: 10px
        color: #666;
    }

    .description {
        margin-top: 10px;
    }
    `

const Span = styled.span`
    margin-right: 10px;
    color: white;
`
const Imagen = styled.img`
    width: 150px;
    height: auto;
`
const Movietitle = styled.h2`
    color: white;
    font-size: 24px;
    margin: 0
    padding: 10px;
`

const Extrainfo = styled.div`
    padding: 10px;
    background-color: transparent;
`

const Movies = () => {
    const params = useParams();
    const [movies, setMovies] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=9b5184a7&s=${params.name}`)
        .then((response) => response.json())
        .then((data) => {
            setMovies(data.Search);
        })
    }, [params.name])

    if(!movies){
        return <p>No movies to watch yet..</p>
    }

    const handleMovieClick = (movieID) => {
        if(selectedMovie === movieID){
            setSelectedMovie(null)
        } else {
            setSelectedMovie(movieID)
            navigate('/movie/'+movieID);
        }
      };
    
    return (<div className="Moviesclass">
        {movies && movies.map((eachMovie) => {
            return (<Movie className="movie" key={eachMovie.imdbID} onClick={() => handleMovieClick(eachMovie.imdbID)}>
            <div className="image">
                <Imagen src={eachMovie.Poster} alt=""/>
            </div>
            <div className="details">
                <Movietitle className="title">{eachMovie.Title}</Movietitle>
                <Extrainfo className="extra-info">
                    <Span className="year">{eachMovie.Year}</Span>
                    <Span className="titletype">{eachMovie.Type}</Span>
                </Extrainfo>
            </div>
        </Movie>)
        })}

    </div>)
}

export default Movies;