import React, {useEffect} from 'react';
import './App.css';
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import {useAuth} from "./context/use-auth";

function App() {
    const {user, me} = useAuth();

    useEffect(() => {
        me();
    }, []);

    return (
        <div className="App">
            {user ? <Dashboard/> : <SignIn/>}
        </div>
    );
}

export default App;
