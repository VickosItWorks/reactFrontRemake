import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';
import { styled } from "styled-components";

const Pgraph = styled.p`
        color: red;
    `

const Largebutton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #194261;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`
const Regcontainer = styled.div`
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #ccc;
        margin-top: 100px;
        box-shadow: 0 3px 10px rgb(0 0 0 / 55%);
    `

const Register = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [userName, setUserName] = useState("");
    const [userExists, setUserExists] = useState("");
    const navigate = useNavigate();

    const createLoginObj = (userName, userEmail, userPass) => {
        const newId = userName + Date.now();
        return {
            loginName: userName,
            loginEmail: userEmail,
            loginPass: userPass,
            loginId: newId
        }
    }

    const createUserSession = () => {
        const watchList = [];
        const favorites = [];

        return {
            userWatchList: watchList,
            userFavorites: favorites
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        //sessionStorage.setItem('isLogged', 'true');

        const identity = sessionStorage.getItem(email);

        if (identity) {
            setUserExists("User Already Exists");
        } else {
            const loginObj = createLoginObj(userName, email, pass);
            sessionStorage.setItem(email, JSON.stringify(loginObj));
            sessionStorage.setItem(loginObj.loginId, JSON.stringify(createUserSession()));
            navigate('/login');
        }

    }

    return (<Regcontainer className="container">
        <h1>Register</h1>
        <form>
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" value={userName} onChange={(e) => setUserName(e.target.value)} required />

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
            <Pgraph>{userExists}</Pgraph>

            <Largebutton className="registerbtn" onClick={onSubmit} type="submit">Submit</Largebutton>
        </form>
    </Regcontainer>)
}

export default Register;