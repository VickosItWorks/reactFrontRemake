import React from "react";
import './Home.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import Movies from "./Movies";
import { styled } from "styled-components";
import _ from 'lodash';

const Largebutton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #194261;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 3px 10px rgb(0 0 0 / 55%);
    font-weight: bold;
    `

const Homecontainer = styled.div`
    padding: 10px;
`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

const UserButton = styled.button`
    padding: 10px;
    background-color: #5a0b0bb0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    box-shadow: 0 3px 10px rgb(0 0 0 / 55%);
`

const Home = () => {
    const [movieName, setMovieName] = useState('');
    const navigate = useNavigate();

    //sessionStorage.clear();

    const debounceMovie = _.debounce((event) => {
        event.preventDefault();
        const isUserLogged = JSON.parse(sessionStorage.getItem('isLogged'));

        if(isUserLogged?.logged){
            console.log('VALOR',event.target.value);
            setMovieName(event.target.value);
            console.log('NAME',movieName);
        } else {
            navigate('/login');
        }
    },300);

    const movieValue = (event) => {
        // event.preventDefault();
        debounceMovie(event);
    }

    const movieSearch = (event) => {
        event.preventDefault();
        const isUserLogged = JSON.parse(sessionStorage.getItem('isLogged'));

        if(isUserLogged?.logged){
            const inputName = document.getElementById("search");
            setMovieName(inputName.value);
        } else {
            navigate('/login');
        }
    }
    
    useEffect(() => {
        movieName && navigate('/search/' + movieName);
    }, [movieName, navigate])

    return (<Homecontainer className="homeclass">
        <h1></h1>
        
        <ButtonsContainer className="buttons-container">
                <UserButton className="nav-button" onClick={() => navigate('/user')}>
                    <i className="bi bi-person-fill"> User Section</i>
                </UserButton>
                <h1></h1>
                <UserButton className="nav-button" onClick={() => navigate('/login')}>Login</UserButton>
            </ButtonsContainer>

        <form className="search-form">
            <input onChange= {movieValue} type="text" id="search" name="search" placeholder="Search movies..."/>
            <Largebutton onClick= {movieSearch} type="submit">Search</Largebutton>
        </form>

        <Outlet/>
        {/* <Moviewatch name={movieName}/> */}

    </Homecontainer>)
}

export default Home;