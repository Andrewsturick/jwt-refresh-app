import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";

import {getSession} from "../helpers";
import { verify } from "jsonwebtoken";

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(() => {
        const verifySession = async() => {
            const token = getSession();
            if (token) {
                console.log(token)
                const response = await axios.post("http://localhost:3001/verify-token", {token});
                console.log(response)
                if (response.data && response.data.success) {
                    console.log("was succesful")
                    history.push("/");
                }
            }
        }

        verifySession();
    }, []);

    const loginUser = async (e) => {
        e.preventDefault();
        const {data: {data: user}} = await axios.post('http://localhost:3001/login', {username, password});
        localStorage.setItem("_session", user.token);
        history.push("/");
    }

    return (
        <form>
            <input value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
            <button onClick={loginUser}>login!</button>
        </form>
        
    );
}

export default Login;