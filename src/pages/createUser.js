import React, {useState} from "react";
import axios from "axios";


const CreateUser = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    console.log(username)
    const loginUser = async () => {
        console.log("logging in user")
        const user = await axios.post('http://localhost:3001/createUser', {username, password}, { headers: localStorage.getItem("token")});
        
    }

    return (
        <form>
            <input value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
            <button onClick={loginUser}>login!</button>
        </form>
        
    );
}

export default CreateUser;