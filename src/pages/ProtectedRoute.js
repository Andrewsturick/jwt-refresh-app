import react from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({children, path, ...restProps}) => {
    return (
        <Route render={() => {
            isLoggedIn ?
            ({children}) : <Redirect="/" />
        }}/> 
    );
}

export default ProtectedRoute