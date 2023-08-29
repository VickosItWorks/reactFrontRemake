import React, { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";


const Pgraph = styled.p`
color: red;
`

const Logcontainer = styled.div`
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #ccc;
        margin-top: 100px;
        box-shadow: 0 3px 10px rgb(0 0 0 / 55%);
    `

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [userExists, setUserExists] = useState("");
    const navigate = useNavigate();

    //Should work on a logout plan
    // const isUserLogged = JSON.parse(sessionStorage.getItem('isLogged'));

    // if(isUserLogged?.logged){

    // } else {
    //     navigate('/login');
    // }

    const createIsLoggedObj = (person) => {
        return {
            logged: true,
            id: person.loginId
        }
    }
    
    const onSubmit = (e) => {
        e.preventDefault()

        const identity = JSON.parse(sessionStorage.getItem(email));

        if(identity && identity.loginPass === pass){
            
            const userLogged = JSON.stringify(createIsLoggedObj(identity));
            sessionStorage.setItem('isLogged', userLogged);
            
            navigate('/')
        } else {
            setUserExists("Invalid username or password");
        }

      }

    return (<Logcontainer className="container">
        <h1>Login</h1>
        <form>
            <label for="email">User Email:</label>
            <input type="text" id="email" name="email" value = {email} onChange={(e) => setEmail(e.target.value)} required/>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" value = {pass} onChange={(e) => setPass(e.target.value)} required/>

            <button className="loginbtn" onClick={onSubmit} type="submit">Login</button>
            <Pgraph>{userExists}</Pgraph>
            <p>If you are not a user already, please <a href="/register">register</a>.</p>
        </form>
    </Logcontainer>)
}

export default Login;